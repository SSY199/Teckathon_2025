import { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, Loader2, Gavel } from 'lucide-react';
import SearchBar from './pages/SearchBar';
import ScoreGauge from './pages/Scoreguage';
import { SecurityInsight } from './pages/SecurityInsight';
import { TechnicalDNA } from './pages/TechnicalDNA';
import { URLStructure } from './pages/URLStructure';
import { Methodology } from './pages/Methodology';
import { ScoreImpacts } from './pages/ScoreImpacts'; // NEW COMPONENT
import { analyzeUrl } from './api/api.client.js';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [scanStatus, setScanStatus] = useState('');

  const statusMessages = [
    "Fetching WHOIS Data...",
    "Verifying SSL Certificates...",
    "Scanning Google Safe Browsing...",
    "Analyzing URL Patterns...",
    "Calculating Final Trust Score..."
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      let i = 0;
      interval = setInterval(() => {
        setScanStatus(statusMessages[i % statusMessages.length]);
        i++;
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSearch = async (url) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeUrl(url);
      setResult(data);
    } catch (err) {
      setError('Connection failed. Ensure backend is on port 4000.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 flex flex-col items-center font-sans text-slate-900">
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-3 flex items-center justify-center gap-3">
          <ShieldCheck size={40} className="text-blue-600" /> Website Genuineness Scorer
        </h1>
        <p className="text-slate-500 max-w-lg mx-auto">
          AI-powered authenticity verification using multi-layer technical analysis.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && (
        <div className="flex flex-col items-center gap-4 my-10 animate-in fade-in duration-500">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-blue-900 font-bold text-lg tracking-widest uppercase">{scanStatus}</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="max-w-2xl mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && !loading && (
        <div className="w-full max-w-6xl space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          
          <ScoreGauge score={result.score} status={result.status} />

          {/* FINAL VERDICT SUMMARY */}
          <Card className={`border-l-8 shadow-sm ${
            result.status === 'Safe' ? 'border-l-green-500 bg-green-50/50' : 
            result.status === 'Suspicious' ? 'border-l-yellow-500 bg-yellow-50/50' : 'border-l-red-500 bg-red-50'
          }`}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Gavel size={24} /> Final Verdict: 
                <span className={
                  result.status === 'Safe' ? 'text-green-700' : 
                  result.status === 'Suspicious' ? 'text-yellow-700' : 'text-red-700'
                }>{result.status.toUpperCase()}</span>
              </h3>
              <p className="text-slate-700 italic">
                {result.status === 'Safe' 
                  ? "This website shows strong trust signals, including a long-standing domain history and valid encryption. It is likely safe to use." 
                  : result.status === 'Suspicious' 
                  ? "Caution advised. Some technical parameters, such as domain age or URL structure, deviate from standard trust patterns." 
                  : `Warning! This site has been flagged for ${result.report?.reputation?.threats?.[0] || 'Malicious Activity'}. Do not share sensitive data.`}
              </p>
            </CardContent>
          </Card>
          
          {/* NEW: IMPACT BREAKDOWN (What increased/decreased the score) */}
          <ScoreImpacts impacts={result.impacts} />

          {/* MODULAR DATA GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SecurityInsight 
              reputation={result.report?.reputation} 
              ssl={result.report?.ssl} 
            />
            <TechnicalDNA 
              domain={result.report?.domain} 
              urlStructure={result.report?.urlStructure}
            />
            <URLStructure 
              structure={result.report?.urlStructure} 
            />
          </div>
        </div>
      )}

      <Methodology />

      <footer className="mt-16 pb-8 text-slate-400 text-xs text-center">
        <p>Teckathon 2025 • Website Genuineness Scoring System</p>
        <p className="mt-1 font-mono uppercase tracking-tighter">Status: Production Ready</p>
      </footer>
    </div>
  );
}

export default App;
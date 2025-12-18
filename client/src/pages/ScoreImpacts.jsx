import { TrendingUp, TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ScoreImpacts = ({ impacts }) => {
  if (!impacts || impacts.length === 0) return null;

  return (
    <Card className="w-full shadow-md border-t-4 border-t-blue-900 bg-white">
      <CardHeader className="bg-slate-50 border-b py-3">
        <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          Scoring Breakdown: Impacts & Trust Signals
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {impacts.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-white shadow-sm">
            <div className="flex items-center gap-3">
              {item.type === 'increase' ? (
                <CheckCircle2 className="text-green-600 w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="text-red-600 w-5 h-5 shrink-0" />
              )}
              <span className="font-medium text-slate-700">{item.label}</span>
            </div>
            
            <div className={`flex items-center font-bold px-3 py-1 rounded-full text-xs ${
              item.type === 'increase' 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              {item.type === 'increase' ? (
                <><TrendingUp size={14} className="mr-1" /> Trust Verified (+0)</>
              ) : (
                <><TrendingDown size={14} className="mr-1" /> Deduction ({item.change})</>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info } from 'lucide-react';

export const Methodology = () => {
  return (
    <Card className="w-full max-w-5xl mt-12 shadow-md border-t-4 border-t-blue-900 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Info className="text-blue-900" />
          Scoring Methodology
        </CardTitle>
        <p className="text-slate-500 text-sm">
          Our system uses a <strong>Weighted Deduction Model</strong>. Every URL starts with a <strong>Base Score of 100</strong>. Points are deducted based on the severity of identified risks.
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-blue-900">Parameter</TableHead>
              <TableHead className="font-bold text-blue-900">Evaluation Criteria</TableHead>
              <TableHead className="font-bold text-blue-900 text-right">Penalty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Reputation</TableCell>
              <TableCell>Blacklisted by Google Safe Browsing (Malware/Phishing)</TableCell>
              <TableCell className="text-right text-red-600 font-bold">-40 Points</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Security</TableCell>
              <TableCell>Invalid, Expired, or Missing SSL (HTTPS) Certificate</TableCell>
              <TableCell className="text-right text-red-600 font-bold">-25 Points</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Structure</TableCell>
              <TableCell>URL uses a numeric IP address instead of a domain name</TableCell>
              <TableCell className="text-right text-red-600 font-bold">-15 Points</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Identity</TableCell>
              <TableCell>Domain Age is less than 180 days (New Domain)</TableCell>
              <TableCell className="text-right text-red-600 font-bold">-20 Points</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell className="font-medium">Complexity</TableCell>
              <TableCell>Overly long URL or excessive special characters (@, -, _)</TableCell>
              <TableCell className="text-right text-red-600 font-bold">-10 Points</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
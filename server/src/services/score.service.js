import { analyzeUrlStructure } from "./urlAnalysis.service.js";
import { getDomainInfo } from "./domain.service.js";
import { checkSSL } from "./ssl.service.js";
import { checkBlacklist } from "./reputation.service.js";

export const analyzeUrl = async (url) => {
  let score = 100;
  const report = {};

  // URL Structure
  const urlAnalysis = analyzeUrlStructure(url);
  score -= urlAnalysis.scoreImpact;
  report.urlStructure = urlAnalysis;

  // Domain
  const domainInfo = await getDomainInfo(url);
  if (domainInfo.ageDays < 180) score -= 20;
  report.domain = domainInfo;

  // SSL
  const ssl = await checkSSL(url);
  if (!ssl.valid) score -= 25;
  report.ssl = ssl;

  // Reputation
  const reputation = await checkBlacklist(url);
  if (reputation.blacklisted) score -= 40;
  report.reputation = reputation;

  // Final status
  let status = "Safe";
  if (score < 80) status = "Suspicious";
  if (score < 50) status = "Dangerous";

  return {
    url,
    score: Math.max(score, 0),
    status,
    report
  };
};

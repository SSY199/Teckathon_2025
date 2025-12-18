import { analyzeUrlStructure } from "./urlAnalysis.service.js";
import { getDomainInfo } from "./domain.service.js";
import { checkSSL } from "./ssl.service.js";
import { checkBlacklist } from "./reputation.service.js";
import { checkBrandImpersonation } from "./brandProtection.service.js";

export const analyzeUrl = async (url) => {
  let score = 100;
  const impacts = []; // Track score changes here
  const report = {};

  // 1. Brand Impersonation (Deduction)
  const brandCheck = checkBrandImpersonation(url);
  if (brandCheck.impersonating) {
    score -= brandCheck.scoreImpact;
    impacts.push({ label: `Brand Impersonation (${brandCheck.targetBrand})`, change: -brandCheck.scoreImpact, type: 'decrease' });
  } else {
    impacts.push({ label: "Brand Authenticity Verified", change: 0, type: 'increase' });
  }
  report.brandCheck = brandCheck;

  // 2. URL Structure (Deduction)
  const urlAnalysis = analyzeUrlStructure(url);
  if (urlAnalysis.scoreImpact > 0) {
    score -= urlAnalysis.scoreImpact;
    impacts.push({ label: "Suspicious URL Structure", change: -urlAnalysis.scoreImpact, type: 'decrease' });
  } else {
    impacts.push({ label: "Standard URL Format", change: 0, type: 'increase' });
  }
  report.urlStructure = urlAnalysis;

  // 3. Domain Age (Deduction/Trust)
  const domainInfo = await getDomainInfo(url);
  if (domainInfo.ageDays < 180) {
    score -= 20;
    impacts.push({ label: "New Domain (< 6 months)", change: -20, type: 'decrease' });
  } else {
    impacts.push({ label: "Established Domain History", change: 0, type: 'increase' });
  }
  report.domain = domainInfo;

  // 4. SSL (Deduction/Trust)
  const ssl = await checkSSL(url);
  if (!ssl.valid) {
    score -= 25;
    impacts.push({ label: "Invalid/Missing SSL", change: -25, type: 'decrease' });
  } else {
    impacts.push({ label: "Secure SSL Encryption", change: 0, type: 'increase' });
  }
  report.ssl = ssl;

  // 5. Reputation (Deduction)
  const reputation = await checkBlacklist(url);
  if (reputation.blacklisted) {
    score -= 40;
    impacts.push({ label: "Blacklisted (Google Safe Browsing)", change: -40, type: 'decrease' });
  } else {
    impacts.push({ label: "Clean Historical Reputation", change: 0, type: 'increase' });
  }
  report.reputation = reputation;

  let status = "Safe";
  if (score < 80) status = "Suspicious";
  if (score < 50) status = "Dangerous";

  return {
    url,
    score: Math.max(score, 0),
    status,
    impacts, // Return this array to the frontend
    report
  };
};
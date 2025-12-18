import { URL } from "url";

export const analyzeUrlStructure = (inputUrl) => {
  const result = {
    lengthRisk: "Low",
    specialCharRisk: "Low",
    subdomainRisk: "Low",
    ipBased: false,
    scoreImpact: 0
  };

  const parsed = new URL(inputUrl);

  // Length check
  if (inputUrl.length > 75) {
    result.lengthRisk = "High";
    result.scoreImpact += 10;
  }

  // Suspicious characters
  if (/[^\w.-]/.test(parsed.hostname)) {
    result.specialCharRisk = "High";
    result.scoreImpact += 15;
  }

  // IP-based URL
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(parsed.hostname)) {
    result.ipBased = true;
    result.scoreImpact += 25;
  }

  // Subdomain count
  const parts = parsed.hostname.split(".");
  if (parts.length > 3) {
    result.subdomainRisk = "High";
    result.scoreImpact += 10;
  }

  return result;
};

// Function to calculate string similarity
const getLevenshteinDistance = (s1, s2) => {
  const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i++) track[0][i] = i;
  for (let j = 0; j <= s2.length; j++) track[j][0] = j;
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + indicator);
    }
  }
  return track[s2.length][s1.length];
};

const TOP_BRANDS = ["google", "facebook", "amazon", "apple", "microsoft", "paypal", "netflix", "youtube"];

export const checkBrandImpersonation = (inputUrl) => {
  const hostname = new URL(inputUrl).hostname.replace(/^www\./, "").split('.')[0].toLowerCase();
  
  for (const brand of TOP_BRANDS) {
    const distance = getLevenshteinDistance(hostname, brand);

    if (distance > 0 && distance <= 2) {
      return { impersonating: true, targetBrand: brand, scoreImpact: 35 };
    }
  }
  return { impersonating: false, scoreImpact: 0 };
};
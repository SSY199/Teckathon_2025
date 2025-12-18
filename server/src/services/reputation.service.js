import axios from "axios";

export const checkBlacklist = async (url) => {
try {
const apiKey = process.env.GOOGLE_API_KEY;

const body = {
 client: {
 clientId: "url-analyzer",
 clientVersion: "1.0.0"
 },
 threatInfo: {
 threatTypes: [
"MALWARE",
"SOCIAL_ENGINEERING",
"UNWANTED_SOFTWARE",
"POTENTIALLY_HARMFUL_APPLICATION"
 ],
 platformTypes: ["ANY_PLATFORM"],
 threatEntryTypes: ["URL"],
 threatEntries: [{ url }]
 }
 };

const response = await axios.post(
`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
body
 );

if (response.data && response.data.matches) {
return {
 blacklisted: true,
 source: "Google Safe Browsing",
 threats: response.data.matches.map(m => m.threatType)
 };
 }

return { blacklisted: false };
 } catch (error) {
return { blacklisted: false, error: "API_ERROR" };
 }
};
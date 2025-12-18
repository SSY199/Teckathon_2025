import whois from "whois-json";
import { URL } from "url";

export const getDomainInfo = async (inputUrl) => {
  const hostname = new URL(inputUrl).hostname.replace(/^www\./, "");

  try {
    const data = await whois(hostname);

    // Handle multiple possible formats
    let createdDate =
      data.creationDate ||
      data.created ||
      data.createdOn ||
      data.domainRegistrationDate ||
      null;

    // Sometimes WHOIS returns array
    if (Array.isArray(createdDate)) {
      createdDate = createdDate[0];
    }

    let ageDays = 0;
    if (createdDate) {
      const created = new Date(createdDate);
      if (!isNaN(created)) {
        const now = new Date();
        ageDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
      }
    }

    return {
      domain: hostname,
      ageDays,
      registrar: data.registrar || "Unknown"
    };
  } catch (error) {
    return {
      domain: hostname,
      ageDays: -1,
      registrar: "Unavailable"
    };
  }
};

import tls from "tls";
import { URL } from "url";

export const checkSSL = (inputUrl) => {
  return new Promise((resolve) => {
    const { hostname } = new URL(inputUrl);

    const socket = tls.connect(443, hostname, { servername: hostname }, () => {
      const cert = socket.getPeerCertificate();
      socket.end();

      resolve({
        valid: socket.authorized,
        issuer: cert.issuer?.O || "Unknown"
      });
    });

    socket.on("error", () => resolve({ valid: false }));
  });
};

export const getBaseUrl = (): string => {
  let baseUrl: string;
  if (typeof window === "undefined") {
    baseUrl = "http://localhost:80/api/v1";
  } else {
    const isLocalhost = window.location.origin.includes("localhost");
    baseUrl = isLocalhost
      ? "http://localhost:80/api/v1"
      : window.location.origin;
  }
  return baseUrl;
};

export default getBaseUrl;

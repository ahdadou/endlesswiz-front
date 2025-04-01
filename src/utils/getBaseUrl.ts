export const getBaseUrl = (): string => {
  let baseUrl: string;
  if (typeof window === "undefined") {
  baseUrl = "https://www.api.endlesswiz.com/api/v1";
} else {
  // const isLocalhost = window.location.origin.includes("localhost");
  // baseUrl = isLocalhost
    //   ? "http://www.api.endlesswiz.com/api/v1"
    //   : window.location.origin;
    baseUrl = "https://www.api.endlesswiz.com/api/v1";
}
  return baseUrl;
};
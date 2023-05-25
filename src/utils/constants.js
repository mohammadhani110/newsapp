let environment;
let url;
url = process.env.REACT_APP_DEV_API;
// url = process.env.REACT_APP_PROD_API;

if (
  window.location.host.includes("localhost") ||
  window.location.host.includes("127")
)
  environment = "development";
else environment = "production";

if (environment === "production") url = process.env.REACT_APP_PROD_API;

export const BASE_URL = url;

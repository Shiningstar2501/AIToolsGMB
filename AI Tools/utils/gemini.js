const GEMII_API_KEY = "AIzaSyC0sGVv5KZ6L2Iq-PUM1f1Bkn-1tAE6rNk";
const GEMII_ENDPOINT = "https://api.gemii.io/v1/";

async function callGemiiAPI(endpoint, payload) {
  const response = await fetch(`${GEMII_ENDPOINT}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GEMII_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  return data;
}

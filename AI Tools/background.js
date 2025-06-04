chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CALL_GEMINI") {
    const apiKey = "AIzaSyB4SVhms5VqEFVlzzeAyt13NFwowF6uRBM";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [{ text: `Generate a ${request.task} for: ${request.business}` }]
        }
      ]
    };

    // Wrap async logic in an IIFE to use sendResponse correctly
    (async () => {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        const result =
          data?.candidates?.[0]?.content?.parts?.[0]?.text || "No result";
        console.log("✅ Gemini response:", result);

        sendResponse({ result });
      } catch (error) {
        console.error("❌ Gemini API Error:", error);
        sendResponse({ result: "❌ Gemini API Error: " + error.message });
      }
    })();

    return true; // IMPORTANT: Keeps the message channel open
  }
});

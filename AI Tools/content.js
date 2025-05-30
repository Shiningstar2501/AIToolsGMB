//     // content.js

// console.log("GMB AI Tools Content Script Loaded");

// // Example: Check if we're on a Google Business Profile page
// if (window.location.href.includes("google.com/search")) {
//   console.log("Looks like you're on a Google Business profile search result.");

//   // Optional: extract visible text for context
//   const bodyText = document.body.innerText;

//   // Send data to background or popup
//   chrome.runtime.sendMessage({
//     type: "PAGE_CONTEXT",
//     url: window.location.href,
//     bodySnippet: bodyText.slice(0, 500)
//   });
// }
// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//   if (msg.type === "GET_PAGE_DATA") {
//     sendResponse({
//       url: window.location.href,
//       title: document.title,
//       snippet: document.body.innerText.slice(0, 500)
//     });
//   }
// });
          

function createGMBPanel() {
  if (document.getElementById("gmb-ai-panel")) return;

  const panel = document.createElement("div");
  panel.id = "gmb-ai-panel";
  panel.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-radius: 6px;
    z-index: 10000;
    width: 220px;
    font-family: Arial;
  `;

  const tools = [
    { id: "gmb-post", label: "GMB Post" },
    { id: "facebook-post", label: "Facebook Post" },
    { id: "category", label: "GMB Category" },
    { id: "service", label: "GMB Services" },
    { id: "review-response", label: "Review Response" },
    { id: "qa", label: "Q&A Section" },
  ];

  tools.forEach(tool => {
    const btn = document.createElement("button");
    btn.innerText = tool.label;
    btn.style.cssText = "margin: 5px 0; width: 100%; padding: 6px;";
    btn.onclick = () => runGeminiTool(tool.id);
    panel.appendChild(btn);
  });

  const resultBox = document.createElement("textarea");
  resultBox.id = "gmb-result";
  resultBox.placeholder = "Result will appear here...";
  resultBox.style.cssText = "width: 100%; height: 80px; margin-top: 10px;";
  panel.appendChild(resultBox);

  document.body.appendChild(panel);
}

async function runGeminiTool(toolId) {
  const businessName = getBusinessNameFromMaps();
  if (!businessName) return alert("Could not find business name on the page.");

  const endpointMap = {
    "gmb-post": "generate-gmb-post",
    "facebook-post": "generate-facebook-post",
    "category": "find-gmb-category",
    "service": "find-gmb-services",
    "review-response": "generate-review-response",
    "qa": "generate-qa"
  };

  const resultBox = document.getElementById("gmb-result");
  resultBox.value = "Loading...";

  try {
    const response = await fetch(`http://localhost:5000/${endpointMap[toolId]}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: businessName })
    });

    const data = await response.json();
    resultBox.value = data.result || "No response";
  } catch (err) {
    resultBox.value = "❌ Failed to fetch: " + err.message;
    console.error(err);
  }
}

function getBusinessNameFromMaps() {
  const title = document.querySelector('h1[class*="fontHeadlineLarge"]');
  return title ? title.innerText.trim() : null;
}

createGMBPanel();
  
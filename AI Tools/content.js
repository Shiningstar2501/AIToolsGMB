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

// async function runGeminiTool(toolId) {
//   const businessName = getBusinessNameFromMaps();
//   if (!businessName) return alert("Could not find business name on the page.");

//   const endpointMap = {
//     "gmb-post": "generate-gmb-post",
//     "facebook-post": "generate-facebook-post",
//     "category": "find-gmb-category",
//     "service": "find-gmb-services",
//     "review-response": "generate-review-response",
//     "qa": "generate-qa"
//   };

//   // const resultBox = document.getElementById("gmb-result");
//   // resultBox.value = "Loading...";

//     const GEMII_API_KEY = "AIzaSyB4SVhms5VqEFVlzzeAyt13NFwowF6uRBM"; // Replace if rotated
//   const GEMII_ENDPOINT = "https://api.gemii.io/v1/";

//   const resultBox = document.getElementById("gmb-result");
//   resultBox.value = "Loading...";

// chrome.runtime.sendMessage(
//     {
//       type: "CALL_GEMINI",
//       task: toolLabelMap[toolId],
//       business: businessName
//     },
//     (response) => {
//       resultBox.value = response.result || "❌ No result from Gemini.";
//     }
//   );
// }

async function runGeminiTool(toolId) {
  const businessName = getBusinessNameFromMaps();
  if (!businessName) return alert("Could not find business name on the page.");

  const toolLabelMap = {
    "gmb-post": "GMB Post",
    "facebook-post": "Facebook Post",
    "category": "GMB Category",
    "service": "GMB Services",
    "review-response": "Review Response",
    "qa": "Q&A Section"
  };

  const resultBox = document.getElementById("gmb-result");
  resultBox.value = "Loading...";


chrome.runtime.sendMessage(
  {
    type: "CALL_GEMINI",
    task: toolLabelMap[toolId],
    business: businessName
  },
  (response) => {
    if (chrome.runtime.lastError) {
      alert("❌ Error: " + chrome.runtime.lastError.message);
      return;
    }

    if (!response || !response.result) {
      alert("❌ No response received from Gemini.");
      return;
    }

    // ✅ Open a new tab with the result
    const html = `
      <html>
        <head>
          <title>${toolLabelMap[toolId]} Result</title>
          <style>
            body { font-family: Arial; padding: 20px; line-height: 1.6; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h2>${toolLabelMap[toolId]}</h2>
          <pre>${response.result}</pre>
        </body>
      </html>
    `;

    const newWindow = window.open();
    newWindow.document.write(html);
    newWindow.document.close();
  }
);

}

function getBusinessNameFromMaps() {
  const title = document.querySelector('h1[class*="DUwDvf lfPIob"]'); //<h1 class="DUwDvf lfPIob"><span class="a5H0ec"></span>Visacent LTD.<span class="G0bp3e"></span></h1>
  return title ? title.innerText.trim() : null;
}

createGMBPanel();
  

// //     function showTool(toolId) {
// //   document.querySelectorAll(".tool-section").forEach(el => el.style.display = "none");
// //   document.getElementById(`${toolId}-tool`).style.display = "block";
// // }

// // // Hook up functions to buttons
// // async function generateGmbPost() {
// //   const input = document.getElementById("post-input").value;
// //   const result = await callGemiiAPI("gmb-post", { input });
// //   document.getElementById("post-output").innerText = result.text;
// // }
// // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
// //   chrome.tabs.sendMessage(tabs[0].id, { type: "GET_PAGE_DATA" }, (response) => {
// //     console.log("Received from content script:", response);
// //   });
// // });



// document.getElementById("post-tab").addEventListener("click", () => {
//   showTool("post");
// });
// document.getElementById("category-tab").addEventListener("click", () => {
//   showTool("category");
// });
// document.getElementById("generate-post").addEventListener("click", generateGmbPost);

// function showTool(toolId) {
//   document.querySelectorAll(".tool-section").forEach(el => el.style.display = "none");
//   document.getElementById(`${toolId}-tool`).style.display = "block";
// }

// async function generateGmbPost() {
//   const input = document.getElementById("post-input").value;
//   const result = await callGemiiAPI("gmb-post", { input });
//   document.getElementById("post-output").innerText = result.text;
// }

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//   chrome.tabs.sendMessage(tabs[0].id, { type: "GET_PAGE_DATA" }, (response) => {
//     console.log("Received from content script:", response);
//   });
// });

// async function callGemiiAPI(endpoint, payload) {
//   const GEMII_API_KEY = "AIzaSyC0sGVv5KZ6L2Iq-PUM1f1Bkn-1tAE6rNk";
//   const GEMII_ENDPOINT = "https://api.gemii.io/v1/";
//   const response = await fetch(`${GEMII_ENDPOINT}${endpoint}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${GEMII_API_KEY}`
//     },
//     body: JSON.stringify(payload)
//   });

//   const data = await response.json();
//   return data;
// }


document.getElementById("inject").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});

    function showTool(toolId) {
  document.querySelectorAll(".tool-section").forEach(el => el.style.display = "none");
  document.getElementById(`${toolId}-tool`).style.display = "block";
}

// Hook up functions to buttons
async function generateGmbPost() {
  const input = document.getElementById("post-input").value;
  const result = await callGemiiAPI("gmb-post", { input });
  document.getElementById("post-output").innerText = result.text;
}
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { type: "GET_PAGE_DATA" }, (response) => {
    console.log("Received from content script:", response);
  });
});

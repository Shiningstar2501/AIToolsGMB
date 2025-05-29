    // content.js

console.log("GMB AI Tools Content Script Loaded");

// Example: Check if we're on a Google Business Profile page
if (window.location.href.includes("google.com/search")) {
  console.log("Looks like you're on a Google Business profile search result.");

  // Optional: extract visible text for context
  const bodyText = document.body.innerText;

  // Send data to background or popup
  chrome.runtime.sendMessage({
    type: "PAGE_CONTEXT",
    url: window.location.href,
    bodySnippet: bodyText.slice(0, 500)
  });
}
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_PAGE_DATA") {
    sendResponse({
      url: window.location.href,
      title: document.title,
      snippet: document.body.innerText.slice(0, 500)
    });
  }
});
        
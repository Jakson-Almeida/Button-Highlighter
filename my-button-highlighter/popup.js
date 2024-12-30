// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const applyButton = document.getElementById("apply");

  // Handle button clicks
  applyButton.addEventListener("click", async () => {
    // Get the current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (applyButton.textContent === "Apply") {
      // Apply green borders to all buttons
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });
      applyButton.textContent = "Original";
    } else {
      // Revert buttons to original styles
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // Remove the green border from all buttons
          document.querySelectorAll("button").forEach(button => {
            button.style.border = "";
          });
        }
      });
      applyButton.textContent = "Apply";
    }
  });
});

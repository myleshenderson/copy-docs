// Background service worker for Copy Docs extension

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'trackCopy') {
    // Just log the copy action - no storage needed
    console.log('Copy Docs: Content copied from', request.site);
  }
});

// Set up extension on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('Copy Docs extension installed');
  }
});
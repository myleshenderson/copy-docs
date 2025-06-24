// Background service worker for Copy Docs extension

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'trackCopy') {
    // Update copy statistics
    chrome.storage.local.get(['copyCount'], (data) => {
      const newCount = (data.copyCount || 0) + 1;
      chrome.storage.local.set({
        copyCount: newCount,
        lastCopy: new Date().toISOString(),
        lastCopySite: request.site,
        lastCopyUrl: request.url
      });
    });
  }
});

// Set up extension on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Initialize storage
    chrome.storage.local.set({
      copyCount: 0,
      lastCopy: null,
      enabled: true
    });
    
    console.log('Copy Docs extension installed');
  }
});
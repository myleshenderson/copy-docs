// Popup script for Copy Docs extension

document.addEventListener('DOMContentLoaded', async () => {
  const contentDiv = document.getElementById('content');
  
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if extension is active on this tab
    chrome.tabs.sendMessage(tab.id, { action: 'getStatus' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        showInactiveStatus(contentDiv);
      } else {
        showActiveStatus(contentDiv, response);
      }
    });
    
    // Get stats from storage
    chrome.storage.local.get(['copyCount', 'lastCopy'], (data) => {
      updateStats(data);
    });
    
  } catch (error) {
    console.error('Popup error:', error);
    contentDiv.innerHTML = '<div class="status">Error loading status</div>';
  }
});

function showActiveStatus(container, status) {
  container.innerHTML = `
    <div class="status">
      <div class="status-row">
        <span class="status-label">Status:</span>
        <span class="status-value active">Active</span>
      </div>
      <div class="status-row">
        <span class="status-label">Site:</span>
        <span class="status-value">${status.site}</span>
      </div>
      <div class="status-row">
        <span class="status-label">Code blocks found:</span>
        <span class="status-value">${status.codeBlocksFound}</span>
      </div>
    </div>
    
    <div class="stats">
      <h2>Statistics</h2>
      <div class="status-row">
        <span class="status-label">Total copies:</span>
        <span class="status-value" id="copyCount">0</span>
      </div>
      <div class="status-row">
        <span class="status-label">Last copy:</span>
        <span class="status-value" id="lastCopy">Never</span>
      </div>
    </div>
    
    <div class="help">
      Hover over code blocks to copy them
      <br>
      <a href="https://github.com/myleshenderson/copy-docs" target="_blank">View on GitHub</a>
    </div>
  `;
}

function showInactiveStatus(container) {
  container.innerHTML = `
    <div class="status">
      <div class="status-row">
        <span class="status-label">Status:</span>
        <span class="status-value inactive">Inactive</span>
      </div>
    </div>
    
    <div class="help">
      This extension is not active on this page.
      <br><br>
      Currently supported sites:
      <br>
      • GitHub API Documentation
      <br><br>
      <a href="https://github.com/myleshenderson/copy-docs" target="_blank">View on GitHub</a>
    </div>
  `;
}

function updateStats(data) {
  const copyCountEl = document.getElementById('copyCount');
  const lastCopyEl = document.getElementById('lastCopy');
  
  if (copyCountEl && data.copyCount) {
    copyCountEl.textContent = data.copyCount || 0;
  }
  
  if (lastCopyEl && data.lastCopy) {
    const date = new Date(data.lastCopy);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) { // Less than 1 minute
      lastCopyEl.textContent = 'Just now';
    } else if (diff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      lastCopyEl.textContent = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) { // Less than 1 day
      const hours = Math.floor(diff / 3600000);
      lastCopyEl.textContent = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      lastCopyEl.textContent = date.toLocaleDateString();
    }
  }
}
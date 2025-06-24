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
      <h2>Privacy</h2>
      <div class="status-row">
        <span class="status-label">Data collected:</span>
        <span class="status-value">None</span>
      </div>
      <div class="status-row">
        <span class="status-label">Permissions:</span>
        <span class="status-value">Minimal</span>
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

function showActivatingStatus(container) {
  container.innerHTML = `
    <div class="status">
      <div class="status-row">
        <span class="status-label">Status:</span>
        <span class="status-value active">Activating...</span>
      </div>
      <div class="status-row">
        <span class="status-label">Site:</span>
        <span class="status-value">GitHub API</span>
      </div>
    </div>
    
    <div class="help">
      Extension is activating on this page.
      <br>
      Refresh if copy buttons don't appear.
    </div>
  `;
}

// No statistics tracking for enhanced privacy
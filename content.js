// Main content script for Copy Docs extension

let activeConfig = null;
let copyButtons = [];

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function initialize() {
  // Get site config (loaded by manifest)
  if (typeof SITE_CONFIG !== 'undefined') {
    activeConfig = SITE_CONFIG;
    console.log('Copy Docs: Initialized for', activeConfig.name);
    setupCodeBlocks();
    setupSections();
    observeNewElements();
  }
}

function setupCodeBlocks() {
  if (!activeConfig) return;
  
  // Find all code blocks matching selectors
  const selectors = activeConfig.codeBlockSelectors.join(', ');
  const codeBlocks = document.querySelectorAll(selectors);
  
  codeBlocks.forEach(block => {
    if (!block.dataset.copyDocsEnhanced) {
      enhanceCodeBlock(block);
      block.dataset.copyDocsEnhanced = 'true';
    }
  });
}

function setupSections() {
  if (!activeConfig || !activeConfig.sectionSelectors) return;
  
  // Find all sections matching selectors
  const selectors = activeConfig.sectionSelectors.join(', ');
  const sections = document.querySelectorAll(selectors);
  
  sections.forEach(section => {
    if (!section.dataset.copyDocsSectionEnhanced) {
      enhanceSection(section);
      section.dataset.copyDocsSectionEnhanced = 'true';
    }
  });
}

function enhanceCodeBlock(block) {
  // Create copy button
  const button = createCopyButton();
  
  // Position button relative to code block
  block.style.position = 'relative';
  block.appendChild(button);
  
  // Show/hide on hover
  block.addEventListener('mouseenter', () => {
    button.style.opacity = '1';
    button.style.pointerEvents = 'auto';
  });
  
  block.addEventListener('mouseleave', () => {
    if (!button.dataset.justCopied) {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }
  });
  
  // Handle copy
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    copyContent(block, button, activeConfig.getTextContent);
  });
  
  copyButtons.push(button);
}

function enhanceSection(section) {
  // Create copy button for section
  const button = createCopyButton('Copy Section');
  button.classList.add('copy-docs-section-button');
  
  // Find the heading to position the button
  const heading = section.querySelector('h2');
  if (heading) {
    heading.style.position = 'relative';
    heading.appendChild(button);
    
    // Show/hide on hover
    heading.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    });
    
    heading.addEventListener('mouseleave', () => {
      if (!button.dataset.justCopied) {
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
      }
    });
    
    // Handle copy
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      copyContent(section, button, activeConfig.getSectionContent);
    });
    
    copyButtons.push(button);
  }
}

function createCopyButton(text = 'Copy') {
  const button = document.createElement('button');
  button.className = 'copy-docs-button';
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"/>
    </svg>
    <span class="copy-docs-text">${text}</span>
  `;
  button.style.opacity = '0';
  button.style.pointerEvents = 'none';
  return button;
}

async function copyContent(element, button, extractMethod) {
  try {
    // Get text content using the provided extraction method
    const content = extractMethod.call(activeConfig, element);
    
    // Copy to clipboard
    await navigator.clipboard.writeText(content);
    
    // Update button to show success
    const originalText = button.querySelector('.copy-docs-text').textContent;
    button.dataset.justCopied = 'true';
    button.querySelector('.copy-docs-text').textContent = 'Copied!';
    button.classList.add('copy-docs-success');
    
    // Track copy event
    chrome.runtime.sendMessage({
      action: 'trackCopy',
      site: activeConfig.name,
      url: window.location.href,
      type: originalText.includes('Section') ? 'section' : 'code'
    });
    
    // Reset button after delay
    setTimeout(() => {
      button.querySelector('.copy-docs-text').textContent = originalText;
      button.classList.remove('copy-docs-success');
      button.dataset.justCopied = '';
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    }, 2000);
    
  } catch (error) {
    console.error('Copy Docs: Failed to copy', error);
    const originalText = button.querySelector('.copy-docs-text').textContent;
    button.querySelector('.copy-docs-text').textContent = 'Failed';
    setTimeout(() => {
      button.querySelector('.copy-docs-text').textContent = originalText;
    }, 2000);
  }
}

// Watch for dynamically added elements
function observeNewElements() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        setupCodeBlocks();
        setupSections();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getStatus') {
    sendResponse({
      active: !!activeConfig,
      site: activeConfig?.name || 'Unknown',
      codeBlocksFound: copyButtons.length
    });
  }
});
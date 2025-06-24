// GitHub API documentation configuration

const SITE_CONFIG = {
  name: 'GitHub API',
  domain: 'docs.github.com',
  
  // Selectors for code blocks containing schemas and responses
  codeBlockSelectors: [
    '.RestCodeSamples_codeBlock__EV_jQ.RestCodeSamples_responseCodeBlock__QlM4d',
    '[data-highlight="json"]',
    '.highlight-json',
    'pre code.language-json'
  ],
  
  // Selectors for full API endpoint sections
  sectionSelectors: [
    '.pb-8:has(h2[id])', // Main API endpoint sections
    'div:has(> h2[id]):has(.RestOperation_codeBlock__mf2k2)' // Alternative structure
  ],
  
  // Extract clean text from GitHub's highlighted code blocks
  getTextContent(element) {
    // Try to find the code element inside
    const codeElement = element.querySelector('code') || element;
    
    // Get text content and clean it up
    let text = codeElement.textContent || '';
    
    // Remove any zero-width spaces or special characters
    text = text.replace(/\u200B/g, '');
    
    // Trim whitespace
    text = text.trim();
    
    return text;
  },
  
  // Extract text content from full sections
  getSectionContent(element) {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove any copy buttons we've added
    clone.querySelectorAll('.copy-docs-button').forEach(btn => btn.remove());
    
    // Get all text content, preserving structure
    let content = [];
    
    // Get the main heading
    const heading = clone.querySelector('h2');
    if (heading) {
      content.push('# ' + heading.textContent.trim());
      content.push('');
    }
    
    // Get description paragraphs
    const descBlock = clone.querySelector('.RestOperation_codeBlock__mf2k2');
    if (descBlock) {
      content.push('## Description');
      content.push('');
      descBlock.querySelectorAll('p').forEach(p => {
        content.push(p.textContent.trim());
        content.push('');
      });
    }
    
    // Get parameters
    const paramTables = clone.querySelectorAll('.ParameterTable_parameterTable__NVZ8g');
    paramTables.forEach(table => {
      const caption = table.querySelector('caption');
      if (caption) {
        content.push('## ' + caption.textContent.trim());
        content.push('');
      }
      
      table.querySelectorAll('tbody tr').forEach(row => {
        const codeEl = row.querySelector('code');
        const desc = row.querySelector('p');
        if (codeEl) {
          content.push('- `' + codeEl.textContent.trim() + '`');
          if (desc) {
            content.push('  ' + desc.textContent.trim());
          }
          content.push('');
        }
      });
    });
    
    // Get request example
    const requestExample = clone.querySelector('.RestCodeSamples_requestCodeBlock__SgBKI code');
    if (requestExample) {
      content.push('## Request Example');
      content.push('');
      content.push('```bash');
      content.push(requestExample.textContent.trim());
      content.push('```');
      content.push('');
    }
    
    // Get response example
    const responseExample = clone.querySelector('.RestCodeSamples_responseCodeBlock__QlM4d code');
    if (responseExample) {
      content.push('## Response Example');
      content.push('');
      content.push('```json');
      content.push(responseExample.textContent.trim());
      content.push('```');
      content.push('');
    }
    
    return content.join('\n').trim();
  },
  
  // Process content before copying (optional)
  processContent(content) {
    // GitHub's content is usually already well-formatted
    return content;
  }
};
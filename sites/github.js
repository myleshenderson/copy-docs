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
  
  // Process content before copying (optional)
  processContent(content) {
    // GitHub's content is usually already well-formatted
    return content;
  }
};
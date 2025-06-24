// Base configuration interface for documentation sites

class SiteConfig {
  constructor() {
    this.name = '';
    this.domain = '';
    this.codeBlockSelectors = [];
  }
  
  // Extract text content from a code block element
  getTextContent(element) {
    return element.textContent.trim();
  }
  
  // Optional: Custom detection logic
  shouldActivate() {
    return window.location.hostname === this.domain;
  }
  
  // Optional: Pre-process content before copying
  processContent(content) {
    return content;
  }
}
# Copy Docs

A Chrome extension that makes it easy to copy API schemas and response examples from documentation sites.

## Features

- 🎯 **One-click copy**: Hover over code blocks to reveal a copy button
- 📄 **Full section copy**: Copy entire API endpoint documentation including schemas
- 🔍 **Auto-detection**: Automatically detects API documentation code blocks and sections
- 📊 **Usage tracking**: See how many times you've used the extension
- 🚀 **Lightweight**: Minimal performance impact
- 🔌 **Extensible**: Easy to add support for new documentation sites

## Installation

### Development Mode

1. Clone this repository:
   ```bash
   git clone https://github.com/myleshenderson/copy-docs.git
   cd copy-docs
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right

4. Click "Load unpacked" and select the `copy-docs` directory

5. The extension is now installed! Visit [GitHub API docs](https://docs.github.com/en/rest) to try it out.

## Usage

### Copying Code Blocks
1. Navigate to a supported documentation site (currently GitHub API docs)
2. Hover over any code block containing API schemas or responses
3. Click the "Copy" button that appears
4. The content is now in your clipboard!

### Copying Full API Sections
1. Hover over any API endpoint heading (h2)
2. Click the "Copy Section" button that appears
3. The extension copies the complete endpoint documentation including:
   - Endpoint description
   - Parameters and their descriptions
   - Request examples
   - Response examples
   - Response schema (when available)

## Supported Sites

- ✅ GitHub API Documentation (`docs.github.com`)
- 🔜 More coming soon...

## Adding New Sites

To add support for a new documentation site:

1. Create a new file in the `sites/` directory (e.g., `sites/stripe.js`)

2. Define the site configuration:
   ```javascript
   const SITE_CONFIG = {
     name: 'Stripe API',
     domain: 'stripe.com',
     codeBlockSelectors: [
       '.code-block-class',
       'pre > code'
     ],
     getTextContent(element) {
       return element.textContent.trim();
     }
   };
   ```

3. Add the site to `manifest.json`:
   ```json
   {
     "matches": ["*://stripe.com/docs/*"],
     "js": ["sites/site-config.js", "sites/stripe.js", "content.js"],
     "css": ["styles.css"]
   }
   ```

4. Reload the extension and test on the new site

## Development

### Project Structure

```
copy-docs/
├── manifest.json      # Extension configuration
├── content.js         # Main content script
├── background.js      # Background service worker
├── popup.html/js      # Extension popup
├── styles.css         # Copy button styles
├── sites/            # Site-specific configurations
│   ├── site-config.js
│   └── github.js
└── icons/            # Extension icons
```

### Building for Production

Currently, this extension is in development mode. To package for production:

1. Remove any development files
2. Zip the directory contents (not the directory itself)
3. Upload to Chrome Web Store

## Privacy

This extension:
- ✅ Only activates on supported documentation sites
- ✅ Doesn't collect or transmit any personal data
- ✅ Stores only local usage statistics
- ✅ Requires minimal permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

Myles Henderson

---

If you find this extension useful, please consider starring the repository!
# Privacy Policy for Copy Docs Extension

**Last Updated: June 2024**

## Overview

Copy Docs is a Chrome extension that adds copy functionality to API documentation websites. We are committed to protecting your privacy and being transparent about our practices.

## Data Collection

**We do not collect any data.** Specifically:

- ❌ No personal information
- ❌ No browsing history
- ❌ No usage statistics
- ❌ No analytics
- ❌ No cookies
- ❌ No user identifiers

## Data Storage

**We do not store any data.** The extension:

- ❌ Does not use Chrome's storage API
- ❌ Does not use localStorage
- ❌ Does not create or read cookies
- ❌ Does not maintain any persistent state

## Data Transmission

**We do not transmit any data.** The extension:

- ❌ Does not connect to any external servers
- ❌ Does not send data to developers
- ❌ Does not use any third-party services
- ❌ Does not make any network requests

## Permissions Usage

The extension requires minimal permissions solely for its core functionality:

### activeTab
- Used to detect if the current tab is a supported documentation site
- Only activated when you click the extension icon
- Cannot access tabs unless you interact with the extension

### clipboardWrite
- Used to copy code snippets to your clipboard
- Only activated when you click a copy button
- Cannot read your clipboard contents

### Host Permission (docs.github.com)
- Allows the extension to add copy buttons to GitHub API documentation
- Limited to GitHub's documentation subdomain only
- Cannot access your GitHub account or private repositories

## How the Extension Works

1. When you visit docs.github.com, the extension automatically adds copy buttons to code blocks
2. When you click a copy button, the code is copied to your clipboard
3. All processing happens locally in your browser
4. No data ever leaves your device

## Third-Party Services

This extension does not use any third-party services, including:
- ❌ No Google Analytics
- ❌ No crash reporting services  
- ❌ No advertising networks
- ❌ No social media integrations

## Updates to This Policy

Any updates to this privacy policy will be posted in the extension's GitHub repository and included in extension updates. The "Last Updated" date will be revised accordingly.

## Open Source

This extension is open source. You can review the entire source code at:
https://github.com/myleshenderson/copy-docs

## Contact

If you have any questions about this privacy policy or the extension, please open an issue on GitHub:
https://github.com/myleshenderson/copy-docs/issues
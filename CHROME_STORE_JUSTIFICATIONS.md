# Chrome Web Store Privacy Practices Justifications

## Permission Justifications

### activeTab Permission
**Justification:**
The activeTab permission is required to access the current tab's content when the user clicks the extension icon. This allows the extension to:
- Check if the current page is a supported documentation site
- Display the correct status in the popup (active/inactive)
- Ensure the extension only operates on the intended documentation pages

This permission is only activated when the user explicitly interacts with the extension, providing user-controlled access.

### clipboardWrite Permission
**Justification:**
The clipboardWrite permission is essential for the core functionality of the extension - copying API schemas and documentation to the clipboard. This permission is used to:
- Copy code snippets from API documentation
- Copy full API endpoint documentation sections
- Provide one-click copy functionality that saves developers time

The extension only writes to the clipboard when the user explicitly clicks a copy button.

### Host Permission (docs.github.com)
**Justification:**
Host permission for docs.github.com is required to:
- Automatically inject the copy buttons when users visit GitHub API documentation
- Access the DOM elements containing API schemas and code examples
- Apply styling to create a seamless user experience
- Extract text content from code blocks for copying

This permission is limited specifically to GitHub's documentation domain and does not access any other GitHub pages or user data.

### Remote Code
**Note:** This extension does NOT use any remote code. All functionality is contained within the packaged extension files. No external scripts, APIs, or remote resources are loaded or executed.

## Single Purpose Description

This extension serves a single, clear purpose: **To enhance API documentation sites by adding convenient copy buttons for code examples and schemas.**

The extension specifically:
- Adds copy buttons to code blocks on API documentation pages
- Allows developers to quickly copy API schemas, request/response examples, and endpoint documentation
- Saves time by eliminating manual selection and copying of code snippets
- Works exclusively on documentation sites, starting with GitHub API docs

All features are focused on this single goal of making it easier for developers to copy code and schemas from API documentation.

## Privacy Practices Certification

### Data Usage Declaration

1. **Personal Data Collection**: NONE
   - The extension does not collect any personal information
   - No user identifiers, browsing history, or usage data is collected

2. **Data Storage**: NONE
   - The extension does not store any data locally or remotely
   - No cookies, localStorage, or any form of data persistence

3. **Data Transmission**: NONE
   - The extension does not transmit any data to external servers
   - All operations are performed locally in the browser

4. **Third-Party Services**: NONE
   - The extension does not use any analytics, tracking, or third-party services
   - No external APIs or services are contacted

5. **Data Sharing**: NONE
   - No data is shared with developers or third parties
   - The extension operates entirely within the user's browser

### Compliance Statement

This extension fully complies with Chrome Web Store Developer Program Policies:
- ✅ Single purpose: Copying API documentation
- ✅ Minimal permissions: Only what's necessary for core functionality
- ✅ No data collection or transmission
- ✅ Clear, accurate description of functionality
- ✅ No deceptive behavior or hidden features
- ✅ Respects user privacy with zero data collection

## Account Requirements

Before publishing, ensure:
1. Contact email is added to the developer account
2. Contact email is verified
3. Privacy practices tab is completed with above justifications
4. Developer Program Policies compliance is certified
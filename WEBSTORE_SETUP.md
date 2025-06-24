# Chrome Web Store Setup Guide

This guide will help you set up automatic publishing to the Chrome Web Store using GitHub Actions.

## Prerequisites

1. A Google account
2. A Chrome Web Store Developer account ($5 registration fee)
3. Your extension uploaded to the Chrome Web Store (manual first upload required)

## Step 1: Chrome Web Store Developer Console Setup

### 1.1 Register as a Chrome Web Store Developer
1. Go to [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole)
2. Pay the $5 registration fee
3. Accept the developer agreement

### 1.2 Upload Your Extension (First Time)
1. In the Developer Console, click "New Item"
2. Upload the extension ZIP file (run `npm run build && npm run package` to create it)
3. Fill out the store listing:
   - Name: "Copy Docs"
   - Description: "Easily copy API schemas and responses from documentation sites"
   - Category: "Developer Tools"
   - Add screenshots
4. Submit for review (this can take a few days)

### 1.3 Get Your Extension ID
1. After upload, note the Extension ID from the URL or developer console
2. It looks like: `abcdefghijklmnopqrstuvwxyz123456`

## Step 2: Google Cloud Console Setup

### 2.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Chrome Web Store API"

### 2.2 Create OAuth2 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Desktop application"
4. Note the Client ID and Client Secret

### 2.3 Generate Refresh Token
1. Install the Chrome Web Store Upload CLI:
   ```bash
   npm install -g chrome-webstore-upload-cli
   ```

2. Generate a refresh token:
   ```bash
   chrome-webstore-upload refresh-token \
     --client-id YOUR_CLIENT_ID \
     --client-secret YOUR_CLIENT_SECRET
   ```

3. Follow the authorization flow and save the refresh token

## Step 3: GitHub Secrets Setup

Add these secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Settings > Secrets and variables > Actions
3. Add these repository secrets:

```
CHROME_EXTENSION_ID=your_extension_id_here
CHROME_CLIENT_ID=your_google_oauth_client_id
CHROME_CLIENT_SECRET=your_google_oauth_client_secret
CHROME_REFRESH_TOKEN=your_refresh_token_here
```

## Step 4: Publishing Workflow

### Automatic Publishing
The GitHub Action will automatically:
1. Build and package the extension
2. Publish to Chrome Web Store
3. This happens when you create a git tag starting with 'v'

### Manual Publishing
You can also trigger publishing manually:
1. Go to Actions tab in GitHub
2. Select "Publish to Chrome Web Store"
3. Click "Run workflow"

## Step 5: Creating Releases

To publish a new version:

```bash
# Increment version and create tag
npm run release

# Or manually:
npm version patch  # or minor, major
git push
git push --tags
```

This will:
1. Update version in package.json and manifest.json
2. Create a git tag
3. Trigger the GitHub Action to publish to Chrome Web Store

## Troubleshooting

### Common Issues:

1. **"Invalid refresh token"**
   - Regenerate the refresh token using the CLI tool

2. **"Extension not found"**
   - Verify the Extension ID is correct
   - Ensure you've uploaded the extension manually first

3. **"Insufficient permissions"**
   - Make sure the Chrome Web Store API is enabled
   - Verify OAuth credentials have the right scopes

4. **"Package rejected"**
   - Check Chrome Web Store policies
   - Review any policy violations in the developer console

## Security Notes

- Keep all tokens and secrets secure
- Use GitHub repository secrets, never commit credentials
- Rotate tokens periodically
- Only trusted collaborators should have access to publish
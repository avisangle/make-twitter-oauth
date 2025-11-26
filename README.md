# 🔐 Twitter OAuth Setup Wizard for Make.com

A beautiful, user-friendly web application that simplifies Twitter OAuth 2.0 setup with Make.com automation. This wizard guides you through the entire OAuth flow and automatically generates a ready-to-use Make.com scenario.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)](https://avisangle.github.io/make-twitter-oauth/)
[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://avisangle.github.io/make-twitter-oauth/)

## 🌐 Live Application

**👉 [Launch the Wizard](https://avisangle.github.io/make-twitter-oauth/) 👈**

No installation needed! Use the live web application directly in your browser.

## ✨ Features

- **🎯 4-Step Wizard Interface** - Intuitive, guided flow with visual progress tracking
- **🔒 PKCE Security** - Implements OAuth 2.0 with Proof Key for Code Exchange (SHA-256)
- **⚡ Auto-Download** - Scenario JSON automatically downloads with pre-filled auth code
- **📦 Ready-to-Import** - Generated scenario is immediately ready to import into Make.com
- **⏱️ 30-Second Execution** - Optimized workflow to beat the authorization code expiration
- **🎨 Beautiful UI** - Modern gradient design with responsive layout
- **🚀 One-Click Twitter Post** - Test your integration with an automatic tweet

## 📸 Screenshots

> **Note:** Screenshots coming soon! The live application is available at [https://avisangle.github.io/make-twitter-oauth/](https://avisangle.github.io/make-twitter-oauth/)

<!--
To add screenshots, create an `images` folder and add:
- Step 1: Credentials input
- Step 2: PKCE parameters
- Step 3: Twitter authorization
- Step 4: Code extraction and scenario download
-->

### Preview

Visit the [live demo](https://avisangle.github.io/make-twitter-oauth/) to see the wizard in action!

## 🚀 Quick Start

### Option 1: Use the Live App (Recommended)

Simply visit **[https://avisangle.github.io/make-twitter-oauth/](https://avisangle.github.io/make-twitter-oauth/)** in your browser and start using the wizard immediately!

### Option 2: Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avisangle/make-twitter-oauth.git
   cd make-twitter-oauth
   ```

2. **Open in browser:**
   ```bash
   open index.html
   ```
   Or simply double-click `index.html` to open it in your default browser.

3. **No build process required!** - Pure HTML, CSS, and JavaScript

## 📋 Prerequisites

Before using this tool, you need:

1. **Twitter Developer Account**
   - Create an app at [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Get your Client ID and Client Secret
   - Set redirect URL to: `https://www.make.com/oauth/cb/oauth2`

2. **Make.com Account**
   - Free account at [Make.com](https://www.make.com)
   - Ability to create and import scenarios

## 🎯 How It Works

### Step 1: Enter Credentials
- Input your Twitter app's Client ID and Client Secret
- PKCE parameters (code_verifier, code_challenge) are auto-generated using SHA-256

### Step 2: Review PKCE Parameters
- View the generated security parameters
- System prepares the authorization URL

### Step 3: Authorize with Twitter
- Click to open Twitter authorization in a new tab
- Log in and authorize the application
- Copy the redirect URL (even though it shows "Resource not found" - this is expected!)

### Step 4: Complete Setup
- Paste the redirect URL
- Auth code is automatically extracted
- Scenario JSON downloads immediately with pre-filled auth code
- Import to Make.com and run within 30 seconds!

## 📦 Generated Scenario

The auto-generated Make.com scenario includes 3 modules:

1. **Set Variable** - Stores the pre-filled authorization code
2. **HTTP Token Exchange** - Exchanges auth code for OAuth tokens (access_token, refresh_token)
3. **Twitter Post** - Posts a test tweet: "Testing Twitter API integration with Make.com! 🚀"

## 🛠️ Technical Details

### Files Structure

```
make-twitter/
├── index.html              # Main HTML structure and styles
├── scenario-generator.js   # All JavaScript logic
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── progress.md            # Development changelog
└── decisions.md           # Architectural decisions
```

### Key Technologies

- **OAuth 2.0 with PKCE** - Secure authorization flow
- **Web Crypto API** - SHA-256 hashing for code_challenge
- **Make.com Blueprint** - JSON scenario format
- **Twitter API v2** - OAuth and tweet endpoints
- **Pure Vanilla JS** - No frameworks or dependencies

### Security Features

- ✅ PKCE (Proof Key for Code Exchange) implementation
- ✅ Secure random string generation
- ✅ State parameter for CSRF protection
- ✅ No credentials stored or transmitted to third parties
- ✅ Client-side only processing

## 🎨 Customization

### Changing the Theme

Edit the CSS gradient in `index.html`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Modifying the Tweet Text

Edit the tweet text in `scenario-generator.js`:

```javascript
data: JSON.stringify({
  text: "Your custom tweet text here! 🚀"
})
```

## 🐛 Troubleshooting

### "Resource not found" error on redirect
- **This is normal!** Make.com doesn't have a page at the redirect URL
- Simply copy the entire URL from the address bar

### Authorization code expired
- Auth codes expire in 30 seconds
- Return to Step 3 and re-authorize
- Download the new scenario and import immediately

### Scenario import shows validation errors
- Ensure you're using the latest downloaded scenario
- Check that all HTTP parameters are included (they should be auto-generated)

## 📚 Documentation

- [Twitter OAuth 2.0 Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [Make.com Documentation](https://www.make.com/en/help)
- [PKCE RFC 7636](https://tools.ietf.org/html/rfc7636)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💜 Support

If this tool helped you save time and simplify your Twitter OAuth setup, consider supporting its development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg)](https://buymeacoffee.com/avinashs)

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Avinash Sangle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🌟 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by the need for simpler OAuth workflows
- Thanks to all contributors and users!

---

**Made with ❤️ by [Avinash Sangle](https://buymeacoffee.com/avinashs)**

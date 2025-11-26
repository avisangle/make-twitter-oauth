# Architectural Decisions

## 2025-11-26 - Twitter OAuth Landing Page Design

### Decision 1: Multi-Step Wizard Interface
**Choice:** Implemented 4-step progressive wizard instead of single-page form
**Rationale:**
- Reduces cognitive load by breaking complex OAuth flow into digestible steps
- Allows validation at each stage before proceeding
- Provides clear visual feedback on progress
- Makes the flow self-explanatory for non-technical users

### Decision 2: Client-Side PKCE Generation
**Choice:** Generate code_verifier and code_challenge in browser using Web Crypto API
**Rationale:**
- No server required - fully static HTML page
- More secure - credentials never leave the browser
- SHA-256 hashing meets OAuth 2.0 PKCE requirements
- Eliminates backend dependency

### Decision 3: Redirect to Make.com Instead of Webhook
**Choice:** Use `https://www.make.com/oauth/cb/oauth2` as redirect URI
**Rationale:**
- Per user requirements - no webhook approach
- Make.com's OAuth callback handles the authorization code
- User manually extracts code from URL for scenario input
- Simpler flow without custom webhook infrastructure

### Decision 4: Visual Design - Purple Gradient Theme
**Choice:** Modern gradient design (purple #667eea to #764ba2)
**Rationale:**
- Professional and visually appealing
- High contrast for readability
- Aligns with modern web design trends
- Creates trust and polish

### Decision 5: In-Page Instructions vs External Docs
**Choice:** Embedded all instructions directly in the wizard steps
**Rationale:**
- Self-explanatory flow as requested
- Reduces context switching
- Users don't need to reference external documentation
- Critical warnings (30-second timeout) are impossible to miss

### Decision 6: Popup Window for Twitter Auth
**Choice:** Open Twitter authorization in new window instead of redirect
**Rationale:**
- Preserves wizard state in original window
- Users don't lose their place in the flow
- Can easily copy redirect URL after authorization
- Better UX for returning to extract auth code

## 2025-11-26 - OAuth URL Encoding and Code Refactoring

### Decision 7: Manual URL Construction vs URLSearchParams
**Choice:** Build OAuth URL manually with `encodeURIComponent()` instead of URLSearchParams
**Rationale:**
- URLSearchParams encodes spaces as `+` (application/x-www-form-urlencoded standard)
- Twitter OAuth 2.0 requires `%20` encoding for spaces in scope parameter
- Manual construction gives full control over encoding
- Ensures compatibility with Twitter's specific requirements

### Decision 8: Two-File Architecture (HTML + JS)
**Choice:** Split code into `index.html` (structure/styles) and `scenario-generator.js` (logic)
**Rationale:**
- Separation of concerns: presentation vs business logic
- Easier to maintain and debug
- JavaScript can be tested independently
- Better code organization and reusability
- Follows modern web development best practices
- Makes it easier to add future features

### Decision 9: Popup Blocker Handling
**Choice:** Add detection for popup blockers and delay alert message
**Rationale:**
- Popup blockers are common in modern browsers
- Alert before popup can trigger blocker in some browsers
- 500ms delay ensures popup opens before alert shows
- Detection provides user feedback if popup is blocked
- Improves user experience and troubleshooting

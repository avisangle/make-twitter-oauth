// Twitter OAuth Configuration
let config = {
  clientId: '',
  clientSecret: '',
  codeVerifier: '',
  codeChallenge: '',
  state: '',
  authUrl: ''
};

// Generate random string for PKCE and state
function generateRandomString(length, useUrlSafe = false) {
  // URL-safe: only alphanumeric (no encoding needed)
  // PKCE: includes -._~ as per RFC 7636
  const chars = useUrlSafe
    ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

// Generate SHA256 hash and base64url encode
async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Step navigation
function goToStep1() {
  showStep(1);
  updateProgress(25);
}

async function goToStep2() {
  const clientId = document.getElementById('clientId').value.trim();
  const clientSecret = document.getElementById('clientSecret').value.trim();

  if (!clientId || !clientSecret) {
    alert('❌ Please fill in both Client ID and Client Secret');
    return;
  }

  config.clientId = clientId;
  config.clientSecret = clientSecret;
  config.codeVerifier = generateRandomString(43); // PKCE verifier with special chars
  config.codeChallenge = await generateCodeChallenge(config.codeVerifier);
  config.state = generateRandomString(32, true); // URL-safe state (no encoding needed)

  document.getElementById('codeVerifier').value = config.codeVerifier;
  document.getElementById('codeChallenge').value = config.codeChallenge;

  showStep(2);
  updateProgress(50);
}

function goToStep3() {
  // Build URL manually with proper encoding for spaces
  // Twitter requires %20 encoding for spaces in scope parameter
  const baseUrl = 'https://twitter.com/i/oauth2/authorize';

  // Build each parameter properly encoded
  // Match the working URL scope exactly (4 scopes only)
  const params = {
    response_type: 'code',
    client_id: config.clientId,
    redirect_uri: 'https://www.make.com/oauth/cb/oauth2',
    scope: 'tweet.read tweet.write users.read offline.access',
    state: config.state,
    code_challenge: config.codeChallenge,
    code_challenge_method: 'S256'
  };

  // Manually build query string to ensure proper encoding
  const queryParts = [];
  for (const [key, value] of Object.entries(params)) {
    queryParts.push(`${key}=${encodeURIComponent(value)}`);
  }

  config.authUrl = `${baseUrl}?${queryParts.join('&')}`;
  document.getElementById('authUrlDisplay').textContent = config.authUrl;

  showStep(3);
  updateProgress(75);
}

function goToStep4() {
  showStep(4);
  updateProgress(100);
}

function showStep(stepNum) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById(`step${stepNum}`).classList.add('active');
}

function updateProgress(percentage) {
  document.getElementById('progressFill').style.width = percentage + '%';
}

// Download scenario JSON
function downloadScenario(authCode) {
  const scenario = {
    name: "Twitter OAuth - Token Exchange & Post Tweet",
    flow: [
      // Node 1: Set Variable - Store auth_code
      {
        id: 1,
        module: "util:SetVariable2",
        version: 1,
        parameters: {},
        mapper: {
          name: "auth_code",
          scope: "roundtrip",
          value: authCode || "PASTE_AUTH_CODE_HERE"
        },
        metadata: {
          designer: {
            x: 0,
            y: 0
          },
          restore: {
            expect: {
              scope: {
                label: "One cycle"
              }
            }
          }
        }
      },
      // Node 2: HTTP Request - Exchange code for tokens
      {
        id: 2,
        module: "http:ActionSendData",
        version: 3,
        parameters: {
          handleErrors: false
        },
        mapper: {
          url: "https://api.twitter.com/2/oauth2/token",
          serializeUrl: false,
          method: "post",
          headers: [
            {
              name: "Content-Type",
              value: "application/x-www-form-urlencoded"
            },
            {
              name: "Authorization",
              value: `Basic {{base64("${config.clientId}:${config.clientSecret}")}}`
            }
          ],
          qs: [],
          bodyType: "raw",
          parseResponse: true,
          shareCookies: false,
          rejectUnauthorized: true,
          followRedirect: true,
          useQuerystring: false,
          gzip: true,
          useMtls: false,
          followAllRedirects: false,
          data: `grant_type=authorization_code&code={{1.auth_code}}&redirect_uri=https%3A%2F%2Fwww.make.com%2Foauth%2Fcb%2Foauth2&code_verifier=${config.codeVerifier}`
        },
        metadata: {
          designer: {
            x: 300,
            y: 0
          }
        }
      },
      // Node 3: Twitter Post - Create test tweet
      {
        id: 3,
        module: "http:ActionSendData",
        version: 3,
        parameters: {
          handleErrors: false
        },
        mapper: {
          url: "https://api.twitter.com/2/tweets",
          serializeUrl: false,
          method: "post",
          headers: [
            {
              name: "Content-Type",
              value: "application/json"
            },
            {
              name: "Authorization",
              value: "Bearer {{2.data.access_token}}"
            }
          ],
          qs: [],
          bodyType: "raw",
          parseResponse: true,
          shareCookies: false,
          rejectUnauthorized: true,
          followRedirect: true,
          useQuerystring: false,
          gzip: true,
          useMtls: false,
          followAllRedirects: false,
          data: JSON.stringify({
            text: "Testing Twitter API integration with Make.com! 🚀"
          })
        },
        metadata: {
          designer: {
            x: 600,
            y: 0
          }
        }
      }
    ],
    metadata: {
      version: 1,
      scenario: {
        roundtrips: 1,
        maxErrors: 3,
        autoCommit: false,
        sequential: false
      }
    }
  };

  const json = JSON.stringify(scenario, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'twitter-oauth-make-scenario.json';
  link.click();
  URL.revokeObjectURL(url);
}

// Open Twitter authorization
function openTwitterAuth() {
  if (!config.authUrl) {
    alert('❌ Please complete Step 3 first to generate the authorization URL');
    return;
  }

  // Open in new tab
  const newTab = window.open(config.authUrl, '_blank');

  if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
    alert('❌ Popup/tab blocked! Please allow popups for this site and try again.');
  } else {
    // Auto-navigate to Step 4 immediately
    goToStep4();
  }
}

// Extract auth code from redirect URL
function extractAuthCode() {
  const redirectUrl = document.getElementById('redirectUrl').value.trim();

  if (!redirectUrl) {
    return;
  }

  try {
    const url = new URL(redirectUrl);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code || !state) {
      return;
    }

    document.getElementById('authCodeValue').textContent = code;
    document.getElementById('stateValue').textContent = state;
    document.getElementById('extractedResults').classList.remove('hidden');

    // Auto-download scenario JSON immediately with actual auth code
    downloadScenario(code);
  } catch (e) {
    // Invalid URL - do nothing
  }
}

// Copy to clipboard
function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ Copied to clipboard!');
  }).catch(err => {
    alert('❌ Failed to copy. Please select and copy manually.');
  });
}

// Reset wizard
function resetWizard() {
  if (confirm('🔄 Are you sure you want to start over?')) {
    location.reload();
  }
}

// OAuth Configuration Template
// Copy this to config/oauth-config.js and add your credentials

window.OAuthConfig = {
  // Google OAuth Configuration
  google: {
    enabled: false, // Set to true after configuration
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    // Get this from: https://console.cloud.google.com → APIs & Services → Credentials
  },

  // Apple Sign-In Configuration  
  apple: {
    enabled: false, // Set to true after configuration
    clientId: 'com.landingpagem.web',
    // Get this from: https://developer.apple.com → Certificates, Identifiers & Profiles
  }
};

// Instructions:
// 1. Copy this file to config/oauth-config.js
// 2. Follow SIMPLE_OAUTH_SETUP.md for getting credentials
// 3. Replace the clientId values above with your actual IDs
// 4. Set enabled: true for each provider you configured
// 5. Save and refresh your browser

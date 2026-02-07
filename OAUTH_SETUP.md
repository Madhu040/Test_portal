# InstantDB OAuth Configuration Guide

## Part 1: Google OAuth Setup

### Step 1: Google Cloud Console Setup

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Enable APIs:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
   - Search for "Google Identity" and enable it

### Step 2: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Configure consent screen if prompted:
   - Select "External" user type
   - Fill in required fields (app name, support email)
   - Add scopes: email, profile
   - Add test users (your email)
   - Submit for verification (or use in testing mode)

4. Create OAuth Client ID:
   - Application type: "Web application"
   - Name: "LandingPageM"
   - Authorized JavaScript origins:
     - `http://localhost:8000`
     - Your production URL (e.g., `https://yourdomain.com`)
   - Authorized redirect URIs:
     - `http://localhost:8000`
     - Your production URL

5. Copy your **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
6. Copy your **Client Secret**

### Step 3: Configure in InstantDB Dashboard

1. Go to https://www.instantdb.com/dash
2. Select your app (ID: `1d7dcab3-cd11-4c0b-ad09-4b34f71c344c`)
3. Navigate to "Auth" tab
4. Click on "Google" provider
5. Enter your **Client ID**
6. Enter your **Client Secret**
7. Add authorized origins:
   - `http://localhost:8000`
   - Your production domain
8. Save configuration

### Step 4: Update Code

Your Google Client ID: `[PASTE_HERE_AFTER_SETUP]`

Update in `scripts/script.js` around line 250:
```javascript
// Replace YOUR_GOOGLE_CLIENT_ID with your actual Client ID
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';
```

---

## Part 2: Apple Sign-In Setup

### Step 1: Apple Developer Account Setup

1. Go to https://developer.apple.com
2. Enroll in Apple Developer Program (requires $99/year)
3. Go to "Certificates, Identifiers & Profiles"

### Step 2: Create App ID

1. Click "Identifiers" → "+" button
2. Select "App IDs" and continue
3. Enter Description: "LandingPageM"
4. Enter Bundle ID: `com.landingpagem.app`
5. Enable "Sign in with Apple"
6. Save

### Step 3: Create Service ID

1. Click "Identifiers" → "+" button
2. Select "Services IDs" and continue
3. Enter Description: "LandingPageM Web"
4. Enter Identifier: `com.landingpagem.web`
5. Enable "Sign in with Apple"
6. Configure:
   - Domains and Subdomains: `localhost` (for testing), `yourdomain.com` (production)
   - Return URLs: `http://localhost:8000/apple-callback`, `https://yourdomain.com/apple-callback`
7. Save

### Step 4: Create Private Key

1. Go to "Keys" → "+" button
2. Enter Key Name: "LandingPageM Sign In"
3. Enable "Sign in with Apple"
4. Configure with your Service ID
5. Download the `.p8` key file (keep it secure!)
6. Note your **Key ID** (10 characters)
7. Note your **Team ID** (from top right of page)

### Step 5: Configure in InstantDB Dashboard

1. Go to https://www.instantdb.com/dash
2. Select your app
3. Navigate to "Auth" tab
4. Click on "Apple" provider
5. Enter:
   - **Service ID**: `com.landingpagem.web`
   - **Team ID**: (from Apple Developer)
   - **Key ID**: (from Apple Developer)
   - **Private Key**: (contents of .p8 file)
6. Add authorized domains:
   - `localhost:8000`
   - Your production domain
7. Save configuration

---

## Part 3: Testing Authentication

### Test Email Magic Code

1. Open http://localhost:8000
2. Click "Log In"
3. Click "Sign up" to test sign up
4. Enter name, email, and agree to terms
5. Click "Create Account"
6. **Check browser console** for messages
7. Check your email for the magic code
8. Enter the 6-digit code
9. Should see "Welcome aboard!" message

### Test Google OAuth

1. Ensure Google is configured in InstantDB dashboard
2. Click "Log In"
3. Click "Continue with Google"
4. Google sign-in popup should appear
5. Select account and authorize
6. Should be logged in

### Test Apple Sign-In

1. Ensure Apple is configured in InstantDB dashboard
2. Click "Log In"
3. Click "Continue with Apple"
4. Apple sign-in popup should appear
5. Authorize with Apple ID
6. Should be logged in

---

## Troubleshooting

### Google OAuth Issues

**Error: "redirect_uri_mismatch"**
- Check that `http://localhost:8000` is in authorized origins
- Ensure no trailing slashes in URLs
- Verify domain matches exactly

**Error: "access_denied"**
- User cancelled or denied permission
- Check consent screen is properly configured
- Ensure scopes are correct (email, profile)

**Error: "idpiframe_initialization_failed"**
- Check if third-party cookies are blocked
- Try in incognito/private mode
- Check browser console for cookie errors

### Apple Sign-In Issues

**Error: "invalid_client"**
- Service ID doesn't match configuration
- Check Team ID is correct
- Verify Key ID is correct

**Error: "invalid_grant"**
- Private key doesn't match
- Check .p8 file content is complete
- Ensure no extra whitespace in key

**Error: "redirect_uri_mismatch"**
- Return URLs must match exactly
- Include protocol (http:// or https://)
- Check domain is authorized

### Magic Code Issues

**Not receiving email:**
- Check spam/junk folder
- Verify email address is correct
- Check InstantDB dashboard for email logs
- Ensure InstantDB email sending is configured

**Code doesn't work:**
- Code expires after 10 minutes
- Can only be used once
- Check for typos (use copy/paste)
- Case-sensitive in some systems

**Database errors:**
- Ensure schema is pushed: `npx instant-cli push schema`
- Ensure permissions are pushed: `npx instant-cli push perms`
- Check browser console for specific errors
- Verify App ID is correct

---

## Quick Checklist

Before testing, ensure:

- [ ] Schema pushed to InstantDB
- [ ] Permissions pushed to InstantDB  
- [ ] Google OAuth configured (if using)
- [ ] Apple Sign-In configured (if using)
- [ ] Browser allows third-party cookies
- [ ] Internet connection is stable
- [ ] Browser console is open (for debugging)
- [ ] Email can receive messages

---

## Current Status

**Email Magic Code**: ✅ Implemented and ready
- Just needs schema pushed to InstantDB
- Will send real verification codes once configured

**Google OAuth**: ⚠️ Needs Configuration
- Code is ready and integrated
- Requires setup in Google Cloud Console
- Requires configuration in InstantDB dashboard
- Client ID needs to be added to code

**Apple Sign-In**: ⚠️ Needs Configuration
- Code is ready and integrated
- Requires Apple Developer account ($99/year)
- Requires setup in Apple Developer portal
- Requires configuration in InstantDB dashboard

---

## Next Steps

1. **Push Schema** (Required for all auth methods):
   ```bash
   npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
   npx @instantdb/cli@latest push perms --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
   ```

2. **Test Magic Code** (Works immediately after schema push)

3. **Configure Google OAuth** (Optional, follow Part 1)

4. **Configure Apple Sign-In** (Optional, follow Part 2, requires paid account)

---

**Note**: Magic code authentication works out of the box with InstantDB. OAuth providers require additional setup but provide a better user experience for users who already have Google/Apple accounts.

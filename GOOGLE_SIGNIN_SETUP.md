# Google Sign-In Setup Guide

Follow these steps to enable Google Sign-In for your app.

---

## Step 1: Create Google Cloud Project (5 minutes)

### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com

### 1.2 Create a New Project
- Click "Select a project" dropdown at the top
- Click "NEW PROJECT"
- Project name: `LandingPageM` (or any name you prefer)
- Click "CREATE"
- Wait for the project to be created (takes ~30 seconds)

---

## Step 2: Enable Google Sign-In API

### 2.1 Enable the API
- Make sure your new project is selected
- Go to: **APIs & Services** → **Library**
- Search for: "Google+ API" or "Google Identity"
- Click on it and click **ENABLE**

---

## Step 3: Create OAuth Credentials (MOST IMPORTANT)

### 3.1 Configure OAuth Consent Screen
- Go to: **APIs & Services** → **OAuth consent screen**
- User Type: Select **External**
- Click **CREATE**

Fill in the required fields:
- **App name**: `LandingPageM`
- **User support email**: Your email (madhusudhanvenkata@gmail.com)
- **App logo**: (optional, skip for now)
- **App domain**: Leave blank for testing
- **Authorized domains**: Leave blank for testing
- **Developer contact**: Your email again
- Click **SAVE AND CONTINUE**

Scopes:
- Click **ADD OR REMOVE SCOPES**
- Select: `userinfo.email` and `userinfo.profile`
- Click **UPDATE**
- Click **SAVE AND CONTINUE**

Test users (for External mode):
- Click **ADD USERS**
- Add your email: madhusudhanvenkata@gmail.com
- Click **SAVE AND CONTINUE**

### 3.2 Create OAuth Client ID
- Go to: **APIs & Services** → **Credentials**
- Click **+ CREATE CREDENTIALS** → **OAuth client ID**
- Application type: **Web application**
- Name: `LandingPageM Web Client`

**Authorized JavaScript origins**:
- Click **+ ADD URI**
- Add: `http://localhost:8000`
- Add: `http://127.0.0.1:8000`

**Authorized redirect URIs**:
- Click **+ ADD URI**  
- Add: `http://localhost:8000`
- Add: `http://localhost:8000/`

- Click **CREATE**

### 3.3 Copy Your Client ID
You'll see a popup with your credentials:
- **Client ID**: Something like `123456789-abcdefg.apps.googleusercontent.com`
- **Client secret**: Something like `GOCSPX-abc123...`

**IMPORTANT**: Copy both and save them somewhere safe!

---

## Step 4: Configure InstantDB (2 minutes)

### 4.1 Go to InstantDB Dashboard
Visit: https://www.instantdb.com/dash

### 4.2 Select Your App
- Find app: `1d7dcab3-cd11-4c0b-ad09-4b34f71c344c`
- Click on it

### 4.3 Enable Google Auth
- Go to the **Auth** tab
- Find **Google** section
- Click **Enable** or **Configure**
- Paste your **Client ID** from Google
- Paste your **Client Secret** from Google
- Click **SAVE**

---

## Step 5: Update Your App Config (30 seconds)

### 5.1 Open config file
Open: `/Users/madhu/Downloads/Cursor_folder/config/oauth-config.js`

### 5.2 Update the config
Replace with your actual Client ID:

```javascript
window.OAuthConfig = {
  google: {
    enabled: true,  // ← Change to true
    clientId: 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com',  // ← Paste your Client ID here
  },
  apple: {
    enabled: false,
    clientId: 'com.landingpagem.web',
  }
};
```

### 5.3 Save the file

---

## Step 6: Test It! (1 minute)

1. Refresh your browser: http://localhost:8000
2. Click **Log In**
3. Click **Continue with Google**
4. Sign in with your Google account
5. You should be logged in! 🎉

---

## Troubleshooting

### "Access blocked: This app's request is invalid"
- Make sure you added `http://localhost:8000` to **Authorized JavaScript origins**
- Make sure you added your email as a test user in OAuth consent screen

### "redirect_uri_mismatch"
- Make sure you added `http://localhost:8000` to **Authorized redirect URIs**
- Try adding both `http://localhost:8000` and `http://localhost:8000/`

### Button doesn't work
- Make sure you set `enabled: true` in `oauth-config.js`
- Make sure you refreshed the browser after updating the config
- Check browser console for errors (F12 → Console)

### "Google Sign-In library not loaded"
- Refresh the page
- Check your internet connection
- The Google Sign-In script is loaded from CDN

---

## Quick Summary

**What YOU need to do:**

1. ✅ Go to https://console.cloud.google.com
2. ✅ Create project → Enable Google+ API
3. ✅ Create OAuth credentials
4. ✅ Copy Client ID and Secret
5. ✅ Go to https://www.instantdb.com/dash
6. ✅ Add Google credentials to Auth section
7. ✅ Update `config/oauth-config.js` with your Client ID
8. ✅ Set `enabled: true`
9. ✅ Test!

**Total time: ~10 minutes**

---

## Next Steps

After you complete these steps, let me know and I can help you:
- Add Apple Sign-In
- Deploy to production
- Update OAuth for production domains
- Add more features!

Good luck! 🚀

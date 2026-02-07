# Simple OAuth Setup - What YOU Need To Do

I cannot access the InstantDB dashboard, Google Cloud Console, or Apple Developer portal for you. These are YOUR accounts that need YOUR login credentials. Here's exactly what to do:

---

## ⚠️ IMPORTANT: I Cannot Do This For You

I **cannot**:
- Log into your InstantDB dashboard
- Access your Google Cloud Console
- Access your Apple Developer account
- Configure OAuth providers for you

You **must** do these steps yourself by logging into these services.

---

## ✅ What I DID For You

I've made it super easy! Just follow these steps:

### Step 1: Push Schema (5 minutes) - DO THIS FIRST

Open terminal and run:

```bash
cd /Users/madhu/Downloads/Cursor_folder

npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c

npx @instantdb/cli@latest push perms --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
```

**After this, email login will work!** Test it at http://localhost:8000/test-auth.html

---

## For Google OAuth (Optional - 30 minutes)

### What YOU Need To Do:

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Log in with YOUR Google account
   - Create a new project

2. **Create OAuth Credentials**
   - Go to: APIs & Services → Credentials
   - Click: Create Credentials → OAuth client ID
   - Application type: Web application
   - Add JavaScript origin: `http://localhost:8000`
   - Click Create
   - **COPY the Client ID** (looks like: `123456-abc.apps.googleusercontent.com`)

3. **Configure in InstantDB Dashboard**
   - Visit: https://www.instantdb.com/dash
   - Log in with YOUR account
   - Select your app (ID: 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c)
   - Go to: Auth tab → Google
   - Paste your Client ID
   - Paste your Client Secret (from Google Console)
   - Save

4. **Update Config File**
   - Open: `config/oauth-config.js`
   - Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Client ID
   - Change `enabled: false` to `enabled: true`
   - Save the file

**Done!** Google login will work.

---

## For Apple Sign-In (Optional - 60 minutes + $99/year)

Apple requires a paid developer account ($99/year).

### What YOU Need To Do:

1. **Get Apple Developer Account**
   - Visit: https://developer.apple.com
   - Enroll in Apple Developer Program ($99/year)
   - Complete registration

2. **Create Service ID**
   - Go to: Certificates, Identifiers & Profiles
   - Click: Identifiers → + button
   - Select: Services IDs
   - Create ID: `com.landingpagem.web`
   - Enable: Sign in with Apple
   - Configure domains: `localhost`, `yourdomain.com`
   - Save

3. **Configure in InstantDB Dashboard**
   - Visit: https://www.instantdb.com/dash
   - Log in with YOUR account
   - Select your app
   - Go to: Auth tab → Apple
   - Enter your Service ID, Team ID, Key ID, Private Key
   - Save

4. **Update Config File**
   - Open: `config/oauth-config.js`
   - Replace `com.landingpagem.web` if you used a different ID
   - Change `enabled: false` to `enabled: true`
   - Save the file

**Done!** Apple login will work.

---

## 🎯 Recommendation: Start With Email Only

**Skip OAuth for now** and just use email authentication:

1. Push schema (2 commands above)
2. Test at http://localhost:8000/test-auth.html
3. Try sign up on main site
4. You'll get a magic code by email
5. Enter code and you're in!

**OAuth is optional** - email authentication works great and is much faster to set up!

---

## Summary

**What I can't do:**
- Access your accounts (InstantDB, Google, Apple)
- Log in for you
- Configure OAuth settings

**What you need to do:**
1. **Essential**: Run 2 commands to push schema (see Step 1)
2. **Optional**: Follow Google/Apple setup if you want OAuth

**What's already done:**
- All code is written and ready
- Config file created (`config/oauth-config.js`)
- Just needs your credentials pasted in
- Will work automatically once configured

---

## Quick Test Right Now

Without any OAuth configuration, test email authentication:

```bash
# 1. Push schema
npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c

# 2. Push permissions  
npx @instantdb/cli@latest push perms --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c

# 3. Test authentication
open http://localhost:8000/test-auth.html
```

This will work without any OAuth setup!

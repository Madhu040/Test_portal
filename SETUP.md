# Quick Setup Guide

## Step 1: InstantDB Account Setup

1. Go to https://www.instantdb.com
2. Sign up for a free account
3. Your app is already configured with ID: `1d7dcab3-cd11-4c0b-ad09-4b34f71c344c`

## Step 2: Push Schema to InstantDB

Open terminal in project directory and run:

```bash
# Push the data schema
npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c

# Push the permissions
npx @instantdb/cli@latest push perms --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
```

Or if you have the CLI installed globally:

```bash
instant-cli push schema
instant-cli push perms
```

## Step 3: Run the Application

Start a local web server:

```bash
# Using Python (recommended)
python3 -m http.server 8000

# Or using Node.js http-server
npx http-server -p 8000

# Or using PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Step 4: Test the Application

1. **Landing Page** (index.html):
   - Click "Log In" button
   - Enter your email
   - Check email for magic code
   - Enter code to log in

2. **Dashboard** (dashboard.html):
   - After login, click "Dashboard"
   - View your projects (empty at first)
   - See statistics

3. **App Builder** (app-builder.html):
   - Click "Get Started" or "New Project"
   - Enter project name
   - Describe your app
   - Select AI model, platforms, features
   - Click "Save Project"
   - Click "Build My App"
   - Watch real-time generation progress

4. **Project Management**:
   - View projects in dashboard
   - Edit existing projects
   - Delete projects
   - Track generations

## Step 5: Configure OAuth (Optional)

### Google OAuth:

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized origins: `http://localhost:8000`
6. Copy Client ID
7. In InstantDB dashboard, go to Auth → Google
8. Enter your Client ID and Client Secret
9. Update `scripts/script.js` with your Client ID (line ~45)

### Apple Sign-In:

1. Go to https://developer.apple.com
2. Create Service ID
3. Configure domains and return URLs
4. In InstantDB dashboard, go to Auth → Apple
5. Enter your Service ID and key
6. Update `scripts/script.js` with your Service ID (line ~65)

## Step 6: Deploy to Production

### Option 1: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Option 3: GitHub Pages

1. Push code to GitHub
2. Go to Settings → Pages
3. Select branch to deploy
4. Save

### Option 4: Manual Hosting

Upload all files to any static hosting:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- Any web server

**Important for Production:**
1. Update OAuth redirect URIs to your domain
2. Configure CORS in InstantDB dashboard
3. Enable HTTPS
4. Update InstantDB environment to production

## Troubleshooting

### "Database not initialized" error
- Check browser console for errors
- Verify InstantDB CDN loaded (check Network tab)
- Ensure you pushed schema to InstantDB

### Authentication not working
- Clear browser cache
- Check spam folder for magic code email
- Verify email in InstantDB dashboard
- Check browser console for auth errors

### Projects not saving
- Make sure you're logged in
- Check InstantDB dashboard for data
- Verify permissions were pushed
- Check browser console for transaction errors

### Real-time updates not working
- Check internet connection
- Verify InstantDB service is online
- Check browser console for WebSocket errors
- Try refreshing the page

## Next Steps

1. Customize the design (styles.css, builder.css, dashboard.css)
2. Add your own AI model integration
3. Implement actual code generation
4. Add payment integration for Pro/Enterprise plans
5. Create admin dashboard
6. Add team collaboration features
7. Implement code export to GitHub
8. Add deployment integrations

## Support

- InstantDB Docs: https://www.instantdb.com/docs
- InstantDB Discord: https://discord.gg/instantdb
- Project Issues: Check browser console

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Then edit `.env` with your OAuth credentials.

---

**You're all set!** 🎉

Your fullstack AI app builder is ready to use. Start by logging in and creating your first project.

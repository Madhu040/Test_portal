# Quick Commands for InstantDB Setup

## IMPORTANT: Do These First

### 1. Push Schema to InstantDB (REQUIRED)

```bash
npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
```

This creates your database tables (users, projects, generations, analytics).

### 2. Push Permissions to InstantDB (REQUIRED)

```bash
npx @instantdb/cli@latest push perms --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
```

This sets up security rules so users can only access their own data.

---

## Testing Authentication

### Option 1: Use the Test Page

```bash
# Make sure server is running on port 8000
# Then visit:
open http://localhost:8000/test-auth.html
```

This page lets you:
- Test InstantDB connection
- Send magic codes
- Verify codes
- Check authentication state
- Sign out
- See detailed status and errors

### Option 2: Use the Main App

```bash
# Visit the main page
open http://localhost:8000

# Click "Log In"
# Try signing in or signing up
```

---

## What Works NOW (After Pushing Schema)

✅ **Email Magic Code Authentication**
- Sign up with email
- Sign in with email
- Profile creation
- Session management
- Sign out

### What Needs Configuration

⚠️ **Google OAuth** - Requires:
1. Google Cloud Console setup
2. OAuth Client ID
3. InstantDB dashboard configuration
4. Code update with Client ID

See: `OAUTH_SETUP.md` → Part 1

⚠️ **Apple Sign-In** - Requires:
1. Apple Developer account ($99/year)
2. Service ID creation
3. Private key generation
4. InstantDB dashboard configuration
5. Code update with Service ID

See: `OAUTH_SETUP.md` → Part 2

---

## Debugging

### Check if InstantDB is loaded:

```javascript
// Open browser console and run:
console.log(typeof InstantDB); // Should be 'function'
console.log(typeof Auth); // Should be 'object'
console.log(window.InstantDBClient); // Should be an object
```

### Check current user:

```javascript
// In browser console:
Auth.getCurrentUser(); // Returns user object or null
Auth.isAuthenticated(); // Returns true or false
```

### Check database connection:

```javascript
// In browser console:
const db = window.InstantDBClient.getDB();
console.log(db); // Should show InstantDB client object
```

---

## Expected Behavior

### Before Pushing Schema:

❌ Magic code will fail (database tables don't exist yet)
❌ Sign in/sign up won't work
❌ Dashboard won't load projects
❌ App builder won't save projects

### After Pushing Schema:

✅ Magic code authentication works!
✅ Sign up collects user info
✅ Profile data saved
✅ Projects can be created
✅ Dashboard shows projects
✅ Real-time updates work

### After Configuring OAuth:

✅ Google sign-in button works
✅ Apple sign-in button works
✅ One-click authentication
✅ Social profile import

---

## Common Errors & Solutions

### "operation not permitted" when sending magic code

**Cause**: Schema not pushed to InstantDB

**Solution**: 
```bash
npx @instantdb/cli@latest push schema --app 1d7dcab3-cd11-4c0b-ad09-4b34f71c344c
```

### "Auth is not defined"

**Cause**: src/auth.js didn't load

**Solution**: 
- Check browser console for network errors
- Ensure files are in correct location
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### "Database not initialized"

**Cause**: InstantDB SDK didn't load from CDN

**Solution**:
- Check internet connection
- Check browser console Network tab
- Try refreshing page
- Verify CDN URL is correct

### Google/Apple buttons say "needs configuration"

**Cause**: OAuth not set up yet

**Solution**: 
- This is expected! OAuth requires manual setup
- Follow OAUTH_SETUP.md for instructions
- Magic code authentication works without OAuth

---

## Priority Steps

1. **Push schema** (5 minutes) ← DO THIS FIRST
2. **Push permissions** (1 minute) ← DO THIS SECOND
3. **Test magic code** (2 minutes) ← Verify it works
4. **Configure Google OAuth** (30 minutes) ← Optional
5. **Configure Apple Sign-In** (60 minutes + $99) ← Optional

---

## Testing Checklist

After pushing schema, test these:

- [ ] Visit test-auth.html
- [ ] Connection test passes
- [ ] Send magic code to your email
- [ ] Receive email with code
- [ ] Verify code successfully
- [ ] Check auth state shows user
- [ ] Sign out works
- [ ] Visit main page
- [ ] Click "Sign up"
- [ ] Fill in name, company, email
- [ ] Agree to terms
- [ ] Create account
- [ ] Verify code
- [ ] See welcome message
- [ ] Redirected to dashboard
- [ ] Projects load (empty state)

---

**Start here**: Run the two commands at the top of this file! ☝️

# Push to GitHub - Quick Guide

## Step 1: Create GitHub Repository (2 minutes)

1. **Go to GitHub**: https://github.com/new
2. **Repository name**: `landingpagem` (or any name you prefer)
3. **Description**: `AI-powered app builder with InstantDB backend`
4. **Visibility**: Choose Public or Private
5. **DO NOT** check any boxes (no README, no .gitignore, no license)
6. **Click**: "Create repository"

## Step 2: Copy the Repository URL

After creating the repo, GitHub will show you commands. You'll see a URL like:
```
https://github.com/YOUR_USERNAME/landingpagem.git
```

Copy this URL!

## Step 3: Push Your Code

Open terminal in your project folder and run:

```bash
cd /Users/madhu/Downloads/Cursor_folder

# Add GitHub as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/landingpagem.git

# Push to GitHub
git push -u origin main
```

If you get an authentication prompt:
- GitHub will ask for your username and password
- **Password**: Use a Personal Access Token (not your GitHub password)
- Get token from: https://github.com/settings/tokens

## Alternative: Use SSH (if you have SSH keys set up)

```bash
# If you prefer SSH
git remote add origin git@github.com:YOUR_USERNAME/landingpagem.git
git push -u origin main
```

---

## ⚠️ Important Notes

1. **node_modules** is in .gitignore - won't be pushed (that's correct!)
2. **config/oauth-config.js** is in .gitignore - won't push your credentials (that's correct!)
3. **lib/instantdb.js** WILL be pushed (136KB file from node_modules)

## Quick Summary

**What I cannot do:**
- Create the GitHub repository for you (needs your account)
- Push to GitHub (needs your credentials)

**What YOU need to do:**
1. Create repo on GitHub.com
2. Copy the repository URL
3. Run the `git remote add` command with your URL
4. Run `git push -u origin main`

**Total time: 3-5 minutes**

---

## After Pushing

Your code will be on GitHub and you can:
- Share the link with others
- Clone it on other machines
- Set up GitHub Pages for deployment
- Enable GitHub Actions for CI/CD

Let me know when you've created the repository and I can help with the push commands!

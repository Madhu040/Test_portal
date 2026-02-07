# 🚀 Push Schema via Web Dashboard (Easiest Method)

The CLI login is having issues, so let's use the web dashboard instead - it's actually easier!

---

## Step 1: Go to InstantDB Dashboard

**Open this link:** https://www.instantdb.com/dash

Log in with your InstantDB account.

---

## Step 2: Select Your App

Look for your app with ID: **1d7dcab3-cd11-4c0b-ad09-4b34f71c344c**

Click on it to open the app dashboard.

---

## Step 3: Push Schema

### Option A: If there's a "Schema" or "Code" tab:

1. Click on the **Schema** or **Code** tab
2. Look for `instant.schema.ts` file
3. **Copy everything below** and paste it:

```typescript
// InstantDB Schema Definition
// This file defines the data model for the application

export default {
  // Extended user profile
  $users: {
    email: { type: 'string', unique: true, indexed: true },
    name: { type: 'string' },
    avatar: { type: 'string' },
    plan: { type: 'string', default: 'free' }, // free, pro, enterprise
    createdAt: { type: 'date', default: 'now' }
  },

  // User's app builder projects
  projects: {
    userId: { type: 'ref', to: '$users', indexed: true },
    title: { type: 'string', required: true },
    description: { type: 'string' },
    prompt: { type: 'string', required: true },
    model: { type: 'string', default: 'gpt5' }, // gpt5, claude, qwen, kimi
    platforms: { type: 'json', default: [] }, // ['iOS', 'Android', 'Web']
    features: { type: 'json', default: [] }, // array of selected features
    style: { type: 'string', default: 'modern' },
    status: { type: 'string', default: 'draft' }, // draft, generating, completed, failed
    createdAt: { type: 'date', default: 'now', indexed: true },
    updatedAt: { type: 'date', default: 'now' }
  },

  // Track app generation history
  generations: {
    projectId: { type: 'ref', to: 'projects', indexed: true },
    userId: { type: 'ref', to: '$users', indexed: true },
    code: { type: 'json', default: {} }, // generated files structure
    preview: { type: 'string' }, // preview URL
    generatedAt: { type: 'date', default: 'now', indexed: true },
    duration: { type: 'number' }, // seconds
    status: { type: 'string', default: 'pending' } // pending, generating, completed, failed
  },

  // Usage tracking and analytics
  analytics: {
    userId: { type: 'ref', to: '$users', indexed: true },
    eventType: { type: 'string', indexed: true }, // login, logout, project_created, generation_started, etc.
    metadata: { type: 'json', default: {} },
    timestamp: { type: 'date', default: 'now', indexed: true }
  }
};

// Relationships:
// - Users → Projects (one-to-many via userId)
// - Projects → Generations (one-to-many via projectId)  
// - Users → Analytics (one-to-many via userId)
```

4. Click **Save** or **Deploy**

### Option B: If there's an "Explorer" or "Data" tab:

The schema might auto-create tables when you first use them. In that case, the schema will be set up automatically when you test the app!

---

## Step 4: Push Permissions

Look for **Permissions**, **Rules**, or **instant.perms.ts** section.

**Copy everything below** and paste it:

```typescript
// InstantDB Permissions Rules
// Define access control for all entities

export default {
  // Users can read their own profile
  $users: {
    bind: ['isOwner', 'auth.id == data.id'],
    allow: {
      view: 'isOwner',
      update: 'isOwner',
      delete: 'isOwner'
    }
  },

  // Projects: users can only access their own projects
  projects: {
    bind: ['isOwner', 'auth.id == data.userId'],
    allow: {
      view: 'isOwner',
      create: 'auth.id != null', // Must be authenticated
      update: 'isOwner',
      delete: 'isOwner'
    }
  },

  // Generations: users can only access generations for their projects
  generations: {
    bind: ['isOwner', 'auth.id == data.userId'],
    allow: {
      view: 'isOwner',
      create: 'auth.id != null', // Must be authenticated
      update: 'isOwner',
      delete: 'isOwner'
    }
  },

  // Analytics: users can only view their own analytics
  analytics: {
    bind: ['isOwner', 'auth.id == data.userId'],
    allow: {
      view: 'isOwner',
      create: 'auth.id != null', // Must be authenticated
      // Analytics are immutable once created
      update: false,
      delete: false
    }
  }
};

// Default rule: deny all access unless explicitly allowed
// Public landing page data doesn't need InstantDB - it's static HTML
```

Click **Save** or **Deploy**

---

## Step 5: Enable Email Authentication

In the InstantDB dashboard:

1. Go to the **Auth** or **Authentication** tab
2. Make sure **Email/Magic Link** authentication is **enabled**
3. Save if needed

---

## Step 6: Test Your App! 🎉

```bash
# Server should already be running, but if not:
python3 -m http.server 8000

# Open test page
open http://localhost:8000/test-auth.html

# Or open main site
open http://localhost:8000
```

---

## What to Test:

1. **Test InstantDB Connection** - Click the button, should say "Connected!"
2. **Send Magic Code** - Enter your email, you'll get a code
3. **Verify Code** - Enter the code you received
4. **Check User** - Should show your user info
5. **Try Sign Up** - On main page, try creating an account!

---

## ✅ That's It!

Once you paste the schema and permissions in the dashboard and save them, your app will be fully functional!

**No more CLI needed!** The web dashboard is actually the easiest way.

Let me know once you've pasted the schema and permissions, and we can test it together!

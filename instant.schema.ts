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

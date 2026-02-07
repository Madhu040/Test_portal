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

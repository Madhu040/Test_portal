// InstantDB Client Configuration
// Initialize InstantDB with the app ID

const APP_ID = '1d7dcab3-cd11-4c0b-ad09-4b34f71c344c';

// Import InstantDB from CDN (loaded via script tag in HTML)
// This will be available as window.InstantDB

let db = null;

// Initialize the database
function initDB() {
  // Check if InstantDB is loaded from CDN
  if (typeof window.InstantDB === 'undefined') {
    console.error('InstantDB not loaded from CDN. Check script tag.');
    return null;
  }
  
  if (!db) {
    try {
      // Initialize with the correct syntax
      db = window.InstantDB({ appId: APP_ID });
      console.log('✓ InstantDB initialized successfully');
      console.log('✓ App ID:', APP_ID);
    } catch (error) {
      console.error('Failed to initialize InstantDB:', error);
      return null;
    }
  }
  
  return db;
}

// Get the database instance
function getDB() {
  if (!db) {
    return initDB();
  }
  return db;
}

// Export for use in other modules
window.InstantDBClient = {
  getDB,
  initDB,
  APP_ID
};

// Auto-initialize on load with better error handling
function initialize() {
  console.log('Initializing InstantDB...');
  
  // Wait a bit for CDN to load
  if (typeof window.InstantDB === 'undefined') {
    console.log('InstantDB not loaded yet, retrying...');
    setTimeout(initialize, 100);
    return;
  }
  
  initDB();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

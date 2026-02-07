// InstantDB Client Configuration
// Initialize InstantDB with the app ID

const APP_ID = '1d7dcab3-cd11-4c0b-ad09-4b34f71c344c';

// Import InstantDB from CDN (loaded via script tag in HTML)
// This will be available as window.InstantDB

let db = null;

// Initialize the database
function initDB() {
  if (typeof InstantDB === 'undefined') {
    console.error('InstantDB not loaded. Make sure to include the CDN script.');
    return null;
  }
  
  if (!db) {
    db = InstantDB({ appId: APP_ID });
    console.log('InstantDB initialized successfully');
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

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDB);
} else {
  initDB();
}

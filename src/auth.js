// Authentication Helper Functions
// Manages user authentication with InstantDB

// Get the database instance
function getDB() {
  return window.InstantDBClient?.getDB();
}

// Track analytics event
function trackEvent(eventType, metadata = {}) {
  const db = getDB();
  if (!db) return;
  
  const user = db.auth.user;
  if (!user) return;
  
  db.transact([
    db.tx.analytics[db.id()].update({
      userId: user.id,
      eventType,
      metadata,
      timestamp: new Date().toISOString()
    })
  ]);
}

// Sign in with email (magic code)
async function signInWithEmail(email) {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.auth.sendMagicCode({ email });
    return { success: true, message: 'Magic code sent! Check your email.' };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Verify magic code
async function verifyMagicCode(email, code) {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.auth.signInWithMagicCode({ email, code });
    trackEvent('login', { method: 'email' });
    return { success: true };
  } catch (error) {
    console.error('Verification error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with Google
async function signInWithGoogle(idToken) {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.auth.signInWithIdToken({ clientName: 'google-web', idToken });
    trackEvent('login', { method: 'google' });
    return { success: true };
  } catch (error) {
    console.error('Google sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Sign in with Apple
async function signInWithApple(idToken) {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  try {
    await db.auth.signInWithIdToken({ clientName: 'apple', idToken });
    trackEvent('login', { method: 'apple' });
    return { success: true };
  } catch (error) {
    console.error('Apple sign in error:', error);
    return { success: false, error: error.message };
  }
}

// Sign out
async function signOut() {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  try {
    trackEvent('logout');
    await db.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

// Get current user
function getCurrentUser() {
  const db = getDB();
  if (!db) return null;
  return db.auth.user;
}

// Check if user is authenticated
function isAuthenticated() {
  const user = getCurrentUser();
  return user !== null && user !== undefined;
}

// Update user profile
async function updateUserProfile(updates) {
  const db = getDB();
  if (!db) throw new Error('Database not initialized');
  
  const user = getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  
  try {
    await db.transact([
      db.tx.$users[user.id].update(updates)
    ]);
    return { success: true };
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false, error: error.message };
  }
}

// Listen to auth state changes
function onAuthStateChanged(callback) {
  const db = getDB();
  if (!db) return () => {};
  
  // Subscribe to auth changes
  const unsubscribe = db.subscribeAuth(callback);
  return unsubscribe;
}

// Export auth functions
window.Auth = {
  signInWithEmail,
  verifyMagicCode,
  signInWithGoogle,
  signInWithApple,
  signOut,
  getCurrentUser,
  isAuthenticated,
  updateUserProfile,
  onAuthStateChanged,
  trackEvent
};

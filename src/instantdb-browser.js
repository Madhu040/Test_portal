// InstantDB Browser Bundle
// This file properly exposes InstantDB to the browser

// Import from the installed node_modules
import { init, id, tx } from '../node_modules/@instantdb/core/dist/esm/index.js';

// Expose to window
window.InstantDB = init;
window.InstantDB.id = id;
window.InstantDB.tx = tx;

console.log('✓ InstantDB loaded and exposed to window');

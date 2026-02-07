// InstantDB wrapper to expose the module as window.InstantDB
(function() {
    'use strict';
    
    // Load the UMD module
    var instantDBModule = {};
    (function(exports) {
        // Include the actual InstantDB code here by loading it
        var script = document.createElement('script');
        script.src = 'node_modules/@instantdb/core/dist/standalone/index.umd.cjs';
        script.onload = function() {
            console.log('InstantDB module loaded');
        };
        document.head.appendChild(script);
    })(instantDBModule);
    
    // This approach won't work well, let's use a different method
})();

// Actually, let's just use the ESM version directly
import { init } from './node_modules/@instantdb/core/dist/esm/index.js';
window.InstantDB = init;

let session = require('express-session');
let MemoryStore = require('memorystore')(session);

/**
 * Creates the MemoryStore used for sessions.
 * Note that this is not the default memory-store from express.
 */
module.exports = {
    store: new MemoryStore({checkPeriod: 86400000})
};

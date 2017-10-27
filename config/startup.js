let UserMapper = require('../domain-layer/mappers/UserMapper');

module.exports = {
    /**
     * Run tasks on server startup.
     */
    run: function() {
        // Clear login sessions from database since express memory-store is always cleared
        UserMapper.clearAllLoginSessions();
    },
};


const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

require('./authentication.routes.js')(router);
require('./user.routes')(router);

module.exports = router;

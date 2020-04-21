
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    console.log('Time: ', Date.now());
    next();
};
router.use(allowCrossDomain);

require('./authentication.routes.js')(router);
require('./user.routes')(router);
require('./company.routes')(router);
require('./projectType.routes')(router);
require('./client.routes')(router);

module.exports = router;

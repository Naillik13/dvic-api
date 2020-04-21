module.exports = (router) => {
    const clients = require('../controllers/client.controller');

    router.get('/clients', clients.findAll);

    router.post('/clients', clients.create);

};
module.exports = (router) => {
    const authentication = require('../controllers/authentication.controller');
    const clients = require('../controllers/client.controller');

    router.get('/clients', authentication.isAdmin, clients.findAll);

    router.post('/clients', authentication.isAuthenticated, clients.create);

    router.get('/companies/:companyId/clients', authentication.isAuthenticated, clients.findByCompany);
};

module.exports = (router) => {
    const authentication = require("../controllers/authentication.controller");
    const companies = require('../controllers/company.controller.js');

    router.post('/companies', authentication.isAuthenticated, companies.create);

    router.get('/companies', authentication.isAdmin, companies.findAll);

    router.get('/companies/:companyId', authentication.isAuthenticated, companies.findOne);

    router.delete('/companies/:companyId', authentication.isAdmin, companies.delete);
};

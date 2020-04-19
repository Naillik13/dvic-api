module.exports = (router) => {
    const companies = require('../controllers/company.controller.js');

    router.post('/companies', companies.create);

    router.get('/companies', companies.findAll);
    //
    // router.get('/companies/:companyId', companies.findOne);
    //
    router.delete('/companies/:companyId', companies.delete);
};

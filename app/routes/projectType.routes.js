module.exports = (router) => {
    const projectTypes = require('../controllers/projectType.controller');
    const authentication = require("../controllers/authentication.controller");

    router.get('/project-types', authentication.isAdmin, projectTypes.findAll);

    router.post('/project-types', authentication.isAuthenticated, projectTypes.create);

    router.get('/companies/:companyId/project-types', authentication.isAuthenticated, projectTypes.findByCompany);

};

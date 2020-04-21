module.exports = (router) => {
    const authentication = require("../controllers/authentication.controller");
    const projects = require('../controllers/project.controller');

    router.get('/projects', authentication.isAdmin, projects.findAll);

    router.post('/projects', authentication.isAuthenticated, projects.create);

    router.get('/companies/:companyId/projects', authentication.isAuthenticated, projects.findByCompany);

};

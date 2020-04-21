module.exports = (router) => {
    const projectTypes = require('../controllers/projectType.controller');

    router.get('/project-types', projectTypes.findAll);

    router.post('/project-types', projectTypes.create);

    router.get('/companies/:companyId/project-types', projectTypes.findByCompany);

};

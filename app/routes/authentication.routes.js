module.exports = (app) => {
    const authentication = require('../controllers/authentication.controller');

    app.post('/auth', authentication.signIn)
};
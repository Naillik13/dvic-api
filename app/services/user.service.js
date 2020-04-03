const User = require('../models/user.model.js');

exports.isAdminWithEmail = async (email) => {
    const query = {email: email};
    return await User.findOne(query).then(user => {
        console.log(!user.admin);
        return !(!user || !user.admin);
    }).catch(e => {
        throw e
    })
};

exports.isAdminOrSameUser = async (email, id) => {
    const query = {email: email};
    return await User.findOne(query).then(user => {
        console.log(!user.admin);
        if (user){
            return (user.admin || user.id === id)
        } else {
            return false
        }
    }).catch(e => {
        throw e
    })
};
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true, required:true},
    password: {type: String, required:true},
    admin: {type: Boolean, required:true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

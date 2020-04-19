const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    siret: {type: String, unique: true, required:true},
    name: {type: String, required:true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);

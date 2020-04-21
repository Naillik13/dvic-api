const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {type: String, required:true},
    siret: {type: String, required:true},
    contact: {type: String, required: true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);

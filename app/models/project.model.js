const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String},
    duration: {type: Number},
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectType', required: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);

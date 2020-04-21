const mongoose = require('mongoose');

const ProjectTypeSchema = mongoose.Schema({
    code: {type: String, unique: true, required:true},
    label: {type: String, required: true},
    company: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true}
}, {
    timestamps: false
});

module.exports = mongoose.model('ProjectType', ProjectTypeSchema);

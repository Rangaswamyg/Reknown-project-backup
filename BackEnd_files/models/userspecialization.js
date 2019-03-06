var mongoose = require('mongoose');

const SpecializationSchema = mongoose.Schema({
    id: {
        type: String
    },
    qualifi_id: {
        type: String
    },
    specialization: {
        type: String
    },
    areainterest: {
        type: String
    },
}, { collection: 'userspecialization' });

const Specialization = module.exports = mongoose.model('Specialization', SpecializationSchema);

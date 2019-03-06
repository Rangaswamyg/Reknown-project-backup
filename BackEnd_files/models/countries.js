var mongoose = require('mongoose');

const CountrymasterSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    num_of_universities: { type: Number },
    num_of_programs: { type: Number },
    num_of_students: { type: Number },
    overview: { type: String },
    universities_list: { type: Array },
    scholarships_info: [{
        scholarship_content: String,
        scholarship_name: String,
        scholarship_link: String
    }],
    entry_requirement_info: [{
        entry_req_content: String,
        entry_req_list: Array
    }],
    lifestyle_info: [{
        lifestyle_content: String,
        lifestyle_list: Array
    }],
    visaguide_info: [{
        visaguide_content: String,
        visaguide_documents: Array,
        visaguide_link: String
    }]
});

const Countrymaster = module.exports = mongoose.model('Countrymaster', CountrymasterSchema);

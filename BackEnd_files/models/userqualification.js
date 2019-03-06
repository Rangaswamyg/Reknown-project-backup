var mongoose = require('mongoose');

const QualificationSchema = mongoose.Schema({
   id:{
       type:String
   },
   qualification_name:{
       type:String
   }
},{collection:'userqualification'});

const Qualification = module.exports = mongoose.model('Qualification', QualificationSchema);

var mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
   cities:{
       type:String
   }
},{collection:'usercity'});

const City = module.exports = mongoose.model('City', CitySchema);

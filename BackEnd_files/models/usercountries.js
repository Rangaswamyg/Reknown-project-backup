var mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
   name:{
       type:String
   },
   dial:{
       type:String
   }
},{collection:'usercountries'});

const Country = module.exports = mongoose.model('Country', CountrySchema);

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


const UserSchema = mongoose.Schema({
    active: { type: Boolean, required: true, default: false },
    //temporarytoken: { type: String, required: true },
    resettoken: { type: String, required: false },
    //email: { type: String, require: true, unique: true, lowercase: true, validate: emailValidators },
    //  password: { type: String, require: true, validate: passwordValidators, select: true },
    creation_dt: { type: Date, require: true }
});



module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

// module.exports.getUserByEmail = function (email, callback) {
//     const query = { email: email }
//     User.findOne(query, callback);
// }

//module.exports.addUser = function(newUser, callback){
//bcrypt.genSalt(10, (err, salt) => {
//  bcrypt.hash(newUser.password, salt, (err, hash) => {
//    if(err) throw err;
//   newUser.password = hash;
//  newUser.save(callback);
// });
//});
// }
// UserSchema.encrypt_pwd=function(password,callback){
//     bcrypt.hash(password, null, null, (err, hash) => {
//         if (err) return next(err);
//         return callback(hash);
//     });
// }
// UserSchema.pre('save', function (next) {
//     if (!this.isModified('password'))
//         return next();

//     bcrypt.hash(this.password, null, null, (err, hash) => {
//         if (err) return next(err);
//         this.password = hash;
//         next();
//     });
// });



//User.methods.comparePassword = function (candidatePassword, hash, callback) {
//bcrypt.compare(candidatePassword,this.password, hash, (err, isMatch) => {
//if (err) throw err;
// callback(null, isMatch);
//});
//}
//UserSchema.methods.comparePassword = function(password) {
// var user = this;

//return bcrypt.compareSync(password, user.password);
//}

// UserSchema.methods.comparePassword = function (candidatePassword) {
//     var user = this
//     if (user.password != null) {
//         return bcrypt.compareSync(candidatePassword, user.password);
//     } else {
//         return false;
//     }
// };

const User = module.exports = mongoose.model('User', UserSchema);

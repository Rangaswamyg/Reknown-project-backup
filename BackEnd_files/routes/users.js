const express = require('express');//value of variable not gone change
const router = express.Router();
const User = require('../models/user');
const City = require('../models/usercities');
const Country = require('../models/usercountries');

const jwt = require('jsonwebtoken');
const config = require('../config/passportsecret');
var bcrypt = require('bcrypt-nodejs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// const Users = require('../models/Users');




//         errors: {
//           password: 'is required',
//         },
//       });
//     }

//     const finalUser = new Users(user);

//     finalUser.setPassword(user.password);

//     return finalUser.save()
//       .then(() => res.json({ user: finalUser.toAuthJSON() }));
//   });

// // login jwt
// router.post('/login', auth.optional, (req, res, next) => {
//     const { body: { user } } = req;

//     if(!user.email) {
//       return res.status(422).json({
//         errors: {
//           email: 'is required',
//         },
//       });
//     }

//     if(!user.password) {
//       return res.status(422).json({
//         errors: {
//           password: 'is required',
//         },
//       });
//     }

//     return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
//       if(err) {
//         return next(err);
//       }

//       if(passportUser) {
//         const user = passportUser;
//         user.token = passportUser.generateJWT();

//         return res.json({ user: user.toAuthJSON() });
//       }

//       return status(400).info;
//     })(req, res, next);
//   });



router.get('/reg_data', (req, res, next) => {
  User.find((err, result) => {
    if (err) res.send("wrong");
    else res.json(result);
  });
});


// signup with jwt
router.post('/register', (req, res, next) => {
  // console.log("singup dataaaaaaaaaaaaaaaaaaaaaaaa",req.body);
  var user = req.body;

  function get_enc_pwd(callback) {
    bcrypt.hash(user.password, null, null, (err, hash) => {
      if (err) return next(err);
      else callback(err, hash);
    });
  }
  get_enc_pwd(function (err, result) {
    if (err) console.log(err);
    else {
      //console.log(result);
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("LIVEDATA_MASTERS");
        user.password = result;
        dbo.collection('users').findOne({ email: user.email }, function (err, result) {
          if (!err) {
            console.log(result);
            if (!result) {
              dbo.collection('users').insertOne(user, function (err, result) {
                if (!err) {
                  // res.send({ "res": "registered" });
                  res.send({otp:123456});
                } else console.log(err);
              });
            } else {
              res.send({ "res": "already existed" });
            }
          } else console.log(err);
        });

      });
    }
  });

});
router.post('/resend_otp',function(req,res,next){
  if(req.body.resend_otp){
    res.send({otp:"123497"});
  }else{
    console.log("resend not done");
  }
});

// login with jwt
router.post('/login', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LIVEDATA_MASTERS");
    dbo.collection('users').findOne({ email: req.body.email }, function (err, user) {
      if (err) throw err; // Throw err if cannot connect
      // Check if user is found in the database (based on username)
      if (!user) {
        res.json({ success: false, message: 'Email not found' }); // Username not found in database
      } else if (user) {
        if (!req.body.password) {
          res.json({ success: false, message: 'No password provided' }); // Password was not provided
        } else {
          var validPassword = bcrypt.compareSync(req.body.password, user.password); // Check if password matches password provided by user
          if (!validPassword) {
            res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
          }
          //    else if (!user.active) {
          //     //    check otp verified or not
          //     res.json({ success: false, message: 'User not active', expired: true }); // Account is not activated
          //   }
          else {
            const token = jwt.sign({ userId: user._id }, config.secret, {
              expiresIn: 604800 // 1week
            });
            res.json({
              success: true, message: 'User authenticated!', token: token, user: { email: user.email }
            }); // Return token in JSON object to controller
            dbo.collection('users').updateOne({ email: req.body.email },{$set:{token:token}}, function (err, user) {
              if(err)console.log(err);
              else {
                    console.log("token updated.............................");
              }
            });

          }
        }
      }
    });
  });
});



// router.get('/get', (req, res, next) => {
// 	res.send('user working');
// });

// Register
// router.post('/signups', (req, res, next) => {
//     if (!req.body.firstname) {
//         res.json({ success: false, message: 'You must provide a firstname' });
//     } else {
//         if (!req.body.lastname) {
//             res.json({ success: false, message: 'You must provide a lastname' });
//         } else {
//             if (!req.body.email) {
//                 res.json({ success: false, message: 'You must provide an e-mail' });
//             } else {
//                 if (!req.body.password) {
//                     res.json({ success: false, message: 'You must provide an password' });
//                 } else {
//                     if (!req.body.current_city) {
//                         res.json({ success: false, message: 'You must provide an current city' });
//                     } else {
//                         if (!req.body.country_code) {
//                             res.json({ success: false, message: 'You must provide an country code' });
//                         } else {
//                             if (!req.body.mobilenumber) {
//                                 res.json({ success: false, message: 'You must provide an mobile number' });
//                             } else {
//                                 if (!req.body.qualification) {
//                                     res.json({ success: false, message: 'You must provide an qualification' });
//                                 } else {
//                                     if (!req.body.specialization) {
//                                         res.json({ success: false, message: 'You must provide an specialization' });
//                                     } else {
//                                         if (!req.body.future_year) {
//                                             res.json({ success: false, message: 'You must provide an studies plan year' });
//                                         } else {
//                                             if (!req.body.preferred_country) {
//                                                 res.json({ success: false, message: 'You must provide an preferred country' });
//                                             } else {
//                                                 if (!req.body.program_level) {
//                                                     res.json({ success: false, message: 'You must provide an program level' });
//                                                 } else {
//                                                     if (!req.body.area_interest) {
//                                                         res.json({ success: false, message: 'You must provide an area interest' });
//                                                     } else {
//                                                         if (!req.body.future_specialization) {
//                                                             res.json({ success: false, message: 'You must provide an specialization' });
//                                                         } else {
//                                                             if (!req.body.privacypolicy_termscondition) {
//                                                                 res.json({ success: false, message: 'You must fill all field' });
//                                                             } else {
//                                                                 if (!req.body.agreement_info) {
//                                                                     res.json({ success: false, message: 'You must fill all field' });
//                                                                 } else {
//                                                                     if (!req.body.cnfpassword) {
//                                                                         res.json({ success: false, message: 'You must fill confirmation password' });
//                                                                     } else {
//                                                                         let user = new User({
//                                                                             firstname: req.body.firstname,
//                                                                             lastname: req.body.lastname,
//                                                                             email: req.body.email,
//                                                                             password: req.body.password,
//                                                                             cnfpassword: req.body.cnfpassword,
//                                                                             current_city: req.body.current_city,
//                                                                             country_code: req.body.country_code,
//                                                                             mobilenumber: req.body.mobilenumber,
//                                                                             qualification: req.body.qualification,
//                                                                             specialization: req.body.specialization,
//                                                                             future_year: req.body.future_year,
//                                                                             preferred_country: req.body.preferred_country,
//                                                                             program_level: req.body.program_level,
//                                                                             area_interest: req.body.area_interest,
//                                                                             future_specialization: req.body.future_specialization,
//                                                                             privacypolicy_termscondition: req.body.privacypolicy_termscondition,
//                                                                             agreement_info: req.body.agreement_info,
//                                                                             creation_dt: Date.now()
//                                                                         });
//                                                                         // save user
//                                                                         user.save((err) => {
//                                                                             if (err) {
//                                                                                 if (req.body.password !== req.body.cnfpassword) {
//                                                                                     res.json({ success: false, message: 'Your password and confirmationPassword does not match' });
//                                                                                 } else {
//                                                                                     if (err.code == 11000) {
//                                                                                         res.json({ success: false, message: 'email already exists' });
//                                                                                     } else {
//                                                                                         if (err.errors) {
//                                                                                             if (err.errors.email) {
//                                                                                                 res.json({ success: false, message: err.errors.email.message });
//                                                                                             } else {
//                                                                                                 // Check if validation error is in the password field
//                                                                                                 if (err.errors.password) {
//                                                                                                     res.json({ success: false, message: err.errors.password.message }); // Return error
//                                                                                                 } else {
//                                                                                                     res.json({ success: false, message: 'Please fill all field'}); // Return any other error not already covered
//                                                                                                 }
//                                                                                             }
//                                                                                         } else {
//                                                                                             res.json({ success: false, message: 'Could not save user.Error:', err });
//                                                                                         }
//                                                                                     }
//                                                                                 }
//                                                                             } else {
//                                                                                 //    return succcess
//                                                                                 res.json({ success: true, message: 'Account Registered' }); // Return success
//                                                                             }
//                                                                         });
//                                                                     }
//                                                                 }
//                                                             }
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });

//get user detail
// router.get('/userdetail', (req, res, next) => {
//     countries.find(function (err, result) {
//         if (err) {
//             return (err);
//         } else {
//             res.json(result);
//         }
//     });
// });

// dropdown city and countrycode
router.get('/cities', (req, res, next) => {
  City.find(function (err, result) {
    if (err) {
      return (err);
    } else {
      res.json(result);
    }
  });
});
// router.get('/cities', (req, res, next) => {
//   var MongoClient = require('mongodb').MongoClient;
//   var url = "mongodb://127.0.0.1:27017/";
//   MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("schoolingcouncil");
// var query = { countryname: req.body.countryname, locationname: req.body.locationname };
// dbo.collection("usercities").find({}).toArray(function(err, result) {
//var out={};
//   if (err) throw err;
//console.log(result);
// out['cty'] = result;
//   res.json(result);
//   db.close();
// });
//   });
//});
router.get('/countrycode', (req, res, next) => {
  Country.find(function (err, result) {
    if (err) {
      return (err);
    } else {
      res.json(result);
    }
  });
});
router.get('/country/:id', function (req, res) {
  Country.find({ _id: req.params.id }, function (err, countries) {
    if (err) res.json(err);
    else res.json(countries);
  });
});

// qualifiacation and specialization
router.get('/test', (req, res, next) => {
  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("LiveDta_m");
    var query = [
      {
        $lookup:
            {
              from: "userspecialization",
              localField: "id",
              foreignField: "qualifi_id",
              as: "speacializationinfo"
            }
      }
    ];
    dbo.collection("userqualification").aggregate(query).toArray(function (err, eResult) {
      if (err) throw err;
      res.json(eResult);
      db.close();
    });

  });
});

// search
// router.get('/searchcountry',function(req,res,next){
//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://127.0.0.1:27017/";
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("schoolingcouncil");
//         var q= req.query.q;
//         dbo.collection("usercountries").find({
//             name:{
//                 $regex:new RegExp(q)
//             }
//         },{
//             _id:0,
//             __v:0
//         },function(err,data){
//             res.json(data);
//         }).limit(10);
//         db.close();
//     });
// });
router.get('/searchcountry', function (req, res, next) {
  var q = req.query.q;
  Country.find({
    name: {
      $regex: new RegExp(q.toLowerCase())
    }
  }, {
    _id: 0,
    __v: 0
  }, function (err, data) {
    if (err) {
      res.json("Something wrong");
    } else {
      res.json(data);
    }
  }).limit(10);
});





// middlewar for jwt token
router.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.json({ success: false, message: 'No token provided' });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: 'Token invalid' + err });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

// Dashboard
//Profile


router.get('/profile', (req, res) => {
  // MongoClient.connect(url, function (err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("schoolingcouncil");
  //     dbo.collection('users').findOne({ _id: req.decoded.userId }, function (err, user) {
  //           if (err) {
  //         res.json({ success: false, message: err });
  //     } else {
  //         if (!user) {
  //             res.json({ success: false, message: 'User not found' });
  //         } else {
  //             res.json({ success: true, user: user });
  //         }
  //     }
  //     });
  // });

  User.findOne({ _id: req.decoded.userId }).select('').exec((err, user) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!user) {
        res.json({ success: false, message: 'User not found' });
      } else {
        res.json({ success: true, user: user });
      }
    }
  });
});

module.exports = router;

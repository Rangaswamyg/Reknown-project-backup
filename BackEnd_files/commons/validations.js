var commons = require("./commons.js");

var express = require('express');
var cookieParser = require('cookie-parser');
var cookieEncrypter = require('cookie-encrypter');
var app = express();
var valid = require("./validations")
exports.shouldNotLoggedIn = function (req, res, next) {
    // commons.logger.info("enterd to shouldNotLoggedIn : ");
    // commons.logger.info('Decrypted cookies: ', req.signedCookies.cookie["uid"]);
    if (req.signedCookies.ta_eck) {
        commons.logger.info("enterd to shouldNotLoggedIn : IF function");
        res.redirect("/home#!/reports/?type=email");
    } else {
        commons.logger.info("enterd to shouldNotLoggedIn : Else function");
        next();
    }

};
exports.shouldLoggedIn = function (req, res, next) {
    // commons.logger.info("enterd to shouldLoggedIn : ");
    // commons.logger.info("***********signed cookies", req.signedCookies);
    if (req.signedCookies.ta_eck) {
        // if (req.session.user) {

        next();

        // }
        // else {
        //     res.clearCookie('ta_eck');
        //     res.redirect("/login");
        // }
    } else {
        commons.logger.info("esle  ----- Condition in validation");
        res.redirect("/login");
    }
};
function test(){
    const nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'mamatharupa@gmail.com',
            pass: 'mamatha@jjbytes'
        }
    });

    let mailOptions = {
        from: 'jjbyets.developeronrent@gmail.com',
        to: 'mamatharupa@gmail.com',
        subject: 'change password',
        text: 'Hello World!',
        html: "'<p>Click <a href=\"http://localhost:4200/forgotPassword'\">here</a> to reset your password</p>'\n" // html body

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
}
test();

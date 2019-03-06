var tracer = require('tracer');
var fs = require('fs');
var colors = require('colors');
var ObjectID = require('mongodb').ObjectID;
//var aes = require("./aes.js");
// exports.runMode = "local";
if (process.argv[2] === "local") {
    exports.url_mode = "mongodb://localhost:27017/";
    exports.db_mode = "LiveData_m";

}
if (process.argv[2] === "testLive") {

    exports.url_mode = "mongodb://localhost:27017/";
    exports.db_mode = "LIVEDATA_MASTERS";
}
if (process.argv[2] === "prod") {

    exports.url_mode = "mongodb://localhost:27017/";
    exports.db_mode = "prod";
}
var MongoClient = require('mongodb').MongoClient
    , Server = require('mongodb').Server;
exports.get_mogno_connection = function (url, db_name, callback) {
  /*  MongoClient.connect(url,function (err, db) {
        if (err) return callback(err, null);
        var dbo = db.db(db_name);
        return callback(null, dbo);


    });*/


    var mongoClient = new MongoClient(new Server('localhost', 27017));
    mongoClient.connect(function(err, mongoClient) {
        var dbo = mongoClient.db("LIVEDATA_MASTERS");
        return callback(null, dbo);
        //mongoClient.close();
    });
}

exports.send_mail=function(to_mail,callback){
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
        to: to_mail,
        subject: 'change password',
        text: 'Hello World!',
        html: '<p><a href="http://localhost:4200/resetpassword/'+to_mail+'">click</a> to reset your password</p>'

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            return callback(error.message);
        }
        console.log("successs");
        callback(null,'success');
    });
};

exports.logger = tracer.console({
    transport: function (data) {
        console.log(data.output);
        fs.appendFile(__dirname + '/../logs/log_' + new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getYear() + ".log", data.output + '\n', function (err) {
            if (err) {
                throw new Error("logger error" + err);
                // fs.create()
            }
        });
    },
    filters: {
        //log : colors.black,
        //trace: colors.magenta,
        //debug: colors.blue,
        info: colors.green,
        //warn: colors.yellow,
        error: [colors.red, colors.bold]
    }
});


//exports.encrypt = function (data) {
//    return aes.encrypt(data);
//};
//exports.decrypt = function (data) {
//    return aes.decrypt(data);
//};

exports.objectIdWithTimestamp = function (timestamp) {
    // Convert string date to Date object (otherwise assume timestamp is a date)
    //if (typeof(timestamp) == 'string') {
    //    timestamp = new Date(timestamp);
    //}
    // console.log("type", typeof (timestamp))
    // Convert date object to hex seconds since Unix epoch
    var hexSeconds = Math.floor(timestamp).toString(16);
    //console.log(hexSeconds)
    // Create an ObjectId with that hex timestamp
    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    return constructedObjectId;
}
exports.StartDateStamp = function (timestamp) {
    var timeObj = {};
    var date = new Date(timestamp * 1000);
    // console.log(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var dateStamp = Date.parse(year + "-" + month + "-" + day + " 00:00:00");
    return dateStamp / 1000;
};

exports.EndDateStamp = function (timestamp) {
    var timeObj = {};
    var date = new Date(timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var dateStamp = Date.parse(year + "-" + month + "-" + day + " 23:59:59");
    return dateStamp / 1000;
};
exports.getDateStamp = function () {
    var timeObj = {};
    var date = new Date();
    // console.log(date)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var dateStamp = Date.parse(year + "-" + month + "-" + day + " 00:00:00");
    return dateStamp / 1000;
};
exports.EveryDayDateStamp = function (day, param) {
    var timeObj = {};
    var date = new Date();
    date.setDate(date.getDate() - day);
    // console.log("date", date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    var dateStamp = Date.parse(year + "-" + month + "-" + day + param);
    // console.log(dateStamp);
    return dateStamp / 1000;

};
exports.date = function (timestamp) {
    var a = new Date(timestamp * 1000);
    var date = a.getDate();
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var dateStamp = date + "-" + month + "-" + year;
    return dateStamp;
};

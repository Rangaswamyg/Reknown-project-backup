var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
/* GET home page. */
var async = require('async');
var commons = require("../commons/commons.js");
const User = require('../models/user');
const user_details = require('./users');
const jwt = require('jsonwebtoken');
const config = require('../config/passportsecret');
var bcrypt = require('bcrypt-nodejs');
commons.get_mogno_connection(commons.url_mode, commons.db_mode, function (err, db_conn) {

    router.get('/', function (req, res, next) {
        // console.log("::::::::::::::::::::::::::::::::");

        res.render('index', {title: 'Express'});
        _m
    });

    var multer = require('multer');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })
    var upload = multer({storage: storage});


    router.post('/test/upload', upload.single('filesUploded'), (req, res, next) => {
        const file = req.file
        console.log("fileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", file);
        if (!file) {
            const error = new Error('Please upload a file')
            //error.httpStatusCode = 400
            return next(error)
        }
        res.send(file)

    })
    router.post('/test/download', function (req, res, next) {
        var filepath = path.join(__dirname, '../uploads') + '/' + req.body.filename;
        res.sendFile(filepath);
    });
    router.get('/test/program_levels', function (req, res, next) {
        db_conn.collection("courseMaster").distinct("level", {}, (function (err, result) {
            if (err) throw err;
            else {
                var arr = [];
                for (var item of result) {
                    arr.push({level: item});
                    // console.log(item);
                }
                res.send(arr);
            }
        }));


    });

    router.get('/test/country_names', function (req, res, next) {
        db_conn.collection("countryMaster").aggregate([
            // De-normalize the array content to separate documents
            {"$unwind": "$name"},

            // Filter the de-normalized content to remove non-matches
            // { "$match": { "name": {$regex:"$name",$options:`i`} } },

            // Group the "like" terms as the "key"
            {
                "$group": {
                    "_id": {name: "$name", id: "$id"}
                }
            }
        ]).toArray(function (err, result) {
            if (err) throw err;

            else {

                res.send(result);
            }
        });


    });

    router.get('/test/country_list_data', function (req, res, next) {


        var all_country_data = [];
        db_conn.collection("countryMaster").find({}).toArray(function (err, all_c) {
            if (err) console.log(err);
            else {
                async.each(all_c, function (item, callback_all_c) {
                    async.parallel({
                        universities_count: function (callback) {
                            db_conn.collection('linksMaster').aggregate([{$match: {country_id: item.id}}, {$group: {_id: "$university_id"}}]).toArray(function (err, result1) {
                                if (err) console.log(err)
                                else {
                                    callback(null, result1.length)
                                }

                            });
                        },
                        courses_count: function (callback) {
                            db_conn.collection('linksMaster').aggregate([{$match: {country_id: item.id}}, {$group: {_id: "$course_id"}}]).toArray(function (err, result2) {
                                if (err) console.log(err)
                                else {
                                    callback(null, result2.length)

                                }
                            });

                        }
                    }, function (err, fin_result) {
                        if (err) console.log(err);
                        else {

                            if (!item.flag) item.flag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnYCjVRspYK81tgKRBZ4PTt08GUAJmOCufvjiTHuqJM3gYjV1NA";
                            all_country_data.push({
                                cid: item.id, name: item.name, uni_count: fin_result.universities_count,
                                co_count: fin_result.courses_count, students_count: 0, flag: item.flag
                            });
                            callback_all_c(null, fin_result);
                        }
                    });
                }, function (err, response2) {
                    if (err) console.log(err);
                    else {
                        // console.log(all_country_data);
                        res.send(all_country_data);

                    }
                });

            }
            ;
        });


    });

    router.get('/test/course_names', function (req, res, next) {


        db_conn.collection("courseMaster").aggregate([
            // De-normalize the array content to separate documents
            {"$unwind": "$name"},

            // Filter the de-normalized content to remove non-matches
            // { "$match": { "name": {$regex:"$name",$options:`i`} } },

            // Group the "like" terms as the "key"
            {
                "$group": {
                    "_id": {name: "$name", id: "$id"}
                }
            }
        ]).toArray(function (err, result) {
            if (!err) {
                // console.log(result);
                res.send(result);
            } else {
                console.log(err, "error");
            }
        });


    });

    router.get('/test/exams_list_with_scores', function (req, res, next) {

        db_conn.collection("examsMaster").findOne({}, function (err, result) {
            if (!err) {
                console.log(result, "::::::::::::::::")
                res.send(result);
            } else {
                console.log(err, "error");
            }
        });


    });

    router.get('/test/common_country_data', function (req, res, next) {

        db_conn.collection('country_commonData').find({}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });


    });

    router.get('/test/university_names', function (req, res, next) {
        db_conn.collection("universityMaster").aggregate([
            // De-normalize the array content to separate documents
            {"$unwind": "$name"},

            // Filter the de-normalized content to remove non-matches
            // { "$match": { "name": {$regex:"$name",$options:`i`} } },

            // Group the "like" terms as the "key"
            {
                "$group": {
                    "_id": {name: "$name", id: "$id"}
                }
            }
        ]).toArray(function (err, result) {
            if (!err) {
                // console.log(result);
                res.send(result);
            } else {
                console.log(err, "error");
            }
        });


    });
    router.get('/test/india_universities/', function (req, res, next) {
        /*  db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
              if (err) throw err; // Throw err if cannot connect
              else {
                  if (user_res) {


                  } else {
                      res.send("not authenticated user");
                  }

              }

          });*/
        db_conn.collection('india_universities_and_ranks').find({}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });

    });
    router.get('/test/course_specialization/', function (req, res, next) {

        db_conn.collection('course_specialization').find({}).limit(1000).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //  console.log(result,"Resulttttttttttttttttttttttttttttttttttttttttt");
                res.send(result);
            }
        });


    });
    router.get('/test/comparision_page_dropdown', function (req, res, next) {

        /* db_conn.collection("countryMaster").findOne({},function (err,result) {
           res.send(result);
         });*/
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    db_conn.collection('countryMaster').aggregate([{
                        $lookup: {
                            from: "locationMaster",
                            localField: "id",
                            foreignField: "country_id",
                            as: "records"
                        }
                    }

                        , {
                            "$project": {
                                "name": 1,
                                "id": 1,
                                "records": 1
                            }
                        }
                    ]).toArray(function (err, result) {
                        if (err) {
                            throw new Error(err);
                        } else {

                            var g_arr = [];
                            async.forEach(result, function (item, callback1) {
                                var in_rec = [];

                                async.forEach(item.records, function (item2, callback2) {

                                    db_conn.collection('linksMaster').find({
                                        "country_id": item2.country_id,
                                        "location_id": item2.id
                                    }, {university_id: 1}).toArray(function (err, result1) {
                                        if (err) console.log(err);
                                        else {
                                            if (result1.length) {
                                                var uni_arr = [];
                                                var uni_names_with_id = [];
                                                for (var i in result1) {

                                                    uni_arr.push(result1[i].university_id);

                                                    if (i == result1.length - 1) {
                                                        let x = (uni_arr) => uni_arr.filter((v, i) => uni_arr.indexOf(v) === i);

                                                        async.forEach(x(uni_arr), function (single_uni, callback4) {

                                                            db_conn.collection('universityMaster').findOne({"id": single_uni}, {name: 1}, function (err, result4) {
                                                                if (err) console.log(err);
                                                                else {
                                                                    uni_names_with_id.push({
                                                                        uni_id: single_uni,
                                                                        name: result4 ? result4.name : ""
                                                                    });
                                                                    callback4();
                                                                }
                                                            });

                                                        }, function (err, hm) {
                                                            if (err) console.log(err);
                                                            else {

                                                                in_rec.push({
                                                                    id: item2.id,
                                                                    name: item2.name,
                                                                    uni: uni_names_with_id
                                                                });

                                                                callback2();
                                                            }
                                                        });

                                                    }

                                                }
                                            } else {
                                                callback2();
                                            }


                                        }
                                    });
                                }, function (err, fin_res) {
                                    if (err) console.log(err);
                                    else {
                                        if (in_rec.length) g_arr.push({id: item.id, name: item.name, records: in_rec});
                                        callback1();
                                    }
                                });

                            }, function (err, fin_res) {
                                if (err) console.log(err);
                                else res.send(g_arr);
                            });

                        }
                    });

                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });
    router.get('/test/country_list_db/', function (req, res, next) {
        db_conn.collection('countryMaster').aggregate([
            {
                "$group": {
                    "_id": {
                        "id": "$id",
                        "name": "$name"
                    },
                }
            }, {$sort: {"_id.name": 1}}

        ]).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });


    });
    router.get('/test/profile_building_status', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {

                    db_conn.collection("user_profile_build").findOne({_id: user_res.email}, function (err, profile_exist_or_not) {
                        if (err) throw err;
                        else {
                            var res_obj = {complete: false, prob_info: false, profile_build: false};
                            var count = 0;
                            if (profile_exist_or_not) {
                                if (profile_exist_or_not.profile_info) {
                                    res_obj["profile_build"] = true;
                                    count++
                                }
                                if (profile_exist_or_not.prob_info) {
                                    res_obj["prob_info"] = true;
                                    count++
                                }
                                if (count == 2) res_obj["complete"] = true;
                                res.send(res_obj);


                            } else {
                                res.send(res_obj);
                            }


                        }
                    });

                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });
    router.get('/test/array/:nth_page/:country_id/:program_l/:pl_spec/:uni/:es', function (req, res, next) {


        var filter_c_id;
        var filter_c_name;
        var filter_pl;
        var filter_sp;
        var filter_uni;
        var filter_es = {};
        var min, max;

        // country filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        if (req.params.country_id != '0' && req.params.country_id.indexOf('id') >= 0) {
            filter_c_id = {country_id: parseInt(req.params.country_id.split('_')[0])};
            filter_c_name = {'records.country_name[0].name2': null};

        } else if (req.params.country_id != '0' && req.params.country_id.indexOf('name') >= 0) {
            filter_c_id = {test: null};
            filter_c_name = {'records.country_name.name': {$regex: req.params.country_id.split('_')[0], $options: 'i'}};
        } else {
            filter_c_id = {test: null};
            filter_c_name = {'records.country_name.name3': null};

        }
        // program filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        if (req.params.program_l != '0') {

            filter_pl = {"records.level": {$in: req.params.program_l.split(',')}};

        } else {

            filter_pl = {"records.level1": {$in: [null]}};
        }
        ;

        if (req.params.pl_spec != '0') {

            filter_sp = {"records.name": {$regex: req.params.pl_spec, $options: 'i'}}

        } else {

            filter_sp = {"records.name1": null};
        }
        ;
        if (req.params.es != '0') {


            var exam = "converted_" + req.params.es.split('_')[0];
            var k = (req.params.es.split('_')[1]).split('-');

            min = parseInt(k[0]), max = parseInt(k[1]);

            filter_es[exam] = {$gte: min, $lte: max};

        } else {
            filter_es["exam_dummy"] = null;
        }
        ;

        if (req.params.uni && req.params.uni != '0') {

            filter_uni = {"records.university_details.name": {$regex: req.params.uni, $options: 'i'}}

        } else {

            filter_uni = {"records.score3": null};
        }
        ;
        console.log("filterrrrrrrrrrrrrrrrr", req.params, filter_es);
        /*     res.send("ok");*/
        db_conn.collection("linksMaster").aggregate([
            // {$group:{_id:{id:"$id"}}},
            {$match: filter_c_id},
            {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records"
                }
            }, {$unwind: "$records"}, {$match: filter_pl}, {$match: filter_sp}, {
                $lookup: {
                    from: "universityMaster",
                    localField: "university_id",
                    foreignField: "id",
                    as: "records.university_details",
                },
            }, {$match: filter_uni}, {
                $lookup: {
                    from: "locationMaster",
                    localField: "location_id",
                    foreignField: "id",
                    as: "records.location_details",
                }
            }, {
                $lookup: {
                    from: "countryMaster",
                    localField: "country_id",
                    foreignField: "id",
                    as: "records.country_name",
                }
            }, {$match: filter_c_name}, {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records.courseDetails",
                }
            },// {
            //     $addFields: {
            //         converted_tofel: {$convert: {input: "$toefl", to: "int", onError: 0, onNull: 0}},
            //         converted_ielts: {$convert: {input: "$ielts", to: "int", onError: 0, onNull: 0}},
            //         converted_pte: {$convert: {input: "$pte", to: "int", onError: 0, onNull: 0}},
            //         converted_cae: {$convert: {input: "$cae", to: "int", onError: 0, onNull: 0}},
            //         converted_cael: {$convert: {input: "$cael", to: "int", onError: 0, onNull: 0}},
            //         converted_sat: {$convert: {input: "$sat", to: "int", onError: 0, onNull: 0}},
            //         converted_gre: {$convert: {input: "$gre", to: "int", onError: 0, onNull: 0}},
            //         converted_gmat: {$convert: {input: "$gmat", to: "int", onError: 0, onNull: 0}},
            //         converted_melab: {$convert: {input: "$melab", to: "int", onError: 0, onNull: 0}},
            //         converted_gpa: {$convert: {input: "$gpa", to: "int", onError: 0, onNull: 0}}
            //     }
            // }, {$match: filter_es}


        ]).skip(parseInt(req.params.nth_page) * 10 - 10).limit(10).toArray(function (err, result) {
            if (err) {
                throw new Error(err);
            } else {
                if (res) {

                    console.log(result.length, "lengthhhhhhhhhhhhhhhhhhhhhhhhhhh");
                    res.send(result);
                } else {
                    res.send(null);
                }
            }
        });

    });

    router.post('/test/resetPassword/:email', function (req, res, next) {
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            if (err) return next(err);
            else {
                db_conn.collection('users').updateOne({
                    "email": req.params.email
                }, {$set: {password: hash}}, function (err, result) {
                    if (err) {
                        res.send({success: false, message: "please try after some time"});
                    } else {
                        if (result) {
                            res.send({success: true, message: "successfully updated"});
                        } else {
                            res.send({success: false, message: "please try after some time"});
                        }
                    }
                });

            }
        });


    });

    router.post('/test/forgotPassword', function (req, res, next) {
        db_conn.collection('users').findOne({
            "email": req.body.email
        }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (!result) {
                    res.send({res: "You are not authenticated user"});
                } else {
                    commons.send_mail(req.body.email, function (err, result) {
                        if (err) res.send({res: "try after some time"});
                        else res.send({res: "link sent to  your email"});
                    });

                }

            }
        });


    });


    router.get('/test/array/:nth_page/:country_id/:program_l/:pl_spec/:uni/:es/count', function (req, res, next) {
        var filter_c_id;
        var filter_c_name;
        var filter_pl;
        var filter_sp;
        var filter_uni;
        var filter_es = {};

        // country filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        if (req.params.country_id != '0' && req.params.country_id.indexOf('id') >= 0) {
            filter_c_id = {country_id: parseInt(req.params.country_id.split('_')[0])};
            filter_c_name = {'records.country_name[0].name2': null};

        } else if (req.params.country_id != '0' && req.params.country_id.indexOf('name') >= 0) {
            filter_c_id = {test: null};
            filter_c_name = {'records.country_name.name': {$regex: req.params.country_id.split('_')[0], $options: 'i'}};
        } else {
            filter_c_id = {test: null};
            filter_c_name = {'records.country_name.name3': null};

        }
        // console.log("--------------------------------------", filter_c_id, req.params.country_id.split('_')[0]);
        // program filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
        if (req.params.program_l != '0') {

            filter_pl = {"records.level": {$in: req.params.program_l.split(',')}};

        } else {

            filter_pl = {"records.level1": {$in: [null]}};
        }
        ;

        if (req.params.pl_spec != '0') {

            filter_sp = {"records.name": {$regex: req.params.pl_spec, $options: 'i'}}

        } else {

            filter_sp = {"records.name1": null};
        }
        ;
        if (req.params.es != '0') {


            var exam = "converted_" + req.params.es.split('_')[0];
            var k = (req.params.es.split('_')[1]).split('-');

            var min = parseInt(k[0]), max = parseInt(k[1]);

            filter_es[exam] = {$gte: min, $lte: max};

        } else {
            filter_es["exam"] = null;
        }
        ;
        if (req.params.uni && req.params.uni != '0') {

            filter_uni = {"records.university_details.name": {$regex: req.params.uni, $options: 'i'}}

        } else {

            filter_uni = {"records.score3": null};
        }
        ;

        db_conn.collection("linksMaster").aggregate([
            // {$group:{_id:{id:"$id"}}},
            {$match: filter_c_id},
            {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records"
                }
            }, {$unwind: "$records"}, {$match: filter_pl}, {$match: filter_sp}, {
                $lookup: {
                    from: "universityMaster",
                    localField: "university_id",
                    foreignField: "id",
                    as: "records.university_details",
                },
            }, {$match: filter_uni}, {
                $lookup: {
                    from: "locationMaster",
                    localField: "location_id",
                    foreignField: "id",
                    as: "records.location_details",
                }
            }, {
                $lookup: {
                    from: "countryMaster",
                    localField: "country_id",
                    foreignField: "id",
                    as: "records.country_name",
                }
            }, {$match: filter_c_name}, {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records.courseDetails",
                }
            },
            {
                $addFields: {
                    converted_tofel: {$convert: {input: "$toefl", to: "int", onError: 0, onNull: 0}},
                    converted_ielts: {$convert: {input: "$ielts", to: "int", onError: 0, onNull: 0}},
                    converted_pte: {$convert: {input: "$pte", to: "int", onError: 0, onNull: 0}},
                    converted_cae: {$convert: {input: "$cae", to: "int", onError: 0, onNull: 0}},
                    converted_cael: {$convert: {input: "$cael", to: "int", onError: 0, onNull: 0}},
                    converted_sat: {$convert: {input: "$sat", to: "int", onError: 0, onNull: 0}},
                    converted_gre: {$convert: {input: "$gre", to: "int", onError: 0, onNull: 0}},
                    converted_gmat: {$convert: {input: "$gmat", to: "int", onError: 0, onNull: 0}},
                    converted_melab: {$convert: {input: "$melab", to: "int", onError: 0, onNull: 0}},
                    converted_gpa: {$convert: {input: "$gpa", to: "int", onError: 0, onNull: 0}}
                }
            }, {$match: filter_es}, {$count: 'count'}


        ]).toArray(function (err, result) {
            if (err) {
                throw new Error(err);
            } else {
                if (res) {

                    console.log(result, "count");
                    res.send(result);
                } else {
                    res.send(null);
                }
            }
        });


    });

    router.get('/test/top_universities/:cid', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    var all_universities = [];
                    var all_country_data = [];
                    db_conn.collection("countryMaster").find({"id": parseInt(req.params.cid)}).toArray(function (err, all_c) {
                        if (err) console.log(err);
                        else {
                            async.parallel({
                                first: function (callback) {
                                    async.each(all_c, function (item, callback_all_c) {
                                        async.parallel({
                                            universities_count: function (callback) {
                                                db_conn.collection('linksMaster').aggregate([{$match: {country_id: item.id}}, {$group: {_id: "$university_id"}}]).toArray(function (err, result1) {
                                                    if (err) console.log(err)
                                                    else {
                                                        callback(null, result1.length)
                                                    }

                                                });
                                            },
                                            courses_count: function (callback) {
                                                db_conn.collection('linksMaster').aggregate([{$match: {country_id: item.id}}, {$group: {_id: "$course_id"}}]).toArray(function (err, result2) {
                                                    if (err) console.log(err)
                                                    else {
                                                        callback(null, result2.length)

                                                    }
                                                });

                                            }
                                        }, function (err, fin_result) {
                                            if (err) console.log(err);
                                            else {

                                                if (!item.flag) item.flag = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwnYCjVRspYK81tgKRBZ4PTt08GUAJmOCufvjiTHuqJM3gYjV1NA";
                                                all_country_data.push({
                                                    cid: item.id, uni_count: fin_result.universities_count,
                                                    co_count: fin_result.courses_count
                                                });
                                                callback_all_c(null, fin_result);
                                            }
                                        });
                                    }, function (err, response2) {
                                        if (err) console.log(err);
                                        else {
                                            // console.log(all_country_data);
                                            callback(null, all_country_data);
                                        }
                                    });
                                }, second: function (callback) {
                                    db_conn.collection('countryMaster').findOne({"id": parseInt(req.params.cid)}, function (err, response) {
                                        if (err) console.log(err);
                                        else {
                                            db_conn.collection('linksMaster').aggregate([{$match: {country_id: parseInt(req.params.cid)}}, {$group: {_id: "$university_id"}}
                                                , {
                                                    $lookup: {
                                                        from: "universityMaster",
                                                        localField: "_id",
                                                        foreignField: "id",
                                                        as: "records"
                                                    }
                                                },
                                                {$project: {"records.name": 1, "records.country_rank": 1}}
                                            ]).toArray(function (err, result) {

                                                // var rem_country_rank_null=[];

                                                for (var i in result) {

                                                    all_universities.push({
                                                        name: result[i].records[0] ? result[i].records[0].name : "",
                                                        c_r: result[i].records[0] ? result[i].records[0].country_rank : ""
                                                    });
                                                    //  if(result[i].records[0].country_rank!='') rem_country_rank_null.push({name:result[i].records[0].name,c_r:result[i].records[0].country_rank});
                                                    if (i == result.length - 1) {


                                                        callback(null, {
                                                            c_info: response,
                                                            all_universities: all_universities.sort(function (obj1, obj2) {
                                                                return obj1.c_r - obj2.c_r;
                                                            })
                                                        });

                                                    }
                                                }


                                            });
                                        }
                                    });

                                }
                            }, function (err, final_country_page_data) {
                                if (err) console.log(err);
                                else res.send(final_country_page_data);
                            });


                        }
                        ;
                    });

                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });

    router.get('/test/program_page/:id', function (req, res, next) {


        db_conn.collection("courseMaster").aggregate([{$match: {id: parseInt(req.params.id)}},
            {$lookup: {from: "linksMaster", localField: "id", foreignField: "course_id", as: "records"}}
            , {$unwind: "$records"}, {
                $lookup: {
                    from: "universityMaster",
                    localField: "records.university_id",
                    foreignField: "id",
                    as: "records.university_details",
                }
            }, {
                $lookup: {
                    from: "locationMaster",
                    localField: "records.location_id",
                    foreignField: "id",
                    as: "records.location_details",
                }
            }, {
                $lookup: {
                    from: "countryMaster",
                    localField: "records.country_id",
                    foreignField: "id",
                    as: "records.country_name",
                }
            }, {
                $lookup: {
                    from: "courseMaster",
                    localField: "records.course_id",
                    foreignField: "id",
                    as: "records.courseDetails",
                }
            }, {
                "$project": {
                    "records.location_details.name": 1,
                    "records.university_details": 1,
                    "records.country_name.name": 1,
                    "records.courseDetails.name": 1,
                    "records.courseDetails.level": 1
                }
            }
        ]).toArray(function (err, result) {
            if (err) {
                throw new Error(err);
            } else {
                if (res) {

                    //  console.log(result,"ressssssssssssssssssssssssssss");
                    res.send({results: result});
                } else {
                    res.send({results: null});
                }
            }
        });
    });
    /*
    router.get('/test/university_page/:id',function (req,res,next) {

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("LIVEDATA_MASTERS");
        /!* db_conn.collection("countryMaster").findOne({},function (err,result) {
           res.send(result);
         });*!/
        db_conn.collection('universityMaster').aggregate([{$match:{id:"77"}},
          {$lookup:{from: "linksMaster",localField: "id",foreignField: "university_id",as: "records"}}
          ,{$unwind: "$records"},{
            $lookup: {
              from: "universityMaster",
              localField: "records.university_id",
              foreignField: "id",
              as: "records.university_details",
            }},{
            $lookup: {
              from: "locationMaster",
              localField: "records.location_id",
              foreignField: "id",
              as: "records.location_details",
            }
          },{
            $lookup: {
              from: "countryMaster",
              localField: "records.country_id",
              foreignField: "id",
              as: "records.country_name",
            }
          },{
            $lookup: {
              from: "courseMaster",
              localField: "records.course_id",
              foreignField: "id",
              as: "records.courseDetails",
            }
          },{
            "$project": {
              "records.location_details.name": 1,
              "records.university_details":1,
              "records.country_name.name":1,
              "records.courseDetails.name":1,
              "records.courseDetails.level":1
            }
          }
        ]).toArray(function (err,result) {
          if(err){
            throw new Error(err);
          }else{
            if(res){

              console.log(result,"ressssssssssssssssssssssssssss");
              res.send(result);
            }else{
              res.send(null);
            }
          }
        });
      });


    });
    */

    router.get('/test/country_page/:id', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    db_conn.collection('countryMaster').aggregate([{$match: {id: parseInt(req.params.id)}},
                        {$lookup: {from: "linksMaster", localField: "id", foreignField: "country_id", as: "records"}}
                        , {$unwind: "$records"}, {
                            $lookup: {
                                from: "universityMaster",
                                localField: "records.university_id",
                                foreignField: "id",
                                as: "records.university_details",
                            }
                        }, {
                            $lookup: {
                                from: "locationMaster",
                                localField: "records.location_id",
                                foreignField: "id",
                                as: "records.location_details",
                            }
                        }, {
                            $lookup: {
                                from: "countryMaster",
                                localField: "records.country_id",
                                foreignField: "id",
                                as: "records.country_name",
                            }
                        }, {
                            $lookup: {
                                from: "courseMaster",
                                localField: "records.course_id",
                                foreignField: "id",
                                as: "records.courseDetails",
                            }
                        }, {
                            "$project": {
                                "records.location_details.name": 1,
                                "records.university_details": 1,
                                "records.country_name.name": 1,
                                "records.courseDetails.name": 1,
                                "records.courseDetails.level": 1
                            }
                        }
                    ]).toArray(function (err, result) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            if (result) {
                                var new_array = [];
                                //   console.log(result[0],req.params);
                                async.forEach(result[0].records, function (item, callback) {
                                    // console.log(item,"itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
                                    db_conn.collection('courseMaster').findOne({id: parseInt(item.course_id)}, function (err, result2) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            //   console.log(item.country_id)
                                            db_conn.collection('countryMaster').findOne({id: item.country_id}, function (err, result3) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    if (result3 && result3.name) item["country_name"] = result3["name"]
                                                    else
                                                        item["country_name"] = "not their";
                                                    if (result2 && result2.name) item["course_name"] = result2["name"]
                                                    else
                                                        item["course_name"] = "not their";
                                                    if (result2 && result2.level) item["course_level"] = result2["level"]
                                                    else
                                                        item["course_level"] = "not their";
                                                    new_array.push(item);
                                                    //console.log(result2,"......................");
                                                    callback();

                                                }
                                            })

                                        }
                                    })


                                }, function (err, res_fin) {
                                    if (err) console.log(err);
                                    else {
                                        result.records = new_array;
                                        // console.log(new_array,"...........",result);

                                        res.send({result: result, newarr: new_array});
                                    }
                                });

                            } else {
                                res.send(null);
                            }
                        }
                    });

                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });

    router.get('/test/comparision_page_uni_dropdown/:cid/:lid', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    var arr = [];
                    var dup_arr = [];
                    db_conn.collection('linksMaster').find({
                        "country_id": req.params.cid,
                        "location_id": req.params.lid
                    }, {university_id: 1}).toArray(function (err, result) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            async.forEach(result, function (item, callback) {
                                db_conn.collection('universityMaster').findOne({id: item.university_id}, function (err, result2) {
                                    if (err) {
                                        throw new Error(err);
                                    } else {


                                        if (dup_arr.length == 0 || dup_arr.indexOf(item.university_id) < 0) {
                                            dup_arr.push(item.university_id);
                                            arr.push({id: item.university_id, name: result2.name})
                                        }

                                        callback(null);
                                    }
                                });
                            }, function (err, result2) {
                                if (err) console.log(err)
                                else
                                    res.send(arr);
                            })
                        }
                    });

                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });


    router.get('/test/comparision_page_add_uni/:uid/:lid/:cid', function (req, res, next) {
        var uni_arr, loc_arr, con_arr;
        if (req.params.uid.indexOf('-') >= 0) {

            uni_arr = req.params.uid.split('-');
            loc_arr = req.params.uid.split('-');
            con_arr = req.params.uid.split('-');
        } else {
            uni_arr = [], loc_arr = [], con_arr = [];
            uni_arr.push(req.params.uid);
            loc_arr.push(req.params.lid);
            con_arr.push(req.params.cid);
        }
        var uni_details = [];
        var indexes = [];
        if (uni_arr.length == 1) indexes = [0];
        else if (uni_arr.length == 2) indexes = [0, 1];
        else if (uni_arr.length == 3) indexes = [0, 1, 2];
        async.forEach(indexes, function (doc, callback_uni) {
            /*  db_conn.collection('users').findOne({ token: req.headers.authorization }, function (err, user_res) {
                  if (err) throw err; // Throw err if cannot connect
                  else {
                      if(user_res){*/

            async.parallel({
                university_details: function (callback) {
                    db_conn.collection('universityMaster').find({id: parseInt(uni_arr[doc])}).toArray(function (err, result1) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            callback(null, result1);

                        }
                    });

                },
                country_name: function (callback) {
                    db_conn.collection('countryMaster').find({id: parseInt(loc_arr[doc])}).toArray(function (err, result21) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            if (result21[0])
                                callback(null, result21[0].name);
                            else
                                callback(null, "not their")
                        }
                    });

                },
                location_name: function (callback) {
                    db_conn.collection('locationMaster').find({id: parseInt(con_arr[doc])}).toArray(function (err, result3) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            if (result3[0])
                                callback(null, result3[0].name);
                            else
                                callback(null, "not their")
                        }
                    });

                }
            }, function (err, results) {

                if (results.university_details[0]) {
                    results.university_details[0].loc_name = results.location_name;
                    results.university_details[0].con_name = results.country_name;
                }
                uni_details.push(results.university_details[0]);
                callback_uni();
            });


        }, function (err, fin_result) {
            if (err) console.log(err);
            else {
                res.send(uni_details);
            }
        });


    });
//induece94@gmail.com ,Indumathi@14
    router.get('/test/otp_generation/:number', function (req, res, next) {
        var http = require('http');

        function generateOTP() {

            var digits = '0123456789';
            let OTP = '';
            for (let i = 0; i < 6; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        }

        var msg = generateOTP();

        db_conn.collection('users_otp').update({_id: req.params.number}, {
            _id: req.params.number,
            req_time: +new Date(),
            otp: msg
        }, {upsert: true}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var toNumber = '+918500071153';
                var username = 'shruthichinuku@gmail.com';
                var hash = 'textLocal@123';
                var sender = 'txtlcl';
                var data = 'username=' + username + '&hash=' + hash + '&sender=' + sender + '&numbers=' + toNumber + '&message=' + msg;
                var options = {
                    host: 'api.textlocal.in', path: '/send?' + data
                };
                callback = function (response) {
                    var str = '';
                    response.on('data', function (chunk) {
                        str += chunk;
                    });
                    response.on('end', function () {
                        res.send(str);
                    });
                };
                http.request(options, callback).end();
            }
        });


    });
    router.get('/test/otp_verification/:number/:otp', function (req, res, next) {
        db_conn.collection('users_otp').findOne({_id: req.params.number}, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (res) {
                    if ((+new Date() - parseInt(result.req_time)) <= 800000000) {
                        if (req.params.otp == result.otp) res.send("verified");
                        else res.send("invalid otp");

                    } else {
                        res.send("otp expired");
                    }
                } else {
                    console.log("no record");
                }

            }
        })


    });
    router.post('/test/reg_data/', function (req, res, next) {
        var jwt = require('jsonwebtoken');
        /* bcrypt.hash(req.body.password,10,function (err,hash) {
           if(err){
             console.log(err);
           }else{
             console.log(hash);
           }
         })*/
        const token = jwt.sign({email: "", userId: 1}, "shhhhhhhhh", {expiresIn: "1h"})
        if (!req.body.resend_otp) {
            db_conn.collection('registration_data').insert({
                "_id": req.body.email,
                "info": req.body
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({otp: "already email existed", "token": token});
                } else {
                    res.send({otp: 123456, "token": token});
                }
            });
        } else {
            res.send({otp: 123456, "token": token});
        }


    });
    router.post('/test/login_input/', function (req, res, next) {

        db_conn.collection('registration_data').findOne({
            "_id": req.body.email,
            "info.password": req.body.password
        }, function (err, result) {
            if (err) {
                console.log(err);
            } else {

                //  console.log(result, "resssssssssssssssssssssssssssssssss");
                if (result)
                    res.send({res: "valid"});
                else
                    res.send({res: "invalid"});
            }
        });


    });


    router.get('/test/specialization/:cid/:pl', function (req, res, next) {
        /* db_conn.collection('users').findOne({ token: req.headers.authorization }, function (err, user_res) {
             if (err) throw err; // Throw err if cannot connect
             else {
                 if(user_res){
                     ;


                 }else{
                     res.send("not authenticated user");
                 }

             }

         })*/

        db_conn.collection('linksMaster').aggregate([
            {$match: {"country_id": parseInt(req.params.cid)}},
            {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records"
                }
            },
            {$match: {"records.level": req.params.pl}},
            {$sort: {"university.name": 1}},

            {
                $project: {
                    "records.name": 1, "records.id": 1

                }
            }
        ]).limit(1000).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {//remove duplicatesssssssssssssssssssssssssssssssssssssss
                res.send(result);
            }
        });
    });
    router.get('/test/universities_cid_pl/:cid/:pl/:sp', function (req, res, next) {
        /*   db_conn.collection('users').findOne({ token: req.headers.authorization }, function (err, user_res) {
               if (err) throw err; // Throw err if cannot connect
               else {
                   if(user_res){

                   }else{
                       res.send("not authenticated user");
                   }

               }

           });*/

        db_conn.collection('linksMaster').aggregate([
            {$match: {"country_id": parseInt(req.params.cid)}},
            {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id", foreignField: "id", as: "records"
                }
            },
            {$match: {"records.level": req.params.pl, "records.name": req.params.sp}},
            {
                $lookup: {
                    from: "universityMaster",
                    localField: "university_id", foreignField: "id",
                    as: "university"
                }
            },
            {$sort: {"university.name": 1}},
            {
                $project: {
                    "university.name": 1,
                    "university.id": 1
                }
            }
        ]).limit(1000).toArray(function (err, result) {
            if (err) console.log(err);
            else {//duplicatesssssssssssssssssssssssssssssssssssssssss
                res.send(result);
            }
        });


    });

    router.get('/test/shortlisting_user_details', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    db_conn.collection("user_profile_build").findOne({_id: user_res.email}, function (err, result) {
                        if (err) console.log(err);
                        else {
                            var probability_info = {};
                            for (var i in result.profile_info) {
                                probability_info[Object.keys(result.profile_info[i])[0]] = Object.values(result.profile_info[i])[0];
                            }
                            res.send({
                                current_education: probability_info.current_education_details,
                                future_education: probability_info.future_education
                            });
                        }

                    });
                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });

    router.post('/test/prob_percentage/:uid/:cid', function (req, res, next) {
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    db_conn.collection("user_profile_build").findOne({_id:user_res.email},function(err,response_st){
                        if(err)console.log(err);
                        else{
                            if(response_st.prob_info){
                                update_prob({'prob_info.future_education': req.body[0].future_education});
                            }else{
                                update_prob({prob_info: req.body});
                            }
                        }
                    });
                    function update_prob() {
                        db_conn.collection("user_profile_build").updateOne({_id: user_res.email}, {$set: {prob_info: req.body}}, function (err, prob_scores) {
                            if (err) throw err;
                            else {
                                db_conn.collection("universityMaster").findOne({
                                        id: parseInt(req.params.uid)
                                    }, function (err, result_uni) {
                                        if (err) console.log(err);
                                        else {
                                            db_conn.collection("countryMaster").findOne({
                                                    id: parseInt(req.params.cid)
                                                }, function (err, result_country) {
                                                    if (err) console.log(err);
                                                    else {
                                                        calculate_prob(function (err, resss) {

                                                            if (err) console.log(err);
                                                            else {
                                                                console.log(resss, result_uni.country_rank);
                                                            }
                                                            if (Object.keys(resss).keys().length && parseInt(result_uni.country_rank <= resss.max_rank)) {
                                                                res.send({
                                                                    eligible: "Yes",
                                                                    eligible_cards: resss.eligible_cards,
                                                                    uni_details: result_uni,
                                                                    coun_details: result_country
                                                                });
                                                            } else {
                                                                res.send({
                                                                    eligible: "No",
                                                                    eligible_cards: resss.eligible_cards,
                                                                    uni_details: result_uni,
                                                                    coun_details: result_country
                                                                });
                                                            }

                                                            // res.send(res_after_checking);

                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );

                                function calculate_prob(prob_cal_complted) {
                                    db_conn.collection("user_profile_build").findOne({_id: user_res.email}, function (err, prob_input) {
                                        if (err) throw err;
                                        else {
                                            var probability_info = {}, prob_info = {};

                                            async.each(prob_input.profile_info, function (i, cal1) {
                                                // console.log(i);
                                                probability_info[Object.keys(i)[0]] = Object.values(i)[0];
                                                cal1();
                                            }, function (err, f_cal1) {
                                                if (err) console.log(err);
                                                else {

                                                    async.each(prob_input.prob_info, function (j, cal2) {
                                                        prob_info[Object.keys(j)[0]] = Object.values(j)[0];
                                                        cal2();
                                                    }, function (err, f_cal2) {
                                                        if (err) console.log(err);
                                                        else {
                                                            //  console.log(prob_info,"sentttttttttttttttttttttttttttttttttttttttt");
                                                            process();
                                                            // res.send({re:"ok"})
                                                        }
                                                    });
                                                }
                                            });

                                            function process() {
                                                //  console.log(probability_info);
                                                if (probability_info.current_education_details) {
                                                    db_conn.collection("probability_scores").findOne({_id: probability_info.current_education_details.level}, function (err, prob_scores) {
                                                        if (err) throw err;
                                                        else {
                                                            if (prob_scores) {
                                                                db_conn.collection("cards_by_ranks").find({}).toArray(function (err, card_ranks) {
                                                                    if (err) throw err;
                                                                    else {

                                                                        check(prob_scores, card_ranks, function (err, res_after_checking) {
                                                                            if (err) console.log(err);
                                                                            else {

                                                                                prob_cal_complted(null, res_after_checking);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                res.send({res: "no scores"})
                                                            }

                                                        }
                                                    });
                                                } else {
                                                    res.send({res: "Please select level........."})
                                                }
                                            }


                                            function check(g_scores, rank, fin_callback_for_uni) {
                                                var eligible_cards_with_scores = [], overall_eligibility_score = 0;
                                                //   async.forEach(["ti", "pl", "di", "go", "si", "co", "br"], function (item, callback) {
                                                async.forEach(["si"], function (item, callback) {

                                                    async.parallel({
                                                        current_education_pro: function (callback) {
                                                            var count_cep = 0, prob_f = 0;
                                                            async.series([
                                                                function (callback) {
                                                                    if (probability_info.current_education_details.level) {
                                                                        var prob = ((parseInt(probability_info.current_education_details.grade) + parseInt(probability_info.current_education_details.academic_score)) / probability_info.current_education_details.academic_score) / 10;
                                                                        if (prob >= g_scores["Bachelors"][item]) {
                                                                            count_cep++;
                                                                            prob_f += prob;
                                                                        }
                                                                        overall_eligibility_score += prob;


                                                                    }
                                                                    callback(null, {count: count_cep, "prob": prob_f});
                                                                }, function (callback) {
                                                                    if (!(probability_info.current_education_details.backlogs)) {

                                                                        prob_f += g_scores["Backlogs"]["ti"];
                                                                        count_cep++;
                                                                        overall_eligibility_score += g_scores["Backlogs"]["ti"];

                                                                    } else {
                                                                        var l_o = (g_scores["Backlogs"]["ti"] - (parseInt(probability_info.current_education_details.backlogs) * g_scores["Backlogs"]["min"]));
                                                                        if (l_o >= g_scores["Backlogs"][item]) {
                                                                            prob_f += g_scores["Backlogs"][item];
                                                                            count_cep++;
                                                                        }
                                                                        overall_eligibility_score += l_o;

                                                                    }


                                                                    callback(null, {count: count_cep, "prob": prob_f});
                                                                }, function (callback) {
                                                                    if (probability_info.current_education_details.university) {


                                                                        db_conn.collection("india_universities_and_ranks").findOne({name: probability_info.current_education_details.university}, {country_rank: 1}, (function (err, result) {
                                                                            if (err) throw err;
                                                                            else {
                                                                                if (result) {
                                                                                    var l_rank = rank[0].uni_by_card[item];
                                                                                    var arr = l_rank.split('-');
                                                                                    var min = arr[0], max = arr[1];
                                                                                    min = ((rank[0].highest_scores_country_wise["india"] * min) / 100);
                                                                                    max = ((rank[0].highest_scores_country_wise["india"] * max) / 100);

                                                                                    if ((result.country_rank >= min && (result.country_rank <= max) || (parseInt(result.country_rank) <= max))) {
                                                                                        count_cep++;
                                                                                        var s = g_scores["card_status"][item];
                                                                                        prob_f += parseInt(g_scores["uni_Rep"][s]);
                                                                                        overall_eligibility_score += parseInt(g_scores["uni_Rep"][s]);


                                                                                    }
                                                                                }

                                                                                callback(null, {
                                                                                    count: count_cep,
                                                                                    "prob": prob_f
                                                                                });
                                                                            }
                                                                        }));


                                                                    } else {

                                                                        callback(null, {count: count_cep, "prob": prob_f});
                                                                    }
                                                                }

                                                            ], function (error, results) {
                                                                var l_result;
                                                                //    console.log(results,"::::::::::::::::::::::::::::::::::::::::::::::::::::::::",g_scores["Bachelors"][item])

                                                                if (results[2].count == 3) {
                                                                    l_result = {
                                                                        card: item,
                                                                        status: "eligible",
                                                                        prob: prob_f
                                                                    };
                                                                } else l_result = {
                                                                    card: item,
                                                                    status: "not eligible",
                                                                    prob: prob_f
                                                                };
                                                                //  console.log(l_result);
                                                                callback(null, l_result);

                                                            });


                                                        },
                                                        high_school_prob: function (callback) {

                                                            var count_hsp = 0, prob_s = 0;
                                                            async.series([function (callback) {
                                                                if (probability_info.high_school && probability_info.high_school.tenth) {

                                                                    var pro = (((parseInt(probability_info.high_school.tenth.grade) + parseInt(probability_info.high_school.tenth.score)) / parseInt(probability_info.high_school.tenth.grade)) / 10);
                                                                    if (pro >= g_scores['tenth'][item]) {
                                                                        count_hsp++;
                                                                        prob_s += pro;

                                                                    }
                                                                    overall_eligibility_score += pro;
                                                                    callback(null, {count: count_hsp, "prob": prob_s});


                                                                } else {
                                                                    callback(null, {count: count_hsp, "prob": prob_s});
                                                                }
                                                            }, function (callback) {
                                                                if (probability_info.high_school && probability_info.high_school.puc) {
                                                                    var pro = (((parseInt(probability_info.high_school.puc.grade) + parseInt(probability_info.high_school.puc.score)) / parseInt(probability_info.high_school.puc.grade)) / 10);


                                                                    if (pro >= g_scores['puc'][item]) {
                                                                        count_hsp++;
                                                                        prob_s += pro;


                                                                    }
                                                                    overall_eligibility_score += pro;

                                                                    callback(null, {count: count_hsp, "prob": prob_s});


                                                                } else {
                                                                    callback(null, {count: count_hsp, "prob": prob_s});
                                                                }
                                                            }], function (err, result2) {
                                                                if (err) console.log(err);
                                                                else {
                                                                    var l_result;

                                                                    if (count_hsp == 2) {
                                                                        l_result = {
                                                                            card: item,
                                                                            status: "eligible",
                                                                            prob: prob_s
                                                                        };
                                                                    } else l_result = {
                                                                        card: item,
                                                                        status: "not eligible",
                                                                        prob: prob_s
                                                                    };
                                                                    callback(null, l_result);
                                                                }

                                                            });


                                                        },
                                                        projects_and_info_prob: function (callback) {
                                                            var count_paip = 0, prob_t = 0;
                                                            console.log(prob_info)
                                                            if (prob_info.projects_and_info && prob_info.projects_and_info.conference) {
                                                                var p_c = 0;
                                                                for (var conf in prob_info.projects_and_info.conference) {
                                                                    if (prob_info.projects_and_info.conference[conf].event_status && prob_info.projects_and_info.conference[conf].event_status == "Presented this event") {
                                                                        p_c++;
                                                                    }
                                                                }


                                                                if ((p_c * g_scores["Presentations"]["each"]) >= g_scores["Presentations"][item]) {
                                                                    count_paip++;
                                                                    prob_t += (p_c * g_scores["Presentations"]["each"]);
                                                                }

                                                                overall_eligibility_score += (p_c * g_scores["Presentations"]["each"]);
                                                                console.log(overall_eligibility_score,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>1",count_paip)
                                                                if (((prob_info.projects_and_info.conference.length - p_c) * g_scores["Conferences"]["each"]) >= g_scores["Conferences"][item]) {
                                                                    count_paip++;
                                                                    prob_t += ((prob_info.projects_and_info.conference.length - p_c) * g_scores["Conferences"]["each"]);
                                                                }
                                                                overall_eligibility_score += ((prob_info.projects_and_info.conference.length - p_c) * g_scores["Conferences"]["each"]);
                                                                console.log(overall_eligibility_score,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>2",count_paip)

                                                            }
                                                            if (prob_info.projects_and_info && prob_info.projects_and_info.projects) {
                                                                if (((prob_info.projects_and_info.projects.length) * g_scores["projects"]["each"]) >= g_scores["projects"][item]) {
                                                                    count_paip++;
                                                                    prob_t += ((prob_info.projects_and_info.projects.length) * g_scores["projects"]["each"]);
                                                                }
                                                                overall_eligibility_score += ((prob_info.projects_and_info.projects.length) * g_scores["projects"]["each"]);
                                                            }
                                                            console.log(overall_eligibility_score,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>3",count_paip)

                                                            if (prob_info.projects_and_info && prob_info.projects_and_info.patents.patents_status == "Yes") {
                                                                if ((g_scores["Patents"]["each"] * parseInt(prob_info.projects_and_info.patents.succ)) >= g_scores["Patents"][item]) {

                                                                    count_paip++;
                                                                    prob_t += (g_scores["Patents"]["each"] * parseInt(prob_info.projects_and_info.patents.succ));

                                                                }
                                                                overall_eligibility_score += (g_scores["Patents"]["each"] * parseInt(prob_info.projects_and_info.patents.succ));
                                                            }
                                                            console.log(overall_eligibility_score,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",count_paip)

                                                            if (count_paip >= 3) {
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "eligible",
                                                                    prob: prob_t
                                                                })
                                                            } else {
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "not eligible",
                                                                    prob: prob_t
                                                                })

                                                            }
                                                            ;
                                                        },
                                                        internship_and_work: function (callback) {
                                                            var iw_c = 0, count_iaw = 0, prob_fo = 0;
                                                            var highest_working_year = 0;
                                                            for (var iw in probability_info.internship_and_work) {
                                                                if (probability_info.internship_and_work[iw]["exp"] && probability_info.internship_and_work[iw]["exp"].indexOf('y') >= 0) {
                                                                    var x = parseInt(probability_info.internship_and_work[iw]["exp"].split('y')[0]);
                                                                    if (x >= highest_working_year) {
                                                                        highest_working_year = x;
                                                                    }
                                                                }
                                                                if (probability_info.internship_and_work[iw].internstatus == "Yes") {
                                                                    iw_c++;
                                                                }
                                                            }
                                                            if (iw_c != 0) {

                                                                if ((g_scores["internship"]["each"] * iw_c) >= g_scores["internship"][item]) {
                                                                    count_iaw++;
                                                                    prob_fo += (g_scores["internship"]["each"] * iw_c);
                                                                }
                                                                overall_eligibility_score += (g_scores["internship"]["each"] * iw_c);

                                                            }
                                                            ;
                                                            if ((highest_working_year * g_scores["work_exp"]["each"]) >= g_scores["work_exp"][item]) {
                                                                count_iaw++;
                                                                prob_fo += (x * g_scores["work_exp"]["each"]);

                                                            }
                                                            overall_eligibility_score += (highest_working_year * g_scores["work_exp"]["each"]);

                                                            if (count_iaw == 2) {
                                                                //console.log({card:item,status:"eligible",prob:prob_fo})
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "eligible",
                                                                    prob: prob_fo
                                                                });
                                                            } else {
                                                                //  console.log({card:item,status:"not eligible",prob:prob_fo})
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "not eligible",
                                                                    prob: prob_fo
                                                                });

                                                            }

                                                        },
                                                        exam_scores_and_recommondation: function (callback) {
                                                            var d_c = 0;
                                                            var count_esar = 0, prob_fi = 0, count = 0, max_exam = "",
                                                                max_score = 0;
                                                            // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<",probability_info.exam_scores_and_recommondation.exam_score)
                                                            for (var es in probability_info.exam_scores_and_recommondation.exam_score) {
                                                                var temp_e = probability_info.exam_scores_and_recommondation.exam_score[es].exam;
                                                                //  console.log(temp_e,"exammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
                                                                if (temp_e) {
                                                                    var temp = (((parseInt(probability_info.exam_scores_and_recommondation.exam_score[es].o_score)
                                                                        + parseInt(probability_info.exam_scores_and_recommondation.exam_score[es].score))
                                                                        / parseInt(probability_info.exam_scores_and_recommondation.exam_score[es].score)) / 10);
                                                                    //   console.log(temp,g_scores[temp_e][item],max_score,max_exam);
                                                                    if (temp >= g_scores[temp_e][item] && (max_score < temp || max_score == 0)) {
                                                                        d_c++;
                                                                        max_score = temp;
                                                                        max_exam = temp_e;
                                                                    }


                                                                }
                                                                ;
                                                                if (probability_info.exam_scores_and_recommondation.exam_score.length - 1 == count) {
                                                                    if (d_c > 0) {
                                                                        count_esar++;
                                                                        prob_fi += max_score;
                                                                    }
                                                                    overall_eligibility_score += max_score;


                                                                }
                                                                count++;
                                                                // console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::",count_esar,prob_fi);


                                                            }
                                                            var count2 = 0;
                                                            for (var ref in probability_info.exam_scores_and_recommondation.referees) {
                                                                var prob;
                                                                if (probability_info.exam_scores_and_recommondation.referees[ref]['designation']) {

                                                                    if (g_scores["Recommendation"]["Exemplary"]) {
                                                                        prob = g_scores["Recommendation"]["Exemplary"];
                                                                    }
                                                                }
                                                                ;
                                                                if (probability_info.exam_scores_and_recommondation.referees.length - 1 == count2) {
                                                                    count_esar++;
                                                                    prob_fi += prob;
                                                                    overall_eligibility_score + prob;
                                                                }
                                                                count2++;
                                                            }
                                                            if (count_esar == 2) {
                                                                //console.log({card:item,status:"eligible",prob:max_score,exam:max_exam});
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "eligible",
                                                                    prob: max_score,
                                                                    exam: max_exam
                                                                });
                                                            } else {
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "not eligible",
                                                                    prob: max_score
                                                                });

                                                            }
                                                        },
                                                        extra_curr_activities: function (callback) {
                                                            var count_eca = 0, prob_se = 0;
                                                            //  console.log(prob_info);

                                                            var pro = probability_info.certificates.diplomacertification ? (probability_info.certificates.diplomacertification.length * g_scores["extra_skills"]["each"]) : 0;
                                                            pro += probability_info.certificates.othercertification ? (probability_info.certificates.othercertification.length * g_scores["extra_skills"]["each"]) : 0;
                                                            if (prob_info.extra_curr_activiteies && prob_info.extra_curr_activiteies.sports) {
                                                                if ((g_scores["sports"]["each"] * prob_info.extra_curr_activiteies.sports.length) >= g_scores["sports"][item]) {
                                                                    count_eca++;
                                                                    prob_se += pro;
                                                                }
                                                                overall_eligibility_score += (g_scores["sports"]["each"] * prob_info.extra_curr_activiteies.sports.length);
                                                            }
                                                            if (prob_info.extra_curr_activiteies && prob_info.extra_curr_activiteies.seminar) {
                                                                if ((g_scores["Seminars"]["each"] * prob_info.extra_curr_activiteies.seminar.length) >= g_scores["Seminars"][item]) {
                                                                    count_eca++;
                                                                    prob_se += pro;
                                                                }
                                                                overall_eligibility_score += (g_scores["Seminars"]["each"] * prob_info.extra_curr_activiteies.seminar.length);

                                                            }
                                                            if (pro >= g_scores["extra_skills"][item]) {
                                                                count_eca++;
                                                                prob_se += pro;
                                                            }
                                                            overall_eligibility_score += pro;

                                                            if (count_eca == 3) {
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "eligible",
                                                                    pro: prob_se
                                                                });
                                                            } else {
                                                                callback(null, {
                                                                    card: item,
                                                                    status: "not eligible",
                                                                    pro: prob_se
                                                                });
                                                            }


                                                        }
                                                    }, function (err, results) {
                                                        if (err) console.log(err);
                                                        else {
                                                            console.log(results, "RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");

                                                            if (results.current_education_pro.status == "eligible" &&
                                                                results.high_school_prob.status == "eligible" &&
                                                                results.projects_and_info_prob.status == "eligible" &&
                                                                results.internship_and_work.status == "eligible" &&
                                                                results.exam_scores_and_recommondation.status == "eligible" &&
                                                                results.extra_curr_activities.status == "eligible") {
                                                                eligible_cards_with_scores.push({
                                                                    card: results.current_education_pro.card,
                                                                    prob: results.current_education_pro.prob
                                                                });
                                                                callback(null, eligible_cards_with_scores);
                                                            } else {
                                                                callback(null, null);
                                                            }

                                                        }

                                                    })
                                                }, function (err, call_m) {
                                                    if (err) console.log(err);
                                                    else {
                                                        //  console.log(eligible_cards_with_scores);
                                                        if (Object.keys(eligible_cards_with_scores).length) {
                                                            // var highest_rank=rank[0]["highest_scores_country_wise"]['64'];
                                                            var rank_min = 100000, rank_max = 0;
                                                            for (var each_r in eligible_cards_with_scores) {
                                                                var arr = rank[0]["uni_by_card"][eligible_cards_with_scores[each_r].card].split('-');
                                                                if (arr[1] > rank_max) {
                                                                    rank_max = parseInt(arr[1]);
                                                                }
                                                                if (arr[0] < rank_min) {
                                                                    rank_min = parseInt(arr[0]);
                                                                }
                                                            }
                                                            fin_callback_for_uni(null, {
                                                                probability: overall_eligibility_score / 7,
                                                                eligible_cards: eligible_cards_with_scores,
                                                                min_rank: Math.floor(rank_min),
                                                                max_rank: Math.floor(rank_max),
                                                            })
                                                            /* db_conn.collection("universityMaster").find({
                                                                 country_rank: {
                                                                     $gt: Math.floor(rank_min),
                                                                     $lt: Math.floor(rank_max)
                                                                 }
                                                             }).toArray(function (err, result) {
                                                                 if (err) throw err;
                                                                 else {
                                                                    // console.log(result);
                                                                     fin_callback_for_uni(null, {
                                                                         probability: overall_eligibility_score / 7,
                                                                         eligible_cards: eligible_cards_with_scores,
                                                                         min_rank: Math.floor(rank_min),
                                                                         max_rank: Math.floor(rank_max),
                                                                         uni: result
                                                                     })
                                                                 }
                                                             });*/

                                                        } else {

                                                            fin_callback_for_uni(null, {});
                                                        }


                                                    }
                                                });

                                            }


                                        }
                                    });

                                }


                            }
                        });
                    }

                } else {
                    prob_cal_complted();
                    res.send("not authenticated user");
                }

            }

        });


    });
    router.post('/test/shortlisting_universities', function (req, res, next) {
        console.log(req.headers.authorization);
        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                if (user_res) {
                    req.body._id = user_res.email;
                    db_conn.collection("user_profile_build").insert(req.body, function (err, prob_scores) {
                        if (err) {
                            res.send("already inserted");
                        } else {
                            res.send("inserted");
                            /* if(req.body.profile_info){
                                 var future_education = req.body.profile_info[req.body.profile_info.length - 1];
                                 //     var current_education = req.body.profile_info[0];
                                 if(future_education &&future_education.future_education){
                                     db_conn.collection("linksMaster").aggregate([
                                         // {$group:{_id:{id:"$id"}}},
                                         {$match: {country_id: parseInt(future_education.future_education.cid)}},
                                         {
                                             $lookup: {
                                                 from: "courseMaster",
                                                 localField: "course_id",
                                                 foreignField: "id",
                                                 as: "records"
                                             }
                                         }, {$unwind: "$records"}, {
                                             $match: {
                                                 'records.level': future_education.future_education.pl,
                                                 'records.name': future_education.future_education.aoi
                                             }
                                         }, {
                                             $lookup: {
                                                 from: "universityMaster",
                                                 localField: "university_id",
                                                 foreignField: "id",
                                                 as: "records.university_details",
                                             },
                                         }, {
                                             $lookup: {
                                                 from: "locationMaster",
                                                 localField: "location_id",
                                                 foreignField: "id",
                                                 as: "records.location_details",
                                             }
                                         }, {
                                             $lookup: {
                                                 from: "countryMaster",
                                                 localField: "country_id",
                                                 foreignField: "id",
                                                 as: "records.country_name",
                                             }
                                         }, {
                                             $lookup: {
                                                 from: "courseMaster",
                                                 localField: "course_id",
                                                 foreignField: "id",
                                                 as: "records.courseDetails",
                                             }
                                         }


                                     ]).toArray(function (err, result) {
                                         if (err) {
                                             throw new Error(err);
                                         } else {
                                             if (res) {
                                                 // duplicatesssssssssssssssssssss remove
                                                 // console.log(result);
                                                 res.send({result: result});
                                             } else {
                                                 res.send({result: null});
                                             }
                                         }
                                     });
                                 }else{
                                     res.send("please send future education details")
                                 }

                             }else{
                                 res.send("send profile_info")
                             }*/

                        }
                    });
                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });
    router.post('/test/probability_check', function (req, res, next) {
        /*   db_conn.collection('users').findOne({ token: req.headers.authorization }, function (err, user_res) {
               if (err) throw err; // Throw err if cannot connect
               else {
                   if(user_res){
                       req.body._id=user_res.email;
                       req.body.prob_info=req.body.prob_info;

                   }else{
                      res.send("not authenticated user");
                   }

               }

           });*/


    });
    router.get('/test/dream_university/:country/:level/:program/:exam/:score', function (req, res, next) {
        //res.send("ok");
        /*  db_conn.collection('users').findOne({ token: req.headers.authorization }, function (err, user_res) {
              if (err) throw err; // Throw err if cannot connect
              else {
                  if(user_res){
                      req.body._id=user_res.email;

                  }else{
                      res.send("not authenticated user");
                  }

              }

          });*/
        var filter_es = {};
        var exam;
        if (req.params.exam != '0' && req.params.score != '0') {
            exam = "converted_" + req.params.exam;

            filter_es[exam] = {$lte: parseInt(req.params.score)};

        } else {

            filter_es = {dummy: null};
        }
        console.log(filter_es);
        db_conn.collection("linksMaster").aggregate([
            // {$group:{_id:{id:"$id"}}},s
            {$match: {country_id: parseInt(req.params.country)}},
            {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records"
                }
            }, {$unwind: "$records"}, {
                $match: {
                    'records.level': req.params.level

                }
            }, {
                $lookup: {
                    from: "universityMaster",
                    localField: "university_id",
                    foreignField: "id",
                    as: "records.university_details",
                },
            }, {
                $lookup: {
                    from: "locationMaster",
                    localField: "location_id",
                    foreignField: "id",
                    as: "records.location_details",
                }
            }, {
                $lookup: {
                    from: "countryMaster",
                    localField: "country_id",
                    foreignField: "id",
                    as: "records.country_name",
                }
            }, {
                $lookup: {
                    from: "courseMaster",
                    localField: "course_id",
                    foreignField: "id",
                    as: "records.courseDetails",
                }
            },
            {$match: {"records.name": {$regex: req.params.program, $options: 'i'}}}, {
                $addFields: {
                    converted_tofel: {$convert: {input: "$toefl", to: "int", onError: 0, onNull: 0}},
                    converted_ielts: {$convert: {input: "$ielts", to: "int", onError: 0, onNull: 0}},
                    converted_pte: {$convert: {input: "$pte", to: "int", onError: 0, onNull: 0}},
                    converted_cae: {$convert: {input: "$cae", to: "int", onError: 0, onNull: 0}},
                    converted_cael: {$convert: {input: "$cael", to: "int", onError: 0, onNull: 0}},
                    converted_sat: {$convert: {input: "$sat", to: "int", onError: 0, onNull: 0}},
                    converted_gre: {$convert: {input: "$gre", to: "int", onError: 0, onNull: 0}},
                    converted_gmat: {$convert: {input: "$gmat", to: "int", onError: 0, onNull: 0}},
                    converted_melab: {$convert: {input: "$melab", to: "int", onError: 0, onNull: 0}},
                    converted_gpa: {$convert: {input: "$gpa", to: "int", onError: 0, onNull: 0}}
                }
            }
            , {$match: filter_es}


        ]).limit(100).toArray(function (err, result) {
            if (err) {
                throw new Error(err);
            } else {
                if (result) {
                    // duplicatesssssssssssssssssssss remove
                    // console.log(result);
                    res.send({result: result});
                } else {
                    res.send({result: null});
                }
            }
        });


    });

    router.get('/test/reg_exp_courses', function (req, res, next) {

        db_conn.collection('regular_exp_courses').find({}).toArray(function (err, response) {
            if (err) console.log(err);
            else res.send(response);
        });
    });

    router.get('/test/university_details/:uid/:lid/:cid', function (req, res, next) {

        db_conn.collection('users').findOne({token: req.headers.authorization}, function (err, user_res) {
            if (err) throw err; // Throw err if cannot connect
            else {
                console.log("...............", req.headers.authorization, user_res);
                if (user_res) {
                    async.parallel({
                        university_details: function (callback) {
                            db_conn.collection('universityMaster').findOne({id: parseInt(req.params.uid)}, function (err, result1) {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    callback(null, result1);

                                }
                            });

                        },
                        country_name: function (callback) {
                            db_conn.collection('countryMaster').findOne({id: parseInt(req.params.cid)}, function (err, result2) {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    if (result2)
                                        callback(null, result2.name);
                                    else
                                        callback(null, "not their")
                                }
                            });

                        },
                        location_name: function (callback) {
                            db_conn.collection('locationMaster').findOne({id: parseInt(req.params.lid)}, function (err, result3) {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    if (result3)
                                        callback(null, result3.name);
                                    else
                                        callback(null, "not their")
                                }
                            });

                        },
                        course_info: function (callback) {
                            db_conn.collection('linksMaster').aggregate([{
                                $match: {
                                    "university_id": parseInt(req.params.uid),
                                    "location_id": parseInt(req.params.lid),
                                    "country_id": parseInt(req.params.cid)
                                }
                            },
                                {
                                    $lookup: {
                                        "from": "courseMaster",
                                        localField: "course_id",
                                        foreignField: "id",
                                        as: "courseDetails"

                                    }
                                }
                            ]).toArray(function (err, result4) {
                                if (err) {
                                    throw new Error(err);
                                } else {
                                    callback(null, result4);
                                }
                            });

                        }
                    }, function (err, results) {
                        res.send(results);


                    });
                } else {
                    res.send("not authenticated user");
                }

            }

        });


    });

});


module.exports = router;

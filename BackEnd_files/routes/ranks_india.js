/*var request = require('request');

var headers = {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Mobile Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8',
   // 'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Cookie': '__cfduid=dadee68c127e963dab822b9d749aaf0ca1550226955; has_js=1; sc_is_visitor_unique=rx1575219.1550226956.F57B7BCD78D34FCF22CA003EE26083EB.1.1.1.1.1.1.1.1.1; _ga=GA1.2.608319883.1550226957; _gid=GA1.2.265471511.1550226957; _gat=1; _referrer_og=https%3A%2F%2Fwww.google.com%2F; _first_pageview=1; _jsuid=709984195; no_tracky_66633556=1'
};

var options = {
    url: 'http://www.webometrics.info/en/Asia/India?page=39',
    headers: headers
};
var cheerio = require('cheerio')

var MongoClient = require('mongodb').MongoClient;

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        $('.sticky-enabled tr').each(function() {
            var children = $(this).children();
            MongoClient.connect("mongodb://127.0.0.1:27017/", function (err, db) {
                if (err) throw err;
                var dbo = db.db("LIVEDATA_MASTERS");

                db_conn.collection("india_universities_and_ranks").insert({country_rank:$(children[0]).text(),world_rank:$(children[1]).text(),name:$(children[2]).text()}, (function (err, result) {
                    if (err) throw err;
                    else {
                        console.log(result)
                    }
                }));
            });
        });
    }
}

request(options, callback);*/
var MongoClient = require('mongodb').MongoClient;
var async=require('async');





function rotateFunc(skip,limit,callback){
    MongoClient.connect("mongodb://localhost:27017", function (err, db) {
        if (err) throw err;
        else{
            var count=0;
            console.log(skip,limit)
            db.db("LIVEDATA_MASTERS").collection('linksMaster').find().skip(parseInt(skip)).limit(limit).toArray(function(err,result) {
                if(err)console.log(err);
                else{
                    console.log(result.length);
                   callback(skip,limit);
                }
                /*  async.forEach(result,function (err,result2) {
                     if(err)console.log(err);
                     else{
                       //  console.log(result2);
                         db.collection('linksMaster').update({_id: result2._id}, {$set: {course_id: parseInt(result2.course_id)}},function(err,res){
                             if(err)console.log(err);
                             else {
                                 count++;
                               //  console.log(res,"resssssssssssssssssssssssssssssss");
                             }
                         });
                     }
                  },function(err,ress){
                      if(err)console.log(err);
                      else  callback(null);
                  });
  */


            });

        }

    });
};
function test(s,l){
    rotateFunc(s+100,l,function (s,l) {
        if((s+100)<8000){
            test(s+100,l)
        }else{
            console.log("completeddddddddddddddddddddddddddd")
        }


    });
}
test(0,100);






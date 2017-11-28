var request = require('request');

exports.getUserAccounts = function getData(url, session, username, callback){
    request.get(url, {'headers': {'ZUMO-API-VERSION': '2.0.0'}}, function(err, res, body){
        if (err){
            console.log(err);
        }
        else{
            callback(body, session, username);
        }
    });
};

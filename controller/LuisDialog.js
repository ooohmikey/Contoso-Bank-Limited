var builder = require('botbuilder');
var accounts = require('./Accounts');
var balance = require('./Balance');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bc0e1602-229e-4330-999d-f7109b7f08a3?subscription-key=888f92d3200d4bfd860966250cda354a&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    //Get the account balances of user
    bot.dialog('GetBalance', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to get details.");                
            } 
            else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Getting your balances...");
                balance.displayBalances(session, session.conversationData["username"]);
            //}
        }
    ]).triggerAction({
        matches: 'GetBalance'
    });

    //GetAccounts and displays the list of accounts owned by the user
    bot.dialog('GetAccounts', [
        function (session, args, next) {
            session.dialogData.args = args || {};        
            if (!session.conversationData["username"]) {
                builder.Prompts.text(session, "Enter a username to get details.");                
            } 
            else {
                next(); // Skip if we already have this info.
            }
        },
        function (session, results, next) {
            //if (!isAttachment(session)) {

                if (results.response) {
                    session.conversationData["username"] = results.response;
                }

                session.send("Getting your accounts...");
                accounts.displayAccounts(session, session.conversationData["username"]);
            //}
        }
    ]).triggerAction({
        matches: 'GetAccounts'
    });

    bot.dialog('TransferMoney', function (session, args) {
        session.send("Transferring...");
    }).triggerAction({
        matches: 'TransferMoney'
    });

    bot.dialog('Welcome', function (session, args) {
        session.send("Welcome to Contoso Bank Limited!");
    }).triggerAction({
        matches: 'Welcome'
    });
    
    bot.dialog('GetConversionRate', function (session, args) {
        session.send("Conversion rate intent");
    }).triggerAction({
        matches: 'GetConversionRate'
    });
    
    bot.dialog('UserIntent', function (session, args) {
        session.send("Hi there");
    }).triggerAction({
        matches: 'UserIntent'
    });

    bot.dialog('GetStocks', function (session, args) {
        session.send("Get stocks intent");
    }).triggerAction({
        matches: 'GetStocks'
    });
}
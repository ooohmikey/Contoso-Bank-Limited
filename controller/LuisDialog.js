var builder = require('botbuilder');
// Some sections have been omitted

exports.startDialog = function (bot) {
    
    // Replace {YOUR_APP_ID_HERE} and {YOUR_KEY_HERE} with your LUIS app ID and your LUIS key, respectively.
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bc0e1602-229e-4330-999d-f7109b7f08a3?subscription-key=888f92d3200d4bfd860966250cda354a&verbose=true&timezoneOffset=0&q=');

    bot.recognizer(recognizer);

    bot.dialog('GetBalance', function (session, args) {
        session.send("Your balance for accounts:");
    }).triggerAction({
        matches: 'GetBalance'
    });

    bot.dialog('GetAccount', function (session, args) {
        session.send("Showing your list of accounts:");
    }).triggerAction({
        matches: 'GetAccount'
    });

    bot.dialog('Deposit', function (session, args) {
        session.send("Depositing amount into your account");
    }).triggerAction({
        matches: 'Deposit'
    });

    bot.dialog('Withdraw', function (session, args) {
        session.send("Withdrawing amount from your account");
    }).triggerAction({
        matches: 'Withdraw'
    });

    bot.dialog('Welcome', function (session, args) {
        session.send("Welcome to Contoso Bank Limited!");
    }).triggerAction({
        matches: 'Welcome'
    });
}
var rest = require('../API/RestClient');

exports.displayAccounts = function getUserAccounts(session, username){
    var url = 'http://contosobanklimitedbot.azurewebsites.net/tables/BankBot';
    rest.getUserAccounts(url, session, username, handleUserAccounts)
};

function handleUserAccounts(message, session, username) {
    var response = JSON.parse(message);
    var allAccounts = [];
    for (var index in response) {
        var usernameReceived = response[index].username;
        var accounts = response[index].accounts; //The properties cheque, savings, credit

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add comma and list the accounts of the user
            //Maybe display the balances if the user requests later.
            if (accounts.length - 1) {
                allAccounts.push(accounts);
            }
            else {
                allAccounts.push(accounts + ', ');
            }
        }        
    }
    
    session.send("%s, Here are your accounts: %s", username, allAccounts);                
    
}
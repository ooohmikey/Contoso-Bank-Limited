var rest = require('../API/RestClient');

exports.displayBalances = function getAccountBalances(session, username){
    var url = 'http://contosobanklimitedbot.azurewebsites.net/tables/BankBot';
    rest.getUserAccounts(url, session, username, handleBalances)
};

function handleBalances(message, session, username) {
    var response = JSON.parse(message);
    var balanceSet = [];
    var validaccounts = ['cheque', 'savings', 'credit'];
    for (var index in response) {
        var usernameReceived = response[index].username;
        var balance = response[index].balances; //The properties cheque, savings, credit

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add comma and list the accounts of the user
            //Maybe display the balances if the user requests later.
            if (balance.length - 1) {
                balanceSet.push(balance);
            }
            //Extra logic to map accounts to balances.
            else {
                balanceSet.push(balance + ', ');
            }
        }        
    }
    session.send("%s, Here are your account balances: %s", username, balanceSet);                
    
}
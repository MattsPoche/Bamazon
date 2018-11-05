const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});
connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id "+ connection.threadId);
});
//select();
//console.log(inStock(1, 1));
start();


function userPrompt() {
    inquirer.prompt([
        {
            name: "index",
            type: "input",
            message: "Enter the id of the product you wish to purchase."
        },
        {
            name: "amount",
            type: "input",
            message: "Enter the number of items you wish to purchase"
        }
    ])
        .then(function (answer) {
            inStock(answer.index, answer.amount);
        });
}

function totalPrice(index, amount) {
    connection.query(
        "SELECT price FROM products WHERE ?",
        [{
            id: index
        }],
        function (err, res) {
            if (err) throw err;
            price = res[0].price * amount;
            console.log(`Your total price is: ${price}`);
            start();
        }
    );
}

function makePurchase(index, amount) {
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?",
        [amount,
            {
                id: index
            }],
        function (err, res) {
            if (err) throw err;
            totalPrice(index, amount);
        }
    );
}

function inStock(index, amount) {
   connection.query(
        "SELECT stock_quantity FROM products WHERE ?",
        [{
            id: index,
        }],
        function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity - amount < 0) {
                console.log("Insuffiecent stock");
                start();
            } else{
                makePurchase(index, amount);
            }
        }
    );
}

function start() {
    inquirer.prompt([{
        name: "enter",
        type: "input",
        message: "Press Enter to continue"
    }])
    .then(function(answer){
        connection.query(
            "SELECT * FROM products",
            function (err, res) {
                if (err) throw err;
                console.table(res);
                userPrompt();
            }
        );
    });
}
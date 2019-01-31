// import mysql & inquirer package

let mysql = require("mysql");
let inquirer = require("inquirer");

// create a connectionto your database

let db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Kiley120101",
  database: "bamazon_db"
});

// turn on connection to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  // run the start function after the connection is made

  // console.log("connected to database");

});


db.query("select * from products", ((error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("========================================================");
    console.log("   *** Here Are The Top 10 Products On Bamazon ***      ");
    console.log("========================================================");
    for (i = 0; i < results.length; i++) {
      console.log("========================================================");
      console.log("Item Id - " + results[i].id);
      console.log("------------------------------");
      console.log("Product - " + results[i].product_name);
      console.log("------------------------------");
      console.log("Price - $" + results[i].price.toFixed(2));
      console.log("========================================================");
      console.log("                                                        ");
    }
    start();
  }
}));



// message needs to ask if you want to buy anything & how many
let start = () => {
  inquirer.prompt([{

      name: "id",
      message: "Enter The Item Id Of The Product You Would Like To Buy",
      type: "text",
      default: 1,
    },
    {
      name: "quantity",
      message: "How many would you like to buy?",
      type: "input",
      default: 1,
      
    },
  ]).then((answers) => {

    checkStock(answers);
  console.log("                                                       ");
  });
}


let checkStock = (item) => {
  let query = "SELECT * FROM products WHERE id=?";

  db.query(query, [item.id], function (error, results) {

    let stockItem = results;

    console.log("=======================================================");
    console.log("You Selected " + stockItem[0].product_name);

    if (results.stock_quantity > item.quantity, error) {
      console.log(" Insufficient quantity! ")

    } else {
      console.log("--------------------------------------------------------");
      console.log("Thanks For Your Order");
      purchaseItem(item, stockItem);
    }

  });
}

let purchaseItem = (Item, itemStock) => {
  let query = "UPDATE products SET ? WHERE ?";
  let totalPrice = itemStock[0].price * Item.quantity;
  let newQuantity = itemStock[0].stock_quantity - Item.quantity;


  db.query(query, [{
    stock_quantity: newQuantity
  }, {
    id: Item.id

  }], (error, results) => {
    if (error) {
      throw error;
    } else {
      console.log("--------------------------------------------------------");
      console.log("Your Total  $" + totalPrice.toFixed(2));
      console.log("========================================================");
      itemUpdate(Item);
    }
  });

}

let itemUpdate = (currentItem) => {
  let query = "SELECT * FROM products WHERE id=?";

  db.query(query, [currentItem.id], (error, results) => {
    if (error) throw error;
    else {
      console.log(results)
    }
  })
};
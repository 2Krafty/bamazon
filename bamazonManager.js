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
db.connect((error) => {
  if (error) {
    throw error;
  }
  // run the start function after the connection is made

  console.log("connected to database");
  userInput();
});

let userInput = () => {
  inquirer.prompt([{
      name: "products",
      type: 'list',
      message: "Select One Of The Following Choices: ",
      choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    
  }
  ]).then((answers) => {
    runResults(answers.products);
  
  });
}

let allProducts = () => {
  db.query("SELECT * FROM  products", (error, results) => {
    for (var i = 0; i < results.length; i++) {
      
      console.log(results[i].id); 
      console.log(results[i].product_name);
      console.log(results[i].price);
      console.log(results[i].stock_quantity + " In Stock");
    }
  });
}


let lowInventory = () => {
  db.query("SELECT * FROM products WHERE stock_quantity < 50", (error, results) =>{
    for (var i = 0; i < results.length; i++) {
      console.log(results[i].id); 
      console.log(results[i].product_name);
      console.log(results[i].price);
      console.log(results[i].stock_quantity + " In Stock");
    }
  });
}

let addProducts = () => {
  inquirer.prompt([{
      name: "add",
      message: "Chose The Product Id You Would Like To Add: "
    },
    {
      name: 'quantity',
      message: 'Chose The Quantity You Would Like To Add: '
    }

  ]).then((answers) => {
    let query = db.query("UPDATE products SET? WHERE?", [{
        stock_quantity: parseInt(answers.quantity)
      },
      {
        id: parseInt(answers.add)
      }
    ], 
    );
    console.log(query.sql);

  });

}

let addProduct = () => {
  inquirer.prompt([{
      name: "product",
      message: "what product name do you want to add? "
    },
    {
      name: 'department',
      message: 'what department is this in? '
    },
    {
      name: 'price',
      message: 'what price is it? '
    },
    {
      name: 'stock',
      message: 'pick the quantity you want to add: '
    }

  ]).then((answers) => {
    let query = db.query("INSERT INTO products SET?", {
      product_name: answers.product,
      department_name: answers.department,
      price: answers.price,
      stock_quantity: answers.stock
    }, 
    );
    
    console.log(query.sql);
  });
}


let runResults = (userAnswers) => {
  switch (userAnswers) {
    case 'view products for sale':
      allProducts()
      break;
    case 'view low inventory':
      lowInventory()
      break;
    case 'add to inventory':
      addProducts()
      break;
    case 'add new product':
      addProduct()
      break;
  }
}
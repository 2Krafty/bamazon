DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cards Against Humanity", "Toys & Games", 25, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("WHAT DO YOU MEME? Party Game", "Toys & Games" 29.97, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV Stick 4K with all-new Alexa Voice Remote", "Electronics", 39.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("All-new Echo Dot (3rd Gen)", "Electronics", 29.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple AirPods", "Electronics", 159, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ring Wi-Fi Enabled Video Doorbell", "Electronics", 99.99, 38);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 299, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Smash Bros. Ultimate", "Video Games", 57.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("New Super Mario Bros. U Deluxe", "Video Games", 59.99, 21);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch Pro Controller", "Video Games", 56.99, 26);
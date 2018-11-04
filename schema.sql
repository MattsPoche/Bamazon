DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE products (
	id INT NOT NULL auto_increment,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("God of War", "Video Games", 60.00, 50),
("Bloodborne", "Video Games", 59.99, 30),
("Pac-Man", "Video Games", 10.00, 20),
("Microwave Oven", "Appliances", 100.00, 50),
("Blender", "Appliances", 30.46, 30),
("Cofee Maker", "Appliances", 12.30, 100),
("Ant Man", "TV and Movies", 4.99, 40),
("Jurassic World", "TV and Movies", 15.99, 50),
("Harry Potter: Complete 8 film set", "TV and Movies", 43.96, 60),
("MacGyver: The Complete first Season", "TV and Movies", 41.32, 20);

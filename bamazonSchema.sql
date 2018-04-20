DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL auto_increment,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity integer(3) NULL,
  PRIMARY KEY (item_id)
);


insert into products(product_name, department_name, price, stock_quantity)
values ("Stevie Ray Vaughan", "Classic Rock", 9.99, 20),
	   ("Creedence Clearwater Revival", "Classic Rock", 22.97, 10),
	   ("Guardians of the Galaxy Vol 1", "Movie Soundtracks", 10.98, 50),
       ("Atomic Blonde", "Movie Soundtracks", 11.48, 25),
	   ("Footloose", "Movie Soundtracks", 6.85, 30),
       ("Einaudi: Divenire", "Classical", 14.64, 22),
	   ("Richter: Recomposed", "Classical", 15.49, 14),
       ("Brian Regan Live", "Comedy", 12.99, 5),
       ("American IV: The Man Comes Around", "Country", 8.39, 9),
	   ("Miles Davis", "Jazz", 22.98, 11);

SELECT * FROM products;

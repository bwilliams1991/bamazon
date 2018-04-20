
const mysql = require('mysql');
var inquirer = require("inquirer");

let connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password: "password",
	database: "bamazon"
});

// var remain = 0;

connection.connect((error) => {
	if (error) {
		return console.log("There was an error", error);
	}

	console.log("your are connected with id:" + connection.threadId);
	readDB();

})
function readDB() {
	connection.query("SELECT * FROM products", (qErr, data) => {
		if (qErr) {
			return console.log("There was an error", qErr);
		}

		// console.log(data);

		// shows all available products
		console.log(JSON.stringify(data, null, 2));

		// for (let i = 0; i < data.length; i++) {
		//     // console.log(data[i].item_id);
		//     // console.log(data[i].product_name);
		//     // console.log(data[i]);
		//     // console.log(data[i]);
		//     // console.log(JSON.stringify(data[i], null, 2));
		// }

		purchaseItems();

	})
}

function purchaseItems() {

	console.log(" Purchase Items");
	console.log("----------------");

	inquirer.prompt([
		{
			type: "confirm",
			message: "Would you like to Purchase Items?",
			name: "purchaseItems",
			default: 'Y'
		}, // choices: [true, false] are implicit in the above inquiry
	]).then((choices) => {
		// console.log('');

		console.log(choices);
		if (choices.purchaseItems) {
			// console.log('if');

			return selectProduct();
		} else {
			// console.log('else');
			console.log("Thank you for using Bamazon, have a nice day!");
			return endRun();

		}

	});
}

function selectProduct() {
	// console.log("b4 prompt");

	inquirer.prompt([
		{
			name: "itemID",
			type: "input",
			message: "Enter the id of the item you would like to purchase:"
			// validate: function isNum(item_id) {
			// 	if (isNaN(item_id)) {
			// 	// if (isNaN(item_id) || item_id > data.length) {
			// 		return console.log("That is not a valid selection!");
			// 	}
			// }
		}
	]).then((itemID) => {
		// console.log(itemID);
		console.log("prompt.then");
		var id = itemID.itemID;
		connection.query("SELECT * FROM products WHERE item_id =" + id,
			(qErr, data) => {
				if (qErr) {
					return console.log("There was an error", qErr);
				}

				console.log(JSON.stringify(data, null, 2));
				inquirer.prompt([
					{
						name: "itemQTY",
						type: "input",
						message: "How many units would you like to buy?"
						// validate: function isNum(itemQTY) {
						// 	if (isNaN(itemQTY)) {
						// return console.log("That is not a valid selection! You must use a number.");
						// 	}
						// }
					}
				])// if (isNaN(item_id) || itemQTY > data.) {
					.then((itemQTYres) => {

						console.log(JSON.stringify(data, null, 2));

						var qty = itemQTYres.itemQTY;
						// console.log(qty);

						// console.log(data[0].stock_quantity);
						var remain = data[0].stock_quantity - qty;
						var item = data[0].item_id;

						if (qty > data[0].stock_quantity) {
							console.log("Insufficient quantity in stock! Please select another item.");
							return selectProduct();
						} else {

							return updateStock(remain, item);

						}
					});
			});
	});
}


function updateStock(remain, item) {

	var query = connection.query("UPDATE products SET ? WHERE ?", [
		{
			stock_quantity: remain
		},
		{
			item_id: item
		}
	], (err, data) => {
		console.log(err.affectedRows + 'items were updated!');

	});

	console.log('Thank you for your purchase!');

	return purchaseItems();
	console.log("breaks here for some reason...");

}




function endRun() {
	connection.end();
}


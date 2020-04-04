var express = require("express");
var router = express.Router();
const db = require("../../config/db");
const { joiPurchaseLineArray } = require("../../joiSchemas/purchaseOrder/joiPurchaseLine");
const { joiPurchaseHeaderInsert } = require("../../joiSchemas/purchaseOrder/joiPurchaseHeader");

router.post("/add", (req, res) => {
	const { lines, header } = req.body;

	let { error, value } = joiPurchaseLineArray.validate(lines);
	let { error1, value1 } = joiPurchaseHeaderInsert.validate(header);
	if (error || error1) {
		return res.status(403).send(error);
	} else {
		let sql = "INSERT INTO purchase_order_header SET ?";
		db.query(sql, header, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(400).send(err);
			}

			let newData = []; 
			const headerID = result.insertId;
			const date = new Date().toJSON().slice(0, 10).replace(/-/g, "/");
			const dateTime = new Date();

			value.forEach((line, index) => {
				line["PO_Header_ID"] = headerID;
				newData.push(Object.values(line));
			});

			// console.log(newData);

			sql = 
				`INSERT INTO purchase_order_line (Item_ID, UOM_Name, Price, GST_Per, GST_Amt,
			  WHT_Per, WHT_Amt, Total_Amt,Created_By, Creation_Date,Last_Updated_Date,
 				Last_Updated_By, PO_Header_ID) VALUES ?`;
			db.query(sql, [newData], (err, result) => {
				if (err) {
					console.log(err);
					db.query("DELETE from purchase_order_header where PO_Header_ID = ?", [
						headerID,
					]);
					return res.status(400).send(err);
				}

				return res
					.status(200)
					.send(`${result.affectedRows} Records Added SuccessFully.`);
			});
		});
	}
});

module.exports = router;
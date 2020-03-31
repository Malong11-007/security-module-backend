var express = require('express');
var router = express.Router();
const db = require('../../config/db');

/* GET ROUTE */ 
router.get('/:Organization_ID',(req,res) => {
	const { Organization_ID } = req.params;
	console.log(Organization_ID);
	const sql = 'SELECT Item_ID, Item_Name, Item_Code, UOM_ID, Max_Qty, Min_Qty FROM item WHERE Organization_ID = ?';
	db.query(sql,[Organization_ID],(err,results) => {
		if(err){
			console.log(err);
			return res.status(403).send(err);
		} else {
			return res.status(200).json(results);
		}
	})
})

/* INSERT ROUTE */

/* UPDATE ROUTE */ 

/* DELETE ROUTE */ 

module.exports = router;
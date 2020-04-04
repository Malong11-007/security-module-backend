var express = require('express');
var router = express.Router();
const db = require('../../config/db');


router.get('/:Organization_ID',(req,res) => {
	const { Organization_ID } = req.params;
	console.log(Organization_ID);
	const sql = 'select User_ID , User_Name from users where Organization_ID = ?';
	db.query(sql,[Organization_ID],(err,results) => {
		if(err){
			console.log(err);
			return res.status(403).send(err);
		} else {
			return res.status(200).json(results);
        }
	})
})


module.exports = router;
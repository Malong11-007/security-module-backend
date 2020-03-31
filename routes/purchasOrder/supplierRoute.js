var express = require('express');
var router = express.Router();
const db = require('../../config/db');

router.get('/:Organization_ID',(req,res) => {
    
    const {Organization_ID} = req.params;
    console.log(Organization_ID);
    db.query('select Supplier_ID,Supplier_Name,Supplier_Type from supplier where Organization_ID = ?', [Organization_ID], 
    (error, results, fields)=> {
        if(error){
            console.log(error);
            res.status(403).send(error);
            return;
        }
        else{
            
            res.status(200).json(results);
        }

    
    });

});
module.exports = router
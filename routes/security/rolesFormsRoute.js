var express = require('express');
var router = express.Router();
const db = require('../../config/db');
const { processedResults } = require('../../middleware/index.js')
const { joiRolesFormsInsert, joiRolesFormsUpdate } = require('../../joiSchemas/security/joiRoles_forms');

// roles_forms : GET ALL route
router.get('/get',processedResults('rolesForms'),(req,res) => {
  res.json(res.processedResults);
})

// roles_forms : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiRolesFormsInsert.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO roles_forms SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      // console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`Role_form_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// roles_forms : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiRolesFormsUpdate.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE roles_forms SET ? Where Role_form_ID = ?',[req.body,req.params.id],(err,result) => {
      if (err) throw err;

      // console.log(`Changed ${result.changedRows} row(s)`);
      return res.status(200).json({
        msg:`Changed ${result.changedRows} row(s)`,
        updated: true
      });
    })
  }
})

// roles_forms : DELETE route
router.delete('/delete/:id',(req,res) => {
  db.query('DELETE from roles_forms Where Role_form_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`Role_form_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;

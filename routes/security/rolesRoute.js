var express = require('express');
var router = express.Router();
const db = require('../../config/db');
const { joiRolesInsert, joiRolesUpdate } = require('../../joiSchemas/security/joiRoles');

// Roles : GET ALL route
router.get('/get',(req,res) => {
  //where Organization_ID clause needs to be added
  db.query('SELECT * from roles',(err,rows) => {
    if(err) throw err;

    // console.log(rows)
    res.status(200).send(rows);
  })
})

// Roles : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiRolesInsert.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO roles SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      // console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`Role_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// Roles : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiRolesUpdate.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE roles SET ? Where Role_ID = ?',[req.body,req.params.id],(err,result) => {
      if (err) throw err;

      // console.log(`Changed ${result.changedRows} row(s)`);
      return res.status(200).json({
        msg:`Changed ${result.changedRows} row(s)`,
        updated: true
      });
    })
  }
})

router.delete('/delete/:id',(req,res) => {
  db.query('DELETE from roles Where Role_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`Role_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;

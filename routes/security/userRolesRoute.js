var express = require('express');
var router = express.Router();
const db = require('../../config/db');
const { processedResults } = require('../../middleware/index.js')
const { joiUserRolesInsert, joiUserRolesUpdate } = require('../../joiSchemas/security/joiUser_roles');

// User_Roles : GET ALL route
router.get('/get',processedResults('user-roles'),(req,res) => {
  res.json(res.processedResults);
})

// User_Roles : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiUserRolesInsert.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO user_roles SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      // console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`User_Role_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// User_Roles : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiUserRolesUpdate.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE user_roles SET ? Where User_Role_ID = ?',[req.body,req.params.id],(err,result) => {
      if (err) throw err;

      // console.log(`Changed ${result.changedRows} row(s)`);
      return res.status(200).json({
        msg:`Changed ${result.changedRows} row(s)`,
        updated: true
      });
    })
  }
})

// User_Roles : DELETE route
router.delete('/delete/:id',(req,res) => {
  db.query('DELETE from user_roles Where User_Role_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`User_Role_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;

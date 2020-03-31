var express = require('express');
var router = express.Router();
const db = require('../../config/db');
const { processedResults } = require('../../middleware/index.js')
const { joiRolesModulesInsert, joiRolesModulesUpdate } = require('../../joiSchemas/security/joiRoles_modules');

// roles_modules : GET ALL route
router.get('/get',processedResults('rolesModules'),(req,res) => {
  res.json(res.processedResults);
})

// roles_modules : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiRolesModulesInsert.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO roles_modules SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      // console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`Role_Module_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// roles_modules : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiRolesModulesUpdate.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE roles_modules SET ? Where Role_Module_ID = ?',[req.body,req.params.id],(err,result) => {
      if (err) throw err;

      // console.log(`Changed ${result.changedRows} row(s)`);
      return res.status(200).json({
        msg:`Changed ${result.changedRows} row(s)`,
        updated: true
      });
    })
  }
})

// roles_modules : DELETE route
router.delete('/delete/:id',(req,res) => {
  db.query('DELETE from roles_modules Where Role_Module_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`Role_Module_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;

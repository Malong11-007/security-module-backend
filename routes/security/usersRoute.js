var express = require('express');
var router = express.Router();
const db = require('../../config/db');
const { processedResults } = require('../../middleware/index.js')
const { joiUsersInsert, joiUsersUpdate } = require('../../joiSchemas/security/joiUsers');

// User : GET ALL route
router.get('/get',processedResults('users'),(req,res) => {
  res.json(res.processedResults);
})

// User : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiUsersInsert.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO users SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      // console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`User_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// User : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiUsersUpdate.validate(req.body);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE users SET ? Where User_ID = ?',[req.body,req.params.id],(err,result) => {
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
  db.query('DELETE from users Where User_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`User_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;

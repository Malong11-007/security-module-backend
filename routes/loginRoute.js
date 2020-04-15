var express = require('express');
var router = express.Router();
const db = require('../config/db');
const {isAuthenticated} = require('../middleware/isAuthenticated');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const SECRET = 'jwtTOken'; // will be set in env later


/* test route */
router.get('/test',(req,res) => {
	res.send(200,'TEST PASS')
})


/* user login Route */
router.post('/',(req,res) => {
	const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    db.query('SELECT User_Name ,User_hpassword, User_ID, User_Email, Organization_ID, Branch_ID FROM users WHERE User_Email = ?', [email], 
      (error, results, fields)=> {
      	if(error){
      		console.log(error)
      		return res.status(400).send(error);
      	}
      	if(results.length > 0){
      		const { User_ID, User_hpassword, Organization_ID, Branch_ID, User_Email, User_Name } = results[0];
	        if (results.length > 0 && bcrypt.compareSync(password, User_hpassword)) {
	      		db.query('CALL getFormsAndModules(?)',[User_ID],(error, results, fields) => {
						  if (error) {
						    return console.error(error.message);
						  }
						  const payload = {
						  	email: email,
						  	id: User_ID
						  }
						  
						  //Should add Organization_id in cookie to be more secure i guess
						  const token = JWT.sign(payload,SECRET);
						  res.cookie('access_token',token,{
						  	maxAge: 1000 * 60 * 60 * 24 * 365, // Unlimited Time
						  	httpOnly:true,
						  	// secure:true // will be set in productions requires HTTPS
						  })
						  res.status(200).json({
						  	User_ID,
						  	User_Name,
						  	User_Email,
						  	Organization_ID,
						  	Branch_ID,
						  	forms:results[0],
						  	modules:results[1]
						  })
						})
	        } else {
	          res.status(400).send('Incorrect Email and/or Password!');
	        }	
      	} else {
      		res.status(400).send('Incorrect Email and/or Password!');
      	}
      	           
    });
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
})

/* Logout Route */
router.post('/logout',isAuthenticated,(req,res) => {
	res.cookie('access_token','',{
  	maxAge: 1000, 
  	httpOnly:true,
  	// secure:true // will be set in productions requires HTTPS
  })
  res.status(200).send('User logged out successfully.')
})

module.exports = router;
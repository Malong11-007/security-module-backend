const Joi = require('@hapi/joi');

const joiUsersInsert = Joi.object({
	User_Name : Joi.string().max(50).required(),
	User_hpassword: Joi.string().max(250).required(),
	User_Status: Joi.string().max(25).required(),
	User_Email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
	User_Mobile: Joi.number().integer().max(11).required(),
	Employee_ID: Joi.number().integer().max(11).required(),
	Host_ID_Restric: Joi.string().max(50).required(),
	Last_Login_Date: Joi.date().required(),
	Account_Locked_Flag:  Joi.string().max(1).required(),
	HostID_at_Time_Locked: Joi.string().max(50).required(),
	Time_Date_Locked: Joi.date().required(),
	Organization_ID: Joi.number().integer().max(11).required(),
	Branch_ID: Joi.number().integer().max(11).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().required(),
})

const joiUsersUpdate = Joi.object({
	User_Name : Joi.string().max(50),
	User_hpassword: Joi.string().max(250),
	User_Status: Joi.string().max(25),
	User_Email: Joi.string().max(50).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
	User_Mobile: Joi.number().integer().max(11),
	Employee_ID: Joi.number().integer().max(11),
	Host_ID_Restric: Joi.string().max(50),
	Last_Login_Date: Joi.date(),
	Account_Locked_Flag:  Joi.string().max(1),
	HostID_at_Time_Locked: Joi.string().max(50),
	Time_Date_Locked: Joi.date(),
	Organization_ID: Joi.number().integer().max(11),
	Branch_ID: Joi.number().integer().max(11),
	Enabled_Flag: Joi.string().max(1),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number(),
})


module.exports = {
	joiUsersInsert,
	joiUsersUpdate
}
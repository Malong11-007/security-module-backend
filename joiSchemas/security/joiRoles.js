const Joi = require('@hapi/joi');

const joiRolesInsert = Joi.object({
	Role_Name : Joi.string().max(250).required(),
	Role_Desc: Joi.string().max(500).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.number().integer().max(11).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().integer().max(11).required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().max(11).required(),
})

const joiRolesUpdate = Joi.object({
	Role_ID: Joi.number().integer().max(11),
	Role_Name : Joi.string().max(250),
	Role_Desc: Joi.string().max(500),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.number().integer().max(99999999999),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number().integer().max(11),
})


module.exports = {
	joiRolesInsert,
	joiRolesUpdate
}
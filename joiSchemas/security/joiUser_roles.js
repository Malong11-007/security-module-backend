const Joi = require('@hapi/joi');

const joiUserRolesInsert = Joi.object({
	User_ID : Joi.number().integer().max(11).required(),
	Roles_ID: Joi.number().integer().max(11).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.number().integer().max(11).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().integer().max(11).required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().max(11).required(),
})

const joiUserRolesUpdate = Joi.object({
	User_Role_ID: Joi.number().integer().max(11),
	User_ID : Joi.number().integer().max(11),
	Roles_ID: Joi.number().integer().max(11),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.number().integer().max(11),
	Created_By: Joi.number().integer().max(11),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number().integer().max(11),
})


module.exports = {
	joiUserRolesInsert,
	joiUserRolesUpdate
}
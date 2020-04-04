const Joi = require('@hapi/joi');

const joiUserRolesInsert = Joi.object({
	User_ID : Joi.number().integer().min(1).max(99999999999).required(),
	Role_ID: Joi.number().integer().min(1).max(99999999999).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.number().integer().min(1).max(99999999999).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().integer().min(1).max(99999999999).required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().min(1).max(99999999999).required(),
})

const joiUserRolesUpdate = Joi.object({
	User_Role_ID: Joi.number().integer().min(1).max(99999999999).required(),
	User_ID : Joi.number().integer().min(1).max(99999999999).required(),
	Roles_ID: Joi.number().integer().min(1).max(99999999999).required(),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.number().integer().min(1).max(99999999999).required(),
	Created_By: Joi.number().integer().min(1).max(99999999999).required(),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number().integer().min(1).max(99999999999).required(),
})


module.exports = {
	joiUserRolesInsert,
	joiUserRolesUpdate
}
const Joi = require('@hapi/joi');

const joiUserRolesInsert = Joi.object({
	User_ID : Joi.string().length(11).regex(/^\d+$/),
	Role_ID: Joi.string().length(11).regex(/^\d+$/),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.string().length(11).regex(/^\d+$/),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.string().length(11).regex(/^\d+$/),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.string().length(11).regex(/^\d+$/),
})

const joiUserRolesUpdate = Joi.object({
	User_Role_ID: Joi.string().length(11).regex(/^\d+$/),
	User_ID : Joi.string().length(11).regex(/^\d+$/),
	Roles_ID: Joi.string().length(11).regex(/^\d+$/),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.string().length(11).regex(/^\d+$/),
	Created_By: Joi.string().length(11).regex(/^\d+$/),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.string().length(11).regex(/^\d+$/),
})


module.exports = {
	joiUserRolesInsert,
	joiUserRolesUpdate
}
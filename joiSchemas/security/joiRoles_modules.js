const Joi = require('@hapi/joi');

const joiRolesModulesInsert = Joi.object({
	Role_ID: Joi.string().max(250).required(),
	Module_ID: Joi.string().max(500).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.number().integer().max(99999999999).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().integer().max(11).required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().max(11).required(),
})

const joiRolesModulesUpdate = Joi.object({
	Role_Module_ID: Joi.number().integer().max(11),
	Role_ID: Joi.number().integer().max(11),
	Module_ID: Joi.number().integer().max(11),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.number().integer().max(99999999999),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number().integer().max(11),
})


module.exports = {
	joiRolesModulesInsert,
	joiRolesModulesUpdate
}
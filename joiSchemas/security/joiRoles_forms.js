const Joi = require('@hapi/joi');

const joiRolesFormsInsert = Joi.object({
	Role_ID: Joi.string().max(250).required(),
	Form_ID: Joi.string().max(500).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Organization_ID: Joi.number().integer().max(11).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().integer().max(11).required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().max(11).required(),
})

const joiRolesFormsUpdate = Joi.object({
	Role_form_ID: Joi.number().integer().max(11),
	Role_ID: Joi.number().integer().max(11),
	Form_ID: Joi.number().integer().max(11),
	Enabled_Flag: Joi.string().max(1),
	Organization_ID: Joi.number().integer().max(11),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number().integer().max(11),
})


module.exports = {
	joiRolesFormsInsert,
	joiRolesFormsUpdate
}
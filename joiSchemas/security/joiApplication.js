const Joi = require('@hapi/joi');

const joiApplicationInsert = Joi.object({
	Application_Name : Joi.string().max(250).required(),
	Application_Desc: Joi.string().max(500).required(),
	Application_Short_Name: Joi.string().max(10).required(),
	Enabled_Flag: Joi.string().max(1).required(),
	Creation_Date: Joi.date().required(),
	Created_By: Joi.number().required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().required(),
})

const joiApplicationUpdate = Joi.object({
	Application_Name : Joi.string().max(250),
	Application_Desc: Joi.string().max(500),
	Application_Short_Name: Joi.string().max(10),
	Enabled_Flag: Joi.string().max(1),
	Last_Updated_Date: Joi.date(),
	Last_Updated_By: Joi.number(),
})


module.exports = {
	joiApplicationInsert,
	joiApplicationUpdate
}
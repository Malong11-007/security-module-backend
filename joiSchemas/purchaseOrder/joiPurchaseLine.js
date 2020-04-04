const Joi = require('@hapi/joi');

const joiPurchaseLineInsert = Joi.object({
	PO_Line_ID: Joi.number().integer().min(1).max(99999999999),
	Item_ID: Joi.number().integer().min(1).max(99999999999),
	UOM_Name: Joi.string().max(25).required(),
	Price: Joi.number().integer().min(1).max(99999999999),
	GST_Amt: Joi.number().integer().min(1).max(99999999999),
	GST_Per: Joi.number().integer().min(1).max(99999999999),
	WHT_Amt: Joi.number().integer().min(1).max(99999999999),
	WHT_Per: Joi.number().integer().min(1).max(99999999999),
	Total_Amt: Joi.number().integer().min(1).max(99999999999),
	Created_By: Joi.number().integer().min(1).max(99999999999),
	Creation_Date: Joi.date().required(),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().min(1).max(99999999999),
})

const joiPurchaseLineArray = Joi.array().items(joiPurchaseLineInsert).options({stripUnknown:true});

module.exports = {
	joiPurchaseLineInsert,
	joiPurchaseLineArray
}
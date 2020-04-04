const Joi = require('@hapi/joi');

const joiPurchaseHeaderInsert = Joi.object({
	PO_NO: Joi.string().max(50).required(),
	PO_Date: Joi.date().required(),
	Supplier_ID: Joi.number().integer().min(1).max(99999999999),
	Ship_To_ID: Joi.number().integer().min(1).max(99999999999),
	Payment_Type : Joi.string().max(25).required(),
	Ref_No: Joi.string().max(25).required(),
	Remarks: Joi.string().max(500).required(),
	Status: Joi.string().max(50).required(),
	Approved_By_ID: Joi.number().integer().min(1).max(99999999999),
	Approved_Date: Joi.date().required(),
	Organization_ID: Joi.number().integer().min(1).max(99999999999),
	Created_By:Joi.number().integer().min(1).max(99999999999),
	Last_Updated_Date: Joi.date().required(),
	Last_Updated_By: Joi.number().integer().min(1).max(99999999999)
    
})

module.exports = {
	joiPurchaseHeaderInsert
} 
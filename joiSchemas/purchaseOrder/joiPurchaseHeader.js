const Joi = require('@hapi/joi');

const joiPurchaseHeaderInsert = Joi.object({
	
	PO_NO: Joi.string().max(50).required(),
	PO_Date: Joi.date().required(),
	Supplier_ID: Joi.string().max(11).regex(/^\d+$/).required(),
    Ship_To_ID: Joi.string().max(11).regex(/^\d+$/).required(),
    Payment_Type : Joi.string().max(25).required(),
	Ref_No: Joi.string().max(25).required(),
	Remarks: Joi.string().max(500).required(),
	Status: Joi.string().max(50).required(),
    Approved_By_ID: Joi.string().max(11).regex(/^\d+$/).required(),
    Approved_Date: Joi.date().required(),
	Organization_ID: Joi.string().max(11).regex(/^\d+$/).required(),
    Created_By:Joi.string().max(11).regex(/^\d+$/).required(),
	Last_Updated_Date: Joi.date().required(),
    Last_Updated_By: Joi.string().max(11).regex(/^\d+$/).required()
    
})
module.exports = {joiPurchaseHeaderInsert} 
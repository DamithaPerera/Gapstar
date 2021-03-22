const Joi = require('@hapi/joi');
const responseMessages = require('../../lib/util');
const responseMsg = require('../../lib/responseMessages');


exports.create = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object().keys({

        name: Joi.string().required(),
        slug: Joi.string().required(),
        sku: Joi.string().required(),
        brand: Joi.string().required(),
    });

    Joi.validate(data, schema, (err, value) => {
        if (err) {
            let response = responseMessages.commonResponse(responseMsg.FAIL, data, err.details[0].message);
            return res.status(422).json(response);
        }
        next();
    });
}

exports.update = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object().keys({

        name: Joi.string().required(),
        slug: Joi.string().required(),
        sku: Joi.string().required(),
        brand: Joi.string().required(),
    });

    Joi.validate(data, schema, (err, value) => {
        if (err) {
            let response = responseMessages.commonResponse(responseMsg.FAIL, data, err.details[0].message);
            return res.status(422).json(response);
        }
        next();
    });
}
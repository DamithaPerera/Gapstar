const Joi = require('@hapi/joi');
const responseMessages = require('../../lib/util');
const responseMsg = require('../../lib/responseMessages');

exports.register = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object().keys({

        name: Joi.string().max(44).required(),
        email: Joi.string().max(44).required(),
        password: Joi.string().max(44).required(),
    });

    Joi.validate(data, schema, (err, value) => {
        if (err) {
            let response = responseMessages.commonResponse(responseMsg.FAIL, data, err.details[0].message);
            return res.status(422).json(response);
        }
        next();
    });
}

exports.login = (req, res, next) => {
    const data = req.body;

    const schema = Joi.object().keys({

        email: Joi.string().max(44).required(),
        password: Joi.string().max(44).required(),
    });

    Joi.validate(data, schema, (err, value) => {
        if (err) {
            let response = responseMessages.commonResponse(responseMsg.FAIL, data, err.details[0].message);
            return res.status(422).json(response);
        }
        next();
    });
}
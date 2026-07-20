const Joi = require("joi");
const pick = require("../helper/pick");


const validate = (schema) => async (req, res, next) => {
    try {
        const objs = await pick(req, Object.keys(schema));

        const { error, value } = Joi
            .compile(schema)
            .prefs({
                abortEarly: false
            })
            .validate(objs);

            console.log("error++++", error);
            
        if (error) {
            const errMsg = error.details.map(e => e.message).join(", ");

            return res.status(400).json({
                success: false,
                data: [],
                message: errMsg
            })
        }


        if(Object.keys(schema).includes('query')){
            delete value.query
        }

        
        console.log("value++", value);
        
        Object.assign(req, value)

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

module.exports = validate;
const Joi = require('@hapi/joi')
module.exports = {
  validateParam: (schema, nameOfField) => {
    return (req, res, next) => {
      const result = schema.idSchema.validate({ id: req.params[nameOfField] })
      if (result.error) {
        // Error was found
        return res.status(400).json(result.error)
      } else {
        // pass the valid data for req value
        if (!req.value) req.value = {}

        if (!req.value.validParams) req.value.validParams = {}

        req.value.validParams[nameOfField] = result.value[nameOfField]
        // res.status(200).json({ data: req.value })
        next()
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        // pass the valid data for req value
        if (!req.value) req.value = {}
        if (!req.value.validBody) req.value.validBody = {}
        req.value.validBody = result.value
        next()
      }
    }
  },

  schemas: {
    newUserSchema: Joi.object({
      email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().min(3)
    }),
    patchUserSchema: Joi.object({
      name: Joi.string().required().min(3)
    }),
    newInvestmentSchema: Joi.object({
      name: Joi.string().min(3).required(),
      initialCapital: Joi.number().integer().required(),
      description: Joi.string(),
      profit: Joi.number().integer()
    }),
    idSchema: Joi.object({
      id: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$')).required()
    })
  }
}

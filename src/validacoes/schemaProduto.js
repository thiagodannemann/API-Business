const joi = require('joi');

const cadastrar = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório'
    }),
    quantidade_estoque: joi.number().positive().required().messages({
        'any.required': 'O campo quantidade é obrigatório',
        'string.empty': 'O campo quantidade é obrigatório',
        'number.positive': 'O valor do campo quantidade deve ser maior que zero'
    }),
    valor: joi.number().required().positive().messages({
        'any.required': 'O campo valor é obrigatório',
        'string.empty': 'O campo valor é obrigatório',
        'number.positive': 'O valor do campo valor deve ser maior que zero'
    }),
    categoria_id: joi.number().required().positive().messages({
        'any.required': 'O campo categoria é obrigatório',
        'string.empty': 'O campo categoria é obrigatório',
        'number.positive': 'O valor do campo categoria_id deve ser maior que zero'
    })
})

const validarImagem = joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required().messages({
        'any.required': 'O arquivo deve possuir um nome obrigatoriamente',
        'string.empty': 'O arquivo deve possuir um nome obrigatoriamente'
    }),
    encoding: joi.string(),
    buffer: joi.binary(),
    mimetype: joi.string().valid(
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/gif'
    ).required().messages({
        'any.only': 'O tipo de arquivo não é suportado. Apenas JPEG, PNG, e GIF são permitidos.',
        'object.unknown': 'O tipo de arquivo não é suportado. Apenas JPEG, PNG, e GIF são permitidos.'
    }),
    size: joi.number().required()
})

module.exports = {
    cadastrar,
    validarImagem
};
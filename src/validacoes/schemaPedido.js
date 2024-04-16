const joi = require('joi');

const cadastrar = joi.object({
  cliente_id: joi.number().integer().min(1).required().messages({
    'any.required': 'O campo cliente_id é obrigatório',
    'number.empty': 'O campo cliente_id é obrigatório',
    'number.base': 'O campo cliente_id deve ser um número.',
    'number.min': 'O campo cliente_id deve ser um valor maior que zero.'

  }),

  observacao: joi.string().allow('').messages({
    'string.base': 'O campo observacao deve ser um texto'
  }),

  pedido_produtos: joi.array().items(
    joi.object({
      produto_id: joi.number().integer().min(1).required().messages({
        'number.base': 'O campo produto_id deve ser um número',
        'number.integer': 'O campo produto_id deve ser um número inteiro',
        'number.min': 'O valor do campo produto_id deve ser maior que 0',
        'any.required': 'O campo produto_id é obrigatório'
      }),
      quantidade_produto: joi.number().integer().min(1).required().messages({
        'number.base': 'O campo quantidade_produto deve ser um número',
        'number.integer': 'O campo quantidade_produto deve ser um número inteiro',
        'number.min': 'O valor do campo quantidade_produto deve ser maior que 0',
        'any.required': 'O campo quantidade_produto é obrigatório'
      })
    })
  ).min(1).required().messages({
    'any.required': 'O campo pedido_produtos é obrigatório',
    'array.base': 'O campo pedido_produtos deve ser um array',
    'array.min': 'O campo pedido_produtos deve conter pelo menos um objeto'
  })

})

module.exports = { cadastrar }
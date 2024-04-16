const joi = require('joi');

const cadastrar = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório'

  }),
  email: joi.string().email().required().messages({
    'string.email': 'Email informado é inválido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
    'string.base': 'O campo email deve ser texto'
  }),
  cpf: joi.string().pattern(/^\d{11}$/).required().messages({
    'any.required': 'O campo cpf é obrigatório',
    'string.empty': 'O campo cpf é obrigatório',
    'string.pattern.base': 'O CPF precisa conter exatamente 11 dígitos sem pontuação',
  }),
  cep: joi.string(),
  rua: joi.string(),
  numero: joi.string(),
  bairro: joi.string(),
  cidade: joi.string(),
  estado: joi.string()
});

module.exports = { cadastrar };
const joi = require('joi');

const cadastrar = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório'

  }),
  email: joi.string().email().required().messages({
    'string.email': 'Email informado é inválido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório'
  }),
  senha: joi.string().min(4).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter pelo menos 4 caracteres'
  })
});

const editar = joi.object({
  nome: joi.string().required().messages({
    'any.required': 'O campo nome é obrigatório',
    'string.empty': 'O campo nome é obrigatório'

  }),
  email: joi.string().email().required().messages({
    'string.email': 'Email informado é inválido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório'
  }),
  senha: joi.string().min(4).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha precisa conter pelo menos 4 caracteres'
  })
});

const login = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'E-mail ou senha incorretos',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório'
  }),
  senha: joi.string().required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
  })
});

module.exports = {
  cadastrar,
  editar,
  login
}


const knex = require("../conexao");
const bcrypt = require('bcrypt');

const efetuarLogin = async (req, res, next) => {
  const { email, senha } = req.body;

  try {
    const usuarioEncontrado = await knex('usuarios').where({ email }).first();

    if (!usuarioEncontrado) {
      return res.status(400).json({
        mensagem: 'E-mail ou senha incorretos'
      })
    }

    const senhaVerificada = await bcrypt.compare(senha, usuarioEncontrado.senha)

    if (!senhaVerificada) {
      return res.status(400).json({
        mensagem: 'E-mail ou senha incorretos'
      })
    }

    req.body = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email
    }

    next()

  } catch (error) {
    return res.status(500).json({
      mensagem: error.message
    })
  }
}

module.exports = efetuarLogin
const knex = require("../conexao");
const jwt = require('jsonwebtoken');

const cadastrar = async (req, res, next) => {
  const token = req.token;
  const { email } = req.body;

  try {
    const usuarioEncontrado = await knex("usuarios").where({ email }).first();

    if (usuarioEncontrado) {
      return res
        .status(400)
        .json({ mensagem: "Esse e-mail já está cadastrado." });
    }

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
};

const usuarioLogado = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      mensagem: 'Por favor realize o login para acessar esse recurso.'
    })
  }
  const token = authorization.split(' ')[1];

  try {
    const validarToken = jwt.verify(token, process.env.JWT_PASS)

    req.token = token;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem: 'Por favor realize o login novamente para obter um token de acesso válido.'
    })
  }
}

const editar = async (req, res, next) => {
  const token = req.token;
  const { email } = req.body;
  const { id } = jwt.decode(token, process.env.JWT_PASS);

  try {
    const usuarioEncontrado = await knex("usuarios").where({ email }).first();

    if (usuarioEncontrado && usuarioEncontrado.id !== id) {
      return res
        .status(400)
        .json({ mensagem: "Esse e-mail já está cadastrado." });
    }

    next();

  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
};

module.exports = {
  cadastrar,
  usuarioLogado,
  editar
}


const knex = require("../conexao");
const jwt = require('jsonwebtoken');

const loginUsuario = async (req, res) => {
  const { id, nome, email } = req.body

  try {
    const token = jwt.sign({ id }, process.env.JWT_PASS);

    const usuario = {
      id,
      nome,
      email
    };

    return res.status(200).json({ ...usuario, token })
  } catch (error) {
    return res.status(400).json({ mensagem: error.message })
  }
}

module.exports = loginUsuario

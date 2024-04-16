const knex = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = { nome, email, senha: senhaCriptografada };

    const usuarioCadastrado = await knex("usuarios").insert(novoUsuario).returning('*')

    const { senha: _, ...usuarioFormatadoParaExibir } = usuarioCadastrado[0];

    return res.status(201).json(usuarioFormatadoParaExibir);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editar = async (req, res) => {
  const token = req.token;
  const { nome, email, senha } = req.body;
  const { id } = jwt.decode(token, process.env.JWT_PASS);

  try {
    const novaSenha = await bcrypt.hash(senha, 10);

    const usuarioEditado = await knex("usuarios")
      .where({ id })
      .update({
        nome,
        email,
        senha: novaSenha,
      })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(usuarioEditado[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalhar = async (req, res) => {
  const token = req.token;
  const { id } = jwt.decode(token, process.env.JWT_PASS);

  try {
    const usuarioEncontrado = await knex("usuarios").where({ id }).first();

    const { senha: _, ...exibirUsuario } = usuarioEncontrado;

    return res.status(200).json(exibirUsuario);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  cadastrar,
  editar,
  detalhar
};


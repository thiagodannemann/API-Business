const knex = require('../conexao');

const cadastrar = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const novoCliente = {
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    }

    const clienteCadastrado = await knex('clientes').insert(novoCliente).returning('*')

    return res.status(201).json(clienteCadastrado[0])

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const editar = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  const dadosCliente = {
    nome,
    email,
    cpf,
    cep,
    rua,
    numero,
    bairro,
    cidade,
    estado
  }

  try {
    const clienteEditado = await knex('clientes').where({ id }).update(dadosCliente).returning('*')

    return res.status(201).json(clienteEditado[0])

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const listar = async (req, res) => {
  try {
    const clientesCadastrados = await knex('clientes').orderBy('id')

    return res.status(200).json(clientesCadastrados)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const detalhar = async (req, res) => {
  const clienteEncontrado = req.body

  try {
    return res.status(200).json(clienteEncontrado)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {
  cadastrar,
  editar,
  listar,
  detalhar
}


const knex = require("../conexao");

const cadastrar = async (req, res, next) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

  try {
    const emailEncontrado = await knex('clientes').where({ email }).first();

    if (emailEncontrado) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado na base de dados de clientes ." })
    }

    const cpfEncontrado = await knex('clientes').where({ cpf }).first();

    if (cpfEncontrado) {
      return res.status(400).json({ mensagem: "CPF já cadastrado na base de dados de clientes ." })
    }

    next();

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const editar = async (req, res, next) => {
  const { id } = req.params;
  const { email, cpf } = req.body;

  try {
    const clienteEncontradoPeloID = await knex('clientes').where({ id }).first();

    if (!clienteEncontradoPeloID) {
      return res.status(400).json({ mensagem: "O ID não foi encontrado no banco de dados de clientes." })
    }

    const emailEncontrado = await knex('clientes').where({ email }).first();

    if (emailEncontrado && emailEncontrado.id != id) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado na base de dados de clientes ." })
    }

    const cpfEncontrado = await knex('clientes').where({ cpf }).first();

    if (cpfEncontrado && cpfEncontrado.id != id) {
      return res.status(400).json({ mensagem: "CPF já cadastrado na base de dados de clientes." })
    }

    next()

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const detalhar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const clienteEncontrado = await knex('clientes').where({ id }).first()

    if (!clienteEncontrado) {
      return res.status(400).json({ mensagem: "Cliente não existe no banco de dados." })
    }

    req.body = clienteEncontrado;

    next()
  } catch (error) {
    return res.status(500).json(error.message)
  }

}


module.exports = {
  cadastrar,
  editar,
  detalhar
}

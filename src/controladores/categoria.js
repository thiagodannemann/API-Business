const knex = require('../conexao');


const listar = async (req, res) => {
  try {
    const listarCategorias = await knex('categorias').select('*');

    return res.status(200).json(listarCategorias)

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {
  listar
}

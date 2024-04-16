const knex = require("../conexao");

const cadastrar = async (req, res, next) => {
  const { categoria_id } = req.body;

  try {
    const validarCategoria = await knex("categorias")
      .where({ id: categoria_id })
      .first();

    if (!validarCategoria) {
      return res
        .status(404)
        .json({ mensagem: "Categoria informada não foi encontrada." });
    }

    next();

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editar = async (req, res, next) => {
  const { id } = req.params;
  const { categoria_id } = req.body;

  try {
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    if (!produtoEncontrado) {
      return res
        .status(404)
        .json({ mensagem: "Produto não encontrado." })
    }

    const localizarCategoria = await knex('categorias').where({ id: categoria_id }).first()

    if (!localizarCategoria) {
      return res
        .status(404)
        .json({ mensagem: "Categoria do produto não foi localizado pelo ID informado." })
    }

    next()

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalhar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const produtoLocalizado = await knex('produtos').where({ id }).first();

    if (!produtoLocalizado) {
      return res.status(400).json({ mensagem: "Produto não existe com ID informado." })
    }

    req.body = produtoLocalizado

    next()
  } catch (error) {
    return res.status(500).json(error.message)
  }
};

const deletar = async (req, res, next) => {
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    if (!produtoEncontrado) {
      return res.status(400).json({ mensagem: 'Produto não encontrado pelo ID informado' })
    }

    const produtoEncontradoEmPedidos = await knex('pedido_produtos').where({ produto_id: produtoEncontrado.id }).first();

    if (produtoEncontradoEmPedidos) {
      return res.status(400).json({ mensagem: 'Produto não pode ser excluído pois está associado à um pedido realizado.' })
    }

    next()

  } catch (error) {
    return res.status(500).json(error.message)
  }
};

module.exports = {
  cadastrar,
  editar,
  detalhar,
  deletar
};

const knex = require("../conexao");
const { uploadImagemBucket, excluirImagemBucket } = require('../bucket');

const cadastrar = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file: produto_imagem } = req;

  try {
    const categoriaEncontrada = await knex('categorias').where({ id: categoria_id }).first();

    if (produto_imagem) {
      const produtoAdicionado = await knex("produtos").insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
      }).returning('*');

      const produtoID = produtoAdicionado[0].id;

      const imagemInseridaNoBucket = await uploadImagemBucket(produtoID, produto_imagem);

      await knex('produtos').where({
        id: produtoID
      }).update({ produto_imagem: imagemInseridaNoBucket.path })

      const exibirProdutoCadastrado = {
        ...produtoAdicionado[0],
        produto_imagem: imagemInseridaNoBucket.url,
        categoria_nome: categoriaEncontrada.descricao
      }

      return res.status(201).json(exibirProdutoCadastrado);

    } else {
      const novoProduto = { descricao, quantidade_estoque, valor, categoria_id };

      const produtoAdicionado = await knex("produtos").insert(novoProduto).returning('*');

      const exibirProdutoCadastrado = {
        ...produtoAdicionado[0],
        categoria_nome: categoriaEncontrada.descricao,

      }
      return res.status(201).json(exibirProdutoCadastrado);
    }

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const listar = async (req, res) => {

  try {
    const listaDeProdutosDatabase = await knex("produtos");

    const arrayProdutosFormatados = listaDeProdutosDatabase.map((produto) => {
      if (produto.produto_imagem) {
        return {
          ...produto,
          produto_imagem: `${process.env.BUCKET_URL}${produto.produto_imagem}`
        }
      } else {
        return {
          ...produto
        }
      }
    });


    return res.status(200).json(arrayProdutosFormatados);

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editar = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
  const { file: produto_imagem } = req;


  try {
    const categoriaEncontrada = await knex('categorias').where({ id: categoria_id }).first();

    if (produto_imagem) {
      const produtoEncontrado = await knex('produtos').where({ id }).first();

      const imagemNull = produtoEncontrado.produto_imagem == null;

      if (!imagemNull) {
        await excluirImagemBucket(categoriaEncontrada.produto_imagem);
      }
      const imagemInseridaNoBucket = await uploadImagemBucket(id, produto_imagem);

      const produtoEditado = await knex("produtos").where({ id }).update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
        produto_imagem: imagemInseridaNoBucket.path
      }).returning('*');

      const exibirProdutoFormatado = {
        ...produtoEditado[0],
        produto_imagem: imagemInseridaNoBucket.url,
        categoria_nome: categoriaEncontrada.descricao,
      };

      return res.status(201).json(exibirProdutoFormatado);

    }

    const produtoEditado = await knex('produtos').update({
      descricao,
      quantidade_estoque,
      valor,
      categoria_id
    }).where({ id }).returning('*');


    const produtoFomatadoParaExibir = {
      ...produtoEditado[0],
      categoria_nome: categoriaEncontrada.descricao
    }

    return res.status(200).json(produtoFomatadoParaExibir)

  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detalhar = async (req, res) => {
  const { id } = req.params;

  try {
    const listaDeProdutos = await knex("produtos").where({ id }).first();
    const categoriaEncontrada = await knex('categorias').where({ id: listaDeProdutos.categoria_id }).first()

    if (listaDeProdutos.produto_imagem) {
      return res.status(200).json({
        ...listaDeProdutos,
        categoria_nome: categoriaEncontrada.descricao,
        produto_imagem: `${process.env.BUCKET_URL}${listaDeProdutos.produto_imagem}`
      });
    } else {
      return res.status(200).json({
        ...listaDeProdutos,
        categoria_nome: categoriaEncontrada.descricao
      })
    }

  }
  catch (error) {
    return res.status(500).json(error.message)
  }
};

const deletar = async (req, res) => {
  const { id } = req.params;

  try {
    const produtoEncontrado = await knex('produtos').where({ id }).first();

    const imagemNull = produtoEncontrado.produto_imagem === null;

    if (!imagemNull) {
      await excluirImagemBucket(produtoEncontrado.produto_imagem);
    }

    await knex('produtos').where({ id }).del()

    return res.status(204).json()

  } catch (error) {
    return res.status(500).json(error.message)
  }
};

module.exports = {
  cadastrar,
  listar,
  editar,
  detalhar,
  deletar
};

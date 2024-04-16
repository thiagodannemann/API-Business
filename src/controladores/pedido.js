const knex = require("../conexao");
const { transportador, configuracaoEmail } = require('../email');



const cadastrar = async (req, res) => {
  const { cliente_id, observacao, valor_total, pedido_produtos, email } = req.body;

  try {

    const pedidoCadastrado = await knex('pedidos').insert({ cliente_id, observacao, valor_total }).returning('*')

    const arrayDeProdutos = [];

    for (const pedido of pedido_produtos) {
      const produtoEncontado = await knex('produtos').where({ id: pedido.produto_id }).first()

      const { quantidade_produto } = pedido;
      const { id: produto_id } = produtoEncontado;

      const produtoDoPedido = await knex('pedido_produtos').insert({
        pedido_id: pedidoCadastrado[0].id,
        produto_id,
        quantidade_produto,
        valor_produto: produtoEncontado.valor
      }).returning('*');

      const { quantidade_estoque } = produtoEncontado;

      const novoValorEstoque = quantidade_estoque - quantidade_produto;

      await knex('produtos').where({ id: produto_id }).update({ quantidade_estoque: novoValorEstoque })

      const {
        id: $,
        pedido_id: _,
        ...detalhesDoProduto } = produtoDoPedido[0];

      arrayDeProdutos.push({
        ...detalhesDoProduto,
        nome_produto: produtoEncontado.descricao
      });
    }

    transportador.sendMail(configuracaoEmail(email));

    return res.status(201).json({
      ...pedidoCadastrado[0],
      pedido_produtos: arrayDeProdutos
    })

  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const listar = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const pedidosDoClienteEncontrados = await knex('pedidos').where({ cliente_id });

      const arrayPedidosFormatados = [];

      for (pedido of pedidosDoClienteEncontrados) {
        const { id } = pedido;

        const produtosDoPedidoEncontrados = await knex('pedido_produtos').where({ pedido_id: id, })

        const objetoDoPedido = {
          pedido: { ...pedido },
          pedido_produtos: produtosDoPedidoEncontrados
        }
        arrayPedidosFormatados.push(objetoDoPedido)
      }
      return res.status(200).json(arrayPedidosFormatados)
    }

    const pedidosEncontrados = await knex('pedidos').returning('*');

    const arrayPedidosFormatados = [];

    for (pedido of pedidosEncontrados) {
      const { id } = pedido;

      const produtosDoPedidoEncontrados = await knex('pedido_produtos').where({ pedido_id: id, })

      const objetoDoPedido = {
        pedido: { ...pedido },
        pedido_produtos: produtosDoPedidoEncontrados
      }
      arrayPedidosFormatados.push(objetoDoPedido)
    }

    return res.status(200).json(arrayPedidosFormatados)
  }

  catch (error) {
    return res.status(500).json(error.message)
  }
}


module.exports = {
  cadastrar,
  listar
}
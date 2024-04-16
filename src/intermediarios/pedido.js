const knex = require("../conexao");

const cadastrar = async (req, res, next) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  try {
    const clienteEncontrado = await knex('clientes').where({ id: cliente_id }).first();

    if (!clienteEncontrado) {
      return res.status(404).json({
        mensagem: 'Cliente não encontrado.'
      })
    }

    let valor_total = 0;

    for (const pedido of pedido_produtos) {
      const { produto_id, quantidade_produto } = pedido;

      const encontrarProduto = await knex('produtos').where({ id: produto_id }).first()

      if (!encontrarProduto) {
        return res.status(400).json({ mensagem: `Produto com o ID de número ${produto_id} não foi encontrado` })
      }

      const { quantidade_estoque } = encontrarProduto;

      if (quantidade_produto > quantidade_estoque) {
        return res.status(400).json({ mensagem: `Estoque do produto com o ID de número ${produto_id} não é suficiente` })
      }
      const valorTotalDoProduto = quantidade_produto * encontrarProduto.valor;

      valor_total += valorTotalDoProduto;
    }

    req.body = {
      cliente_id,
      observacao,
      valor_total,
      pedido_produtos,
      email: clienteEncontrado.email
    }

    next()

  } catch (error) {
    return res.status(500).json(error.message)
  }

}

const listar = async (req, res, next) => {
  const { cliente_id } = req.query;

  try {
    if (cliente_id) {
      const encontrarCliente = await knex('clientes').where({ id: cliente_id }).first();

      if (!encontrarCliente) {
        return res.status(400).json({ mensagem: "ID do cliente não encontrado" })
      }

      const pedidosDoClienteEncontrados = await knex('pedidos').where({ cliente_id });

      if (!pedidosDoClienteEncontrados) {
        return res.status(400).json({
          mensagem: 'Não há pedidos para o ID informado.'
        })
      }
      next()
    }
    else {
      const pedidosEncontrados = await knex('pedidos').returning('*');

      if (!pedidosEncontrados) {
        return res.status(400).json({
          mensagem: 'Não há pedidos cadastrados no sistema. Por favor cadastre um pedido.'
        })
      }
      next()
    }

  } catch (error) {
    return res.status(500).json(error.message)
  }


}

module.exports = {
  cadastrar,
  listar
}
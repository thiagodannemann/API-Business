const express = require('express');
const rotas = express();

const categorias = require('./controladores/categoria');
const validarUsuario = require('./intermediarios/usuario')
const usuario = require('./controladores/usuario');
const schemaUsuario = require('./validacoes/schemaUsuario');
const { validarCorpoRequisicao } = require('./intermediarios/validarCorpoRequisicao');
const validarEfetuarLogin = require('./intermediarios/login');
const loginUsuario = require('./controladores/login');
const validarProduto = require('./intermediarios/produto');
const produto = require('./controladores/produto');
const schemaProduto = require('./validacoes/schemaProduto');
const validarCliente = require('./intermediarios/cliente');
const cliente = require('./controladores/cliente');
const schemaCliente = require('./validacoes/schemaCliente');
const schemaValidarIDParams = require('./validacoes/schemaValidarIDParams');
const validarPedido = require('./intermediarios/pedido');
const pedido = require('./controladores/pedido');
const schemaPedido = require('./validacoes/schemaPedido')
const multer = require('./multer')

rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario.cadastrar), validarUsuario.cadastrar, usuario.cadastrar);
rotas.get('/categoria', categorias.listar);
rotas.post('/login', validarCorpoRequisicao(schemaUsuario.login), validarEfetuarLogin, loginUsuario)

rotas.use(validarUsuario.usuarioLogado);

rotas.get('/usuario', usuario.detalhar);
rotas.put('/usuario', validarCorpoRequisicao(schemaUsuario.editar), validarUsuario.editar, usuario.editar);

rotas.post('/produto', multer.single('produto_imagem'), validarCorpoRequisicao(schemaProduto.cadastrar, null, schemaProduto.validarImagem), validarProduto.cadastrar, produto.cadastrar);
rotas.put('/produto/:id', multer.single('produto_imagem'), validarCorpoRequisicao(schemaProduto.cadastrar, schemaValidarIDParams, schemaProduto.validarImagem), validarProduto.editar, produto.editar);
rotas.get('/produto', produto.listar);
rotas.get('/produto/:id', validarCorpoRequisicao(null, schemaValidarIDParams), validarProduto.detalhar, produto.detalhar);
rotas.delete('/produto/:id', validarCorpoRequisicao(null, schemaValidarIDParams), validarProduto.deletar, produto.deletar);

rotas.post('/cliente', validarCorpoRequisicao(schemaCliente.cadastrar), validarCliente.cadastrar, cliente.cadastrar);
rotas.put('/cliente/:id', validarCorpoRequisicao(schemaCliente.cadastrar, schemaValidarIDParams), validarCliente.editar, cliente.editar);
rotas.get('/cliente', cliente.listar);
rotas.get('/cliente/:id', validarCorpoRequisicao(null, schemaValidarIDParams), validarCliente.detalhar, cliente.detalhar);

rotas.post('/pedido', validarCorpoRequisicao(schemaPedido.cadastrar), validarPedido.cadastrar, pedido.cadastrar);
rotas.get('/pedido', validarPedido.listar, pedido.listar);

module.exports = rotas

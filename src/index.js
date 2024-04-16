const app = require('./servidor');

const porta = process.env.PORT;

app.listen(porta, () => {
  console.log(`Servidor está rodando na porta ${porta}`);
});
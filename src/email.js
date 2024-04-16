const nodemailer = require('nodemailer')

const transportador = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const configuracaoEmail = (email) => {
  return {
    from: 'suporte@quemnaodev.com',
    to: `${email}`,
    subject: 'Compra aprovada com sucesso!',
    text: 'Sua compra foi realizada com sucesso. Em instantes seus produtos chegam até você!'
  }
}


module.exports = {
  transportador,
  configuracaoEmail
};

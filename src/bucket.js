const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT)

const bucket = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.BUCKET_ID,
    secretAccessKey: process.env.BUCKET_APPKEY
  }
})

const uploadImagemBucket = async (idProduto, arquivoDeImagem) => {
  const foto = await bucket.upload({
    Bucket: process.env.BUCKET_NAME,
    Key: `produtos/${idProduto}/${arquivoDeImagem.originalname}`,
    Body: arquivoDeImagem.buffer,
    ContentType: arquivoDeImagem.mimetype
  }).promise()

  return {
    url: foto.Location,
    path: foto.Key
  }
}

const excluirImagemBucket = async (caminhoProduto) => {
  bucket.deleteObject({
    Bucket: process.env.BUCKET_NAME,
    Key: `${caminhoProduto}`
  })
}

module.exports = {
  bucket,
  uploadImagemBucket,
  excluirImagemBucket
};
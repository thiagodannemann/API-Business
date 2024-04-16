const validarCorpoRequisicao = (schemaBody = null, schemaParams = null, schemaImagem = null) => async (req, res, next) => {
    try {
        if (schemaParams) {
            await schemaParams.validateAsync(req.params);
        }

        if (schemaBody)
            await schemaBody.validateAsync(req.body);

        if (schemaImagem) {
            await schemaImagem.validateAsync(req.file);
        }

        next()
    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = { validarCorpoRequisicao }

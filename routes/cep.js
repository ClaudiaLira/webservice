const axios = require('axios');
var express = require('express');
var router = express.Router();
const VIACEP_URI = 'https://viacep.com.br';

function isValid(cepNumbers) {
    if (cepNumbers != "") {
        var validaCep = /^[0-9]{8}$/;
        return validaCep.test(cepNumbers);
    } else {
        return false;
    }
}

router.get('/:cep', function (req, res, next) {
    let cep = req.params.cep;
    console.log(cep);
    let cepNumbers = cep ? cep.replace(/\D/g, '') : '';
    console.log(cepNumbers);
    if (isValid(cepNumbers)) {
        axios.get(`${VIACEP_URI}/ws/${cepNumbers}/json`)
            .then((response) => {
                console.log(response);
                if(response.data && response.data.erro){
                    res.status(400).send("Cep Inexistente.");
                } else {
                    res.status(200).send(response.data);
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Erro na api de buscar cep.");
            })
    } else {
        res.status(400).send("Cep Inválido.");
    }
})

module.exports = router;
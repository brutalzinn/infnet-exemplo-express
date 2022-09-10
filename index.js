const express = require('express')
const fs = require('fs');
const app = express()
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
//teste
const data = [
    //0
    {
        "titulo": "Ir na farmárcia",
        "criadoEm": "2022-08-15T22:29:09.662Z",
        "terminado": false,
        "id": "e0f91f88-512e-4723-ad11-4e40db68cbbb"
    },
    //1
    {
        "titulo": "Ir no mercado",
        "criadoEm": "2022-08-15T22:29:09.662Z",
        "terminado": false,
        "id": "00594f6a-d927-471a-865c-97cc81968c82"
    },
    //2
    {
        "titulo": "Comprar queijo",
        "criadoEm": "2022-08-15T22:29:09.662Z",
        "terminado": false,
        "id": "2896e7f3-99e8-4543-be49-7e7a50cf20d9"
    },
    //3
    {
        "titulo": "Assistir programação dinâmica no youtube",
        "criadoEm": "2022-08-15T22:29:09.662Z",
        "terminado": false,
        "id": "ce54012b-af0d-478c-b92d-ffe138b0b35b"
    }
]


app.get('/', function (req, res) {
    res.send("Olá mundo, olá Dokku e adeus Heroku!!!. " + new Date().toLocaleString())
  })

app.get('/lista', function (req, res) {
  res.send(data)
})

app.post('/adicionar', function (req, res) {
    const body = req.body
    body['id'] = uuidv4()
    data.push(body)
    
    res.send("Nota adicionada com sucesso.")
})

app.get('/obter/:id', function(req, res){
    const { id } = req.params
    let nota = data.find(f => f.id == id)
    res.send(nota)
})

app.put('/atualizar/:id', function (req, res) {

    const body = req.body
    const { id } = req.params
    let notaIndex = data.findIndex(f => f.id == id)

    data[notaIndex] = {...data[notaIndex], ...body}
    res.send("OK")
})

app.delete('/deletar/:id', function (req, res) {
    const { id } = req.params
    let notaIndex = data.findIndex(f => f.id == id)
    
    data.splice(notaIndex)
    
    res.send("OK")
})

app.listen(process.env.PORT || 5555)
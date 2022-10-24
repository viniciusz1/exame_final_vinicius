const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

let listaUsuarios = [{
    usuario: 'admin',
    senha: '1234'
}]

app.use(express.json())

app.listen(port,()=>{
    console.log(`App listen on http://localhost: ${port}`);
})

app.post('/usuario', async (req, res) => {
    if(!req.body.usuario || !req.body.senha){
        res.send("Informe 'usuario' e 'senha'!")
    }
    listaUsuarios.push({'usuario': req.body.usuario,
    'senha': req.body.senha})
    res.send('Usuário cadastrado com sucesso!')
})

app.get('/usuario', async (req, res) => {
    res.send(listaUsuarios)
})

app.post('/login', async (req, res) => {
    if(!req.body.usuario || !req.body.senha){
        res.send("Informe 'usuario' e 'senha'!")
    }
    let usuario = listaUsuarios.find(usuario => usuario.usuario == req.body.usuario)
    
    console.log(usuario)
    if(usuario){
        if(usuario.senha == req.body.senha){
            res.send('Login efetuado com sucesso!')
        }
        res.status(400).send('Usuário ou senha inválidos')
       
    }
    res.status(400).send('Usuário ou senha inválidos')
})
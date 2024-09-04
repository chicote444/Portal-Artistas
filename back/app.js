import express from 'express'
import cors from 'cors'
import { eventos, patrocinios } from './dados.js'



const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/eventos', (req, res) => {
    res.json(eventos);
});

app.get('/patrocinios', (req, res) => {
    res.json(patrocinios);
});

app.listen(3000, () => console.log ('Servidor rodando na porta 3000!'));
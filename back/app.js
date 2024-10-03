import express from 'express'
import cors from 'cors'
//import { eventos, patrocinios } from './dados.js'
import { exibirEvent, exibirEditais, exibirInscricoesEventos, exibirInscricoesEditais } from './models/eventos.js'
import  speakeasy  from 'speakeasy';
import qrcode from 'qrcode';

class HTTPError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/generate-secret', (req, res) => {
  try {
    const secret = speakeasy.generateSecret({ length: 20 });
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      res.json({ secret: secret.base32, qr_code: data_url });
    });
  } catch (error) {
    throw new HTTPError('Erro ao gerar secret', 400);
  }
  });
  
  app.post('/verify-token', (req, res) => {
    try {
    const { token, secret } = req.body;
    console.log(`Token recebido: ${token}`);
    console.log(`Secret recebido: ${secret}`);
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    });
    res.json({ verified });
    } catch (error) {
    throw new HTTPError('Erro ao verificar token', 400);
    }
  });

app.get('/eventos', async (req, res) => {
    let events;
    events = await exibirEvent();
    res.json(events);
});

app.get('/inscricoes-eventos', async (req, res) => {
    let inscricoes;
    inscricoes = await exibirInscricoesEventos();
    res.json(inscricoes);
});

app.get('/inscricoes-editais', async (req, res) => {
    let inscricoes;
    inscricoes = await exibirInscricoesEditais();
    res.json(inscricoes);
});

app.get('/editais', async (req, res) => {
    let editais;
    editais = await exibirEditais();
    res.json(editais);
});


// Middleware para tratamento de rotas não encontradas
app.use((req, res, next) => {
  return res.status(404).json({ message: 'Content not found!' });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  // console.error(err.stack);
  if (err instanceof HTTPError) {
    return res.status(err.code).json({ message: err.message });
  } else {
    return res.status(500).json({ message: 'Something broke!' });
  }
});

app.listen(3000, () => console.log ('Servidor rodando na porta 3000!'));
import express from 'express'
import cors from 'cors'
//import { eventos, patrocinios } from './dados.js'
import { exibirEvent } from './models/eventos.js'
import  speakeasy  from 'speakeasy';
import qrcode from 'qrcode';



const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/generate-secret', (req, res) => {
    const secret = speakeasy.generateSecret({ length: 20 });
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
      res.json({ secret: secret.base32, qr_code: data_url });
    });
  });
  
  app.post('/verify-token', (req, res) => {
    const { token, secret } = req.body;
    const verified = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token
    });
    res.json({ verified });
  });

app.get('/eventos', async (req, res) => {
    let events;
    events = await exibirEvent();
    res.json(events);
});

app.get('/patrocinios', (req, res) => {
    res.json(patrocinios);
});

app.listen(3000, () => console.log ('Servidor rodando na porta 3000!'));
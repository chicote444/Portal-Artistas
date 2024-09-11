const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configuração do Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do Banco de Dados
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Sua senha do MySQL
    database: 'portal_dos_artistas'
});

// Função para criar uma conexão com o banco de dados
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

// Rota para Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);

        if (user && await bcrypt.compare(password, user.password)) {
            if (!user.is_verified) {
                return res.status(400).json({ message: 'Account not verified' });
            }
            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Rota para Registro
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        // Configurar e-mail de verificação
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password'
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Verify your email',
            text: 'Please verify your email to complete registration'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(201).json({ message: 'User registered, please verify your email' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Rota para Redefinição de Senha
app.post('/reset_password', async (req, res) => {
    const { email } = req.body;

    try {
        const [user] = await query('SELECT * FROM users WHERE email = ?', [email]);

        if (user) {
            const resetToken = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            const expiration = new Date(Date.now() + 3600000); // 1 hora

            await query('UPDATE users SET reset_token = ?, reset_token_expiration = ? WHERE email = ?', [resetToken, expiration, email]);

            // Configurar e-mail de redefinição
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'your_email@gmail.com',
                    pass: 'your_email_password'
                }
            });

            const mailOptions = {
                from: 'your_email@gmail.com',
                to: email,
                subject: 'Password Reset',
                text: `Click the following link to reset your password: http://localhost:${port}/reset_password/${resetToken}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Error sending email' });
                }
                res.json({ message: 'Password reset email sent' });
            });
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Rota para Atualizar Senha
app.post('/update_password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiration = NULL WHERE id = ?', [hashedPassword, decoded.id]);

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

// Iniciar o Servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

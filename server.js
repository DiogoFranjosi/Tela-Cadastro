const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Configuração de conexão com o SQL Server
const sqlConfig = {
    user: 'usuario_web',        
    password: 'senha123',       
    database: 'CadastroDB',     
    server: 'localhost',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// Rota para receber os dados do formulário
app.post('/cadastrar', async (req, res) => {
    const { nome, email, telefone, senha } = req.body;

    try {
        const pool = await sql.connect(sqlConfig); // <- isso estava faltando
        await pool.request()
            .input('nome', sql.VarChar, nome)
            .input('email', sql.VarChar, email)
            .input('telefone', sql.VarChar, telefone)
            .input('senha', sql.VarChar, senha)
            .query(`
                INSERT INTO usuarios (nome, email, telefone, senha)
                VALUES (@nome, @email, @telefone, @senha)
            `);

        res.status(200).send('Usuário cadastrado com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir no banco:', err);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

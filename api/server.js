const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Conexão SQLite
const db = new sqlite3.Database('./pedidos.db', (err) => {
    if (err) console.error('Erro no banco:', err.message);
    else console.log('Conectado ao banco SQLite.');
});

// Cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_aluno TEXT,
    nome_responsavel TEXT,
    whatsapp TEXT,
    cpf TEXT,
    professor_local TEXT,
    tamanho_camisa_adulto TEXT,
    tamanho_camisa_infantil TEXT,
    pago INTEGER DEFAULT 0,
    enviado INTEGER DEFAULT 0
)`);

// API POST - cadastrar pedido
app.post('/api/pedidos', (req, res) => {
    const { nome_aluno, nome_responsavel, whatsapp, cpf, professor_local, tamanho_camisa_adulto, tamanho_camisa_infantil, pago } = req.body;
    db.run(
        `INSERT INTO pedidos (nome_aluno, nome_responsavel, whatsapp, cpf, professor_local, tamanho_camisa_adulto, tamanho_camisa_infantil, pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nome_aluno, nome_responsavel, whatsapp, cpf, professor_local, tamanho_camisa_adulto, tamanho_camisa_infantil, pago ? 1 : 0],
        function(err) {
            if (err) res.status(500).json({ error: err.message });
            else res.json({ id: this.lastID, message: 'Pedido cadastrado com sucesso!' });
        }
    );
});

// API GET - listar pedidos
app.get('/api/pedidos', (req, res) => {
    db.all('SELECT * FROM pedidos', [], (err, rows) => {
        if (err) res.status(500).json({ error: err.message });
        else res.json(rows);
    });
});

// API PUT - marcar como enviado
app.put('/api/pedidos/:id/enviado', (req, res) => {
    const { id } = req.params;
    const { enviado } = req.body;
    db.run(`UPDATE pedidos SET enviado = ? WHERE id = ?`, [enviado ? 1 : 0, id], function(err) {
        if (err) res.status(500).json({ error: err.message });
        else res.json({ success: true, message: "Pedido atualizado com sucesso." });
    });
});

// Inicia servidor
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor rodando em http://127.0.0.1:${PORT}`));


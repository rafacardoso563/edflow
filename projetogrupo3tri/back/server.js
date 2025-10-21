// Importar pacotes para a aplicação
const express = require('express');
const cors = require('cors');
const connection = require('./dbd_config');
// Definir a porta do express e instanciar o express
const porta = 3306;
const app = express();
// Habilitar o cors e utilização de JSON
app.use(cors());
app.use(express.json())
// Testar API
app.listen(porta, () => console.log(`Rodando na porta ${porta}`));
// Importar a conexão com o banco



// login

app.post('/logar', (request, response) => {
    const { name, email, senha } = request.body;
    const query = "SELECT * FROM usuarios WHERE name = ? email = ? AND senha = ?";

    connection.query(query, [name, email, senha], (err, results) => {
        if (err) {
            return response.status(500).json({ success: false, message: "Erro no servidor", error: err });
        }

        if (results.length > 0) {
            response.status(200).json({
                success: true,
                message: "Login bem-sucedido",
                data: results[0]
            });
        } else {
            response.status(401).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }
    });
});





// CADASTRAR TURMA
app.post('/cadastroTurma', (request, response) => {
    const params = [
        request.body.turmanome,  // nome da turma vindo do front
        request.body.anoletivo   // ano letivo vindo do front
    ];

    // usa os nomes corretos da tabela
    const query = "INSERT INTO turmas (nome, ano_letivo) VALUES (?, ?)";

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: err.message,
                data: err
            });
        }
        response.status(201).json({
            success: true,
            message: "Turma inserida com sucesso",
            data: results
        });
    });
});

// LISTAR TURMAS
app.get('/listarTurmas', (request, response) => {
    const query = "SELECT * FROM turmas";
    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({
                success: false,
                message: err.message
            });
        }
        response.status(200).json({
            success: true,
            message: "Sucesso",
            data: results
        });
    });
});


// Cadastro do boletim
app.post('/cadastroBoletim', (req, res) => {
  const { id_aluno, id_turma, nota1, nota2, nota3 } = req.body;

  const media = ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) / 3).toFixed(2);

  const sql = `
    INSERT INTO notas (id_aluno, id_turma, nota1, nota2, nota3, media_final)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [id_aluno, id_turma, nota1, nota2, nota3, media];

  connection.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, data: result });
  });
});

// Listagem de boletins
app.get('/listarBoletins', (req, res) => {
  connection.query('SELECT * FROM notas', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});


// Cadastrar aluno
app.post('/cadastroAluno', (req, res) => {
  const { id_usuario, data_nasc, responsavel } = req.body;

  const sql = `
    INSERT INTO alunos (id_usuario, data_nasc, responsavel)
    VALUES (?, ?, ?)
  `;
  const params = [id_usuario, data_nasc, responsavel];

  connection.query(sql, params, (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, data: result });
  });
});

// Listar alunos
app.get('/listarAlunos', (req, res) => {
  connection.query('SELECT * FROM alunos', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});


// Cadastro de professor
app.post('/cadastroProfessor', (req, res) => {
  const { id_usuario } = req.body;

  const sql = 'INSERT INTO professores (id_usuario) VALUES (?)';
  connection.query(sql, [id_usuario], (err, result) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(201).json({ success: true, data: result });
  });
});

// Listagem de professores
app.get('/listarProfessores', (req, res) => {
  connection.query('SELECT * FROM professores', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: results });
  });
});


// Buscar todas as turmas
app.get('/turmas', (req, res) => {
  connection.query('SELECT * FROM turmas', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
});

// Buscar alunos de uma turma específica
app.get('/turma/:id_turma/alunos', (req, res) => {
  const { id_turma } = req.params;
  const sql = `
    SELECT a.id_aluno, u.nome 
    FROM alunos a
    JOIN usuarios u ON a.id_usuario = u.id_usuario
    JOIN matricula m ON m.id_aluno = a.id_aluno
    WHERE m.id_turma = ?
  `;
  connection.query(sql, [id_turma], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
});

// Buscar notas de um aluno
app.get('/aluno/:id_aluno/notas', (req, res) => {
  const { id_aluno } = req.params;
  const sql = `
    SELECT * FROM notas
    WHERE id_aluno = ?
  `;
  connection.query(sql, [id_aluno], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
});
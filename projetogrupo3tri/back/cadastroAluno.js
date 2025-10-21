document.getElementById('formAluno').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    id_usuario:  document.getElementById('id_usuario').value,
    data_nasc:   document.getElementById('data_nasc').value,
    responsavel: document.getElementById('responsavel').value
  };

  try {
    const res = await fetch('http://localhost:3500/cadastroAluno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (json.success) {
      alert('Aluno cadastrado com sucesso!');
      carregarAlunos();
      e.target.reset();
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    console.error(err);
    alert('Falha na requisição.');
  }
});

async function carregarAlunos() {
  try {
    const res = await fetch('http://localhost:3500/listarAlunos');
    const json = await res.json();
    const container = document.getElementById('listaAlunos');
    container.innerHTML = '';

    if (json.success) {
      json.data.forEach(a => {
        const linha = document.createElement('div');
        linha.style.display = 'flex';
        linha.style.justifyContent = 'space-around';

        linha.innerHTML = `
          <p>${a.id_aluno}</p>
          <p>${a.id_usuario ?? ''}</p>
          <p>${new Date(a.data_nasc).toLocaleDateString('pt-BR')}</p>
          <p>${a.responsavel}</p>
        `;
        container.appendChild(linha);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

carregarAlunos();
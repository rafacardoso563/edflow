document.getElementById('formProfessor').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    id_usuario: document.getElementById('id_usuario').value
  };

  try {
    const res = await fetch('http://localhost:3500/cadastroProfessor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (json.success) {
      alert('Professor cadastrado com sucesso!');
      carregarProfessores();
      e.target.reset();
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    console.error(err);
    alert('Falha na requisição.');
  }
});

async function carregarProfessores() {
  try {
    const res = await fetch('http://localhost:3500/listarProfessores');
    const json = await res.json();
    const container = document.getElementById('listaProfessores');
    container.innerHTML = '';

    if (json.success) {
      json.data.forEach(p => {
        const linha = document.createElement('div');
        linha.style.display = 'flex';
        linha.style.justifyContent = 'space-around';

        linha.innerHTML = `
          <p>${p.id_professor}</p>
          <p>${p.id_usuario ?? ''}</p>
        `;
        container.appendChild(linha);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

// Carregar lista assim que a página abrir
carregarProfessores();

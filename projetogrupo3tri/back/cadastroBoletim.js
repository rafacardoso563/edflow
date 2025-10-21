// Enviar cadastro
document.getElementById('formBoletim').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    id_aluno:  document.getElementById('id_aluno').value,
    id_turma:  document.getElementById('id_turma').value,
    nota1:     document.getElementById('nota1').value,
    nota2:     document.getElementById('nota2').value,
    nota3:     document.getElementById('nota3').value
  };

  try {
    const res = await fetch('http://localhost:3500/cadastroBoletim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (json.success) {
      alert('Boletim cadastrado!');
      carregarNotas();
      e.target.reset();
    } else {
      alert('Erro: ' + json.message);
    }
  } catch (err) {
    console.error(err);
    alert('Falha na requisição.');
  }
});

// Listar boletins ao abrir
async function carregarNotas() {
  try {
    const res = await fetch('http://localhost:3500/listarBoletins');
    const json = await res.json();
    const container = document.getElementById('listaNotas');
    container.innerHTML = '';

    if (json.success) {
      json.data.forEach(n => {
        const linha = document.createElement('div');
        linha.className = 'linha-nota'; // usa css default (p e div1)
        linha.style.display = 'flex';
        linha.style.justifyContent = 'space-around';

        linha.innerHTML = `
          <p>${n.id_nota}</p>
          <p>${n.nota1}</p>
          <p>${n.nota2}</p>
          <p>${n.nota3}</p>
          <p>${n.media_final}</p>
        `;
        container.appendChild(linha);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

carregarNotas();
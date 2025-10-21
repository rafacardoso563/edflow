// back/boletimAluno.js
// Mostra as notas do aluno selecionado.

async function carregarNotas() {
  const params = new URLSearchParams(window.location.search);
  const id_aluno = params.get('id_aluno');

  try {
    const res = await fetch(`http://localhost:3500/aluno/${id_aluno}/notas`);
    const json = await res.json();

    const container = document.querySelector('#container .div-flex');
    container.innerHTML = `
      <h2 style="color: #f6958b;">Notas</h2>
      <div id="div1">
        <p>ID</p>
        <p>Nota 1</p>
        <p>Nota 2</p>
        <p>Nota 3</p>
        <p>Média Final</p>
      </div>
    `;

    json.data.forEach(nota => {
      const div = document.createElement('div');
      div.id = 'div1';
      div.innerHTML = `
        <p>${nota.id_nota}</p>
        <p>${nota.nota1 ?? '-'}</p>
        <p>${nota.nota2 ?? '-'}</p>
        <p>${nota.nota3 ?? '-'}</p>
        <p>${nota.media_final ?? '-'}</p>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar notas:', err);
  }
}

document.addEventListener('DOMContentLoaded', carregarNotas);
// back/todasTurmas.js
// Carrega todas as turmas e torna cada uma clicável para abrir turmaAberta.html

async function carregarTurmas() {
  try {
    const res = await fetch('http://localhost:3500/turmas');
    const json = await res.json();

    const container = document.querySelector('#container2');
    container.innerHTML = '<h2>Turmas</h2>'; // Limpa antes de recriar

    json.data.forEach(turma => {
      const div = document.createElement('div');
      div.classList.add('div-flex');
      div.innerHTML = `
        <p>${turma.nome}</p>
        <img class="flecha" src="/assets/Expand Arrow.png" alt="">
      `;
      div.addEventListener('click', () => {
        window.location.href = `turmaAberta.html?id_turma=${turma.id_turma}`;
      });
      container.appendChild(div);
    });
  } catch (err) {
    console.error('Erro ao carregar turmas:', err);
  }
}

document.addEventListener('DOMContentLoaded', carregarTurmas);

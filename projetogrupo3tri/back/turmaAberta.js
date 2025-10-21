// back/turmaAberta.js
// Carrega os alunos de uma turma específica e permite clicar em cada um
// para abrir o boletim individual.

async function carregarAlunos() {
  const params = new URLSearchParams(window.location.search);
  const id_turma = params.get('id_turma');

  try {
    const res = await fetch(`http://localhost:3500/turma/${id_turma}/alunos`);
    const json = await res.json();

    const container = document.querySelector('.div-flex-coluna');
    container.innerHTML = ''; // Limpa antes de inserir

    json.data.forEach(aluno => {
      const p = document.createElement('p');
      p.textContent = aluno.nome;
      p.style.cursor = 'pointer';
      p.addEventListener('click', () => {
        window.location.href = `cadastroBoletim.html?id_aluno=${aluno.id_aluno}`;
      });
      container.appendChild(p);
    });
  } catch (err) {
    console.error('Erro ao carregar alunos:', err);
  }
}

document.addEventListener('DOMContentLoaded', carregarAlunos);

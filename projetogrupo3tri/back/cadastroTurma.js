// Cadastrar turma
async function cadastroTurma() {
    const turmanome = document.getElementById('turmanome').value.trim();
    const anoletivo = document.getElementById('anoletivo').value.trim();

    if (!turmanome || !anoletivo) {
        alert("Preencha todos os campos");
        return;
    }

    const data = { turmanome, anoletivo };

    try {
        const response = await fetch('http://localhost:3500/cadastroTurma', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const results = await response.json();

        if (results.success) {
            alert("Turma cadastrada com sucesso!");
            document.getElementById('formTurma').reset();
            listarTurmas(); // atualiza a lista sem recarregar
        } else {
            alert("Erro: " + results.message);
        }
    } catch (error) {
        console.error(error);
        alert("Falha na comunicação com o servidor.");
    }
}

// Listar turmas já cadastradas
async function listarTurmas() {
    try {
        const resp = await fetch('http://localhost:3500/listarTurmas');
        const json = await resp.json();

        if (json.success) {
            const container = document.getElementById('tabelaTurmas');
            container.innerHTML = ''; // limpa antes de recriar

            json.data.forEach(turma => {
                container.innerHTML += `
                    <div id="div1">
                        <p>${turma.id_turma}</p>
                        <p>${turma.nome}</p>
                        <p>${turma.ano_letivo}</p>
                    </div>
                `;
            });
        } else {
            console.error(json.message);
        }
    } catch (err) {
        console.error(err);
    }
}


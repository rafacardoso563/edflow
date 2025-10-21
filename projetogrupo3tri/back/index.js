async function logar() {
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const data = { name, email, senha };
    // console.log(data);

    try {
        const response = await fetch('http://localhost:3500/logar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        let results = await response.json();
        
        if (results.success) {
            
            
            
            let html = document.getElementById('informacoes');
           localStorage.setItem('informacoes', JSON.stringify(results));
           let dados = JSON.parse(localStorage.getItem('informacoes'));
            let perfil = dados.perfil;
            //não sei como redireciona pro lugar certo ainda
            window.location.href = ".html"
          
        } else {
            alert(results.message);
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao se conectar ao servidor.");
    }
}

let plantas = JSON.parse(localStorage.getItem("plantas")) || [];

// Salva no navegador
function salvar() {
    localStorage.setItem("plantas", JSON.stringify(plantas));
}

// Adiciona planta nova
function adicionarPlanta() {
    const nome = document.getElementById("nomePlanta").value.trim();
    const dias = document.getElementById("diasRegar").value.trim();

    if (nome === "" || dias === "" || isNaN(dias) || dias <= 0) {
        alert("Preencha corretamente o nome e os dias de rega!");
        return;
    }

    const hoje = new Date().toISOString().split("T")[0];

    plantas.push({
        nome: nome,
        dias: parseInt(dias),
        ultimaRegada: hoje
    });

    salvar();
    mostrarPlantas();
    document.getElementById("nomePlanta").value = "";
    document.getElementById("diasRegar").value = "";
}

// Verifica se a planta precisa regar
function precisaRegar(planta) {
    const hoje = new Date();
    const ultima = new Date(planta.ultimaRegada);
    const diff = Math.floor((hoje - ultima) / (1000 * 60 * 60 * 24));
    return diff >= planta.dias;
}

// Regar planta
function regar(index) {
    plantas[index].ultimaRegada = new Date().toISOString().split("T")[0];
    salvar();
    mostrarPlantas();
    alert(`💧 Você regou a planta "${plantas[index].nome}"!`);
}

// Mostrar todas as plantas
function mostrarPlantas() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (plantas.length === 0) {
        lista.innerHTML = "<p>Nenhuma planta cadastrada ainda.</p>";
        return;
    }

    plantas.forEach((planta, i) => {
        const div = document.createElement("div");
        div.classList.add("planta");

        if (precisaRegar(planta)) {
            div.classList.add("alerta");
        } else {
            div.classList.add("ok");
        }

        // Calcula dias restantes para rega
        const hoje = new Date();
        const ultima = new Date(planta.ultimaRegada);
        const diff = Math.floor((hoje - ultima) / (1000 * 60 * 60 * 24));
        const diasRestantes = planta.dias - diff;
        const aviso = diasRestantes <= 0 ? "Regar agora!" : `Faltam ${diasRestantes} dias`;

        div.innerHTML = `
            <div>
                <strong>${planta.nome}</strong><br>
                Intervalo de rega: ${planta.dias} dias<br>
                <em>${aviso}</em>
            </div>
            <button onclick="regar(${i})">💧 Regar</button>
        `;

        lista.appendChild(div);
    });
}

// Inicializa
mostrarPlantas();
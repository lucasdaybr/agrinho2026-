let plantas = JSON.parse(localStorage.getItem("plantas")) || [];

function salvar(){
    localStorage.setItem("plantas", JSON.stringify(plantas));
}

function adicionarPlanta(){
    const nome = document.getElementById("nomePlanta").value;
    const dias = document.getElementById("diasRegar").value;

    if(nome === "" || dias === ""){
        alert("Preencha todos os campos!");
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

function precisaRegar(planta){
    const hoje = new Date();
    const ultima = new Date(planta.ultimaRegada);

    const diff = Math.floor((hoje - ultima) / (1000 * 60 * 60 * 24));

    return diff >= planta.dias;
}

function regar(index){
    plantas[index].ultimaRegada = new Date().toISOString().split("T")[0];
    salvar();
    mostrarPlantas();
}

function mostrarPlantas(){
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    plantas.forEach((p, i) => {
        const div = document.createElement("div");
        div.classList.add("planta");

        if(precisaRegar(p)){
            div.classList.add("alerta");
        } else {
            div.classList.add("ok");
        }

        div.innerHTML = `
            <div>
                <strong>${p.nome}</strong><br>
                Regar a cada ${p.dias} dias
            </div>
            <button onclick="regar(${i})">💧 Regar</button>
        `;

        lista.appendChild(div);
    });
}

mostrarPlantas();
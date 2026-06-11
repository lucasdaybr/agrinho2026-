const perguntas = [
{
    pergunta: "Qual prática ajuda a conservar o solo?",
    respostas: [
        "Desmatamento",
        "Rotação de culturas",
        "Queimadas"
    ],
    correta: 1
},
{
    pergunta: "Qual fonte de energia é sustentável no campo?",
    respostas: [
        "Carvão",
        "Diesel",
        "Energia solar"
    ],
    correta: 2
},
{
    pergunta: "Por que economizar água na agricultura é importante?",
    respostas: [
        "Para preservar recursos naturais",
        "Para gastar mais",
        "Não faz diferença"
    ],
    correta: 0
},
{
    pergunta: "O que ajuda a proteger a biodiversidade?",
    respostas: [
        "Desmatamento",
        "Preservação de áreas verdes",
        "Poluição dos rios"
    ],
    correta: 1
}
];

let indice = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const proximaBtn = document.getElementById("proxima");

function carregarPergunta() {
    respostasEl.innerHTML = "";

    perguntaEl.textContent = perguntas[indice].pergunta;

    perguntas[indice].respostas.forEach((resp, i) => {
        const botao = document.createElement("button");
        botao.textContent = resp;
        botao.classList.add("resposta");

        botao.onclick = () => verificarResposta(i);

        respostasEl.appendChild(botao);
    });
}

function verificarResposta(escolha) {
    const botoes = document.querySelectorAll(".resposta");

    botoes.forEach(btn => btn.disabled = true);

    if (escolha === perguntas[indice].correta) {
        pontos++;
        botoes[escolha].style.background = "#81C784";
    } else {
        botoes[escolha].style.background = "#E57373";
        botoes[perguntas[indice].correta].style.background = "#81C784";
    }
}

proximaBtn.addEventListener("click", () => {
    indice++;

    if (indice < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById("quiz").classList.add("oculto");
        document.getElementById("resultado").classList.remove("oculto");
        document.getElementById("pontuacao").textContent =
            `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    }
});

carregarPergunta();
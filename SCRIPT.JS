const perguntas = [
{
    pergunta: "Qual prática ajuda a conservar o solo?",
    respostas: [
        "Desmatamento",
        "Rotação de culturas",
        "Queimadas"
    ],
    correta: 1,
    explicacao: "A rotação de culturas ajuda a manter os nutrientes do solo e reduz pragas."
},
{
    pergunta: "Qual fonte de energia é sustentável no campo?",
    respostas: [
        "Carvão",
        "Diesel",
        "Energia solar"
    ],
    correta: 2,
    explicacao: "A energia solar é limpa, renovável e reduz a emissão de poluentes."
},
{
    pergunta: "Por que economizar água na agricultura é importante?",
    respostas: [
        "Para preservar recursos naturais",
        "Para gastar mais",
        "Não faz diferença"
    ],
    correta: 0,
    explicacao: "A água é um recurso essencial para a vida e deve ser usada de forma consciente."
},
{
    pergunta: "O que ajuda a proteger a biodiversidade?",
    respostas: [
        "Desmatamento",
        "Preservação de áreas verdes",
        "Poluição dos rios"
    ],
    correta: 1,
    explicacao: "Áreas verdes preservadas ajudam a proteger plantas, animais e ecossistemas."
}
];

let indice = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const proximaBtn = document.getElementById("proxima");

const explicacaoEl = document.createElement("p");
explicacaoEl.style.marginTop = "15px";
explicacaoEl.style.fontWeight = "bold";
explicacaoEl.style.color = "#2E7D32";

document.getElementById("quiz").appendChild(explicacaoEl);

function carregarPergunta() {
    respostasEl.innerHTML = "";
    explicacaoEl.textContent = "";

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
        explicacaoEl.textContent =
            "✅ Correto! " + perguntas[indice].explicacao;
    } else {
        botoes[escolha].style.background = "#E57373";
        botoes[perguntas[indice].correta].style.background = "#81C784";

        explicacaoEl.textContent =
            "❌ Resposta incorreta. " + perguntas[indice].explicacao;
    }
}

proximaBtn.addEventListener("click", () => {
    indice++;

    if (indice < perguntas.length) {
        carregarPergunta();
    } else {
        document.getElementById("quiz").classList.add("oculto");
        document.getElementById("resultado").classList.remove("oculto");

        let medalha = "🌱";

        if (pontos === perguntas.length) {
            medalha = "🏆";
        } else if (pontos >= 3) {
            medalha = "🥇";
        } else if (pontos >= 2) {
            medalha = "🥈";
        }

        document.getElementById("pontuacao").innerHTML =
            `${medalha}<br><br>Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    }
});

carregarPergunta();
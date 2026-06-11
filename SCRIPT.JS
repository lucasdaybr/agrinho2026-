const perguntas = [
    {
        pergunta: "Qual prática ajuda a conservar o solo?",
        respostas: ["Desmatamento", "Rotação de culturas", "Queimadas"],
        correta: 1,
        explicacao: "A rotação de culturas mantém os nutrientes do solo e reduz pragas.",
        imagem: "imagens/solo.jpg"
    },
    {
        pergunta: "Qual fonte de energia é sustentável no campo?",
        respostas: ["Carvão", "Diesel", "Energia solar"],
        correta: 2,
        explicacao: "A energia solar é limpa, renovável e não polui.",
        imagem: "imagens/solar.jpg"
    },
    {
        pergunta: "Por que economizar água na agricultura é importante?",
        respostas: ["Para preservar recursos naturais", "Para gastar mais", "Não faz diferença"],
        correta: 0,
        explicacao: "A água é essencial e precisa ser usada de forma consciente.",
        imagem: "imagens/agua.jpg"
    },
    {
        pergunta: "O que ajuda a proteger a biodiversidade?",
        respostas: ["Desmatamento", "Preservação de áreas verdes", "Poluição dos rios"],
        correta: 1,
        explicacao: "Áreas verdes preservadas protegem plantas, animais e ecossistemas.",
        imagem: "imagens/biodiversidade.jpg"
    }
];

let indice = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const proximaBtn = document.getElementById("proxima");
const explicacaoEl = document.getElementById("explicacao");
const progressoEl = document.getElementById("progresso");
const imagemEl = document.getElementById("imagem-pergunta");
const mascoteEl = document.getElementById("imagem-mascote");

function carregarPergunta(){
    respostasEl.innerHTML = "";
    explicacaoEl.textContent = "";
    perguntaEl.textContent = perguntas[indice].pergunta;

    // Imagem da pergunta
    if(perguntas[indice].imagem){
        imagemEl.src = perguntas[indice].imagem;
        imagemEl.classList.remove("oculto");
    } else{
        imagemEl.classList.add("oculto");
    }

    perguntas[indice].respostas.forEach((resp,i)=>{
        const botao = document.createElement("button");
        botao.textContent = resp;
        botao.classList.add("resposta");
        botao.onclick = ()=> verificarResposta(i, botao);
        respostasEl.appendChild(botao);
    });

    // Atualiza barra de progresso
    progressoEl.style.width = (indice / perguntas.length) * 100 + "%";
}

function verificarResposta(escolha, botao){
    const botoes = document.querySelectorAll(".resposta");
    botoes.forEach(b => b.disabled = true);

    if(escolha === perguntas[indice].correta){
        pontos++;
        botao.classList.add("acerto");
        explicacaoEl.textContent = "✅ Correto! " + perguntas[indice].explicacao;
        mascoteEl.style.transform = "scale(1.2)";
        document.getElementById("som-certo").play();
    } else{
        botao.classList.add("erro");
        botoes[perguntas[indice].correta].classList.add("acerto");
        explicacaoEl.textContent = "❌ Errado. " + perguntas[indice].explicacao;
        mascoteEl.style.transform = "rotate(-20deg)";
        document.getElementById("som-errado").play();
    }

    // Reset do mascote após 0.5s
    setTimeout(() => {
        mascoteEl.style.transform = "scale(1) rotate(0deg)";
    }, 500);
}

proximaBtn.addEventListener("click", ()=>{
    indice++;
    if(indice < perguntas.length){
        carregarPergunta();
    } else{
        document.getElementById("quiz").classList.add("oculto");
        document.getElementById("resultado").classList.remove("oculto");

        let medalha = "🌱";
        if(pontos === perguntas.length) medalha="🏆";
        else if(pontos >= 3) medalha="🥇";
        else if(pontos >= 2) medalha="🥈";

        document.getElementById("pontuacao").innerHTML = `${medalha}<br><br>Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    }
});

carregarPergunta();
const perguntas = [
    { pergunta:"Qual prática ajuda a conservar o solo?",
      respostas:["Desmatamento","Rotação de culturas","Queimadas"],
      correta:1,
      explicacao:"A rotação de culturas mantém os nutrientes do solo e reduz pragas."
    },
    { pergunta:"Qual fonte de energia é sustentável no campo?",
      respostas:["Carvão","Diesel","Energia solar"],
      correta:2,
      explicacao:"A energia solar é limpa, renovável e não polui."
    }
];

let indice = 0;
let pontos = 0;

const perguntaEl = document.getElementById("pergunta");
const respostasEl = document.getElementById("respostas");
const explicacaoEl = document.getElementById("explicacao");
const progressoEl = document.getElementById("progresso");
const proximaBtn = document.getElementById("proxima");

function carregarPergunta(){
    respostasEl.innerHTML="";
    explicacaoEl.textContent="";
    perguntaEl.textContent = perguntas[indice].pergunta;

    perguntas[indice].respostas.forEach((resp,i)=>{
        const btn = document.createElement("button");
        btn.textContent = resp;
        btn.onclick = ()=> verificarResposta(i,btn);
        respostasEl.appendChild(btn);
    });

    progressoEl.style.width = (indice / perguntas.length)*100 + "%";
}

function verificarResposta(escolha,btn){
    const botoes = document.querySelectorAll("#respostas button");
    botoes.forEach(b => b.disabled=true);

    if(escolha === perguntas[indice].correta){
        pontos++;
        btn.style.background="green";
    } else{
        btn.style.background="red";
        botoes[perguntas[indice].correta].style.background="green";
    }

    explicacaoEl.textContent = perguntas[indice].explicacao;
}

proximaBtn.onclick = ()=>{
    indice++;
    if(indice<perguntas.length){
        carregarPergunta();
    }else{
        document.getElementById("quiz").classList.add("oculto");
        document.getElementById("resultado").classList.remove("oculto");
        document.getElementById("pontuacao").textContent = `Você acertou ${pontos} de ${perguntas.length} perguntas!`;
    }
}

carregarPergunta();
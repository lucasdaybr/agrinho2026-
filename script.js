// Banco de dados de dicas sustentáveis
const dicasSustentaveis = [
    "Dica: Use água da chuva captada para regar esta planta. Reduz o consumo de água potável!",
    "Dica: Use cascas de ovo trituradas na terra para adicionar cálcio naturalmente.",
    "Dica: Pratique a compostagem! Restos de vegetais viram um excelente adubo orgânico.",
    "Dica: Faça cobertura morta (folhas secas) na terra para manter a umidade por mais tempo."
];

const plantForm = document.getElementById('plant-form');
const plantsContainer = document.getElementById('plants-container');

// Carregar plantas salvas ao abrir o app
let plantas = JSON.parse(localStorage.getItem('plantas')) || [];

function salvarNoLocalStorage() {
    localStorage.setItem('plantas', JSON.stringify(plantas));
}

// Função para gerar uma dica aleatória
function obterDicaAleatoria() {
    const totalDicas = dicasSustentaveis.length;
    const indiceAleatorio = Math.floor(Math.random() * totalDicas);
    return dicasSustentaveis[indiceAleatorio];
}

// Função para renderizar as plantas na tela
function renderizarPlantas() {
    plantsContainer.innerHTML = '';

    plantas.forEach((planta, index) => {
        const card = document.createElement('div');
        card.classList.add('plant-card');

        // Lógica simples de alerta simulado baseado no tempo
        // Se passou do intervalo, gera o alerta
        const horasPassadas = (Date.now() - planta.dataPlantio) / (1000 * 60 * 60); 
        const precisaAgua = horasPassadas >= (planta.intervalo * 24); // Simulação real

        // Para fins de teste rápido no protótipo, você pode simular que sempre precisa após alguns segundos
        if (precisaAgua) {
            card.classList.add('alert');
        }

        card.innerHTML = `
            <h3>${planta.nome}</h3>
            <p><strong>Rega:</strong> a cada ${planta.intervalo} dia(s)</p>
            <p class="status">${precisaAgua ? '⚠️ NECESSITA DE ÁGUA AGORA!' : '💧 Solo hidratado'}</p>
            <div class="tip">${planta.dica}</div>
            <button onclick="regarPlanta(${index})" style="margin-top: 10px; background: #2e7d32;">Regar Planta</button>
            <button onclick="removerPlanta(${index})" style="margin-top: 10px; background: #c62828;">Remover</button>
        `;

        plantsContainer.appendChild(card);
    });
}

// Evento de envio do formulário
plantForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('plant-name').value;
    const intervalo = document.getElementById('water-interval').value;

    const novaPlanta = {
        nome: nome,
        intervalo: parseInt(intervalo),
        dataPlantio: Date.now(), // Guarda o momento exato do registro
        dica: obterDicaAleatoria()
    };

    plantas.push(novaPlanta);
    salvarNoLocalStorage();
    renderizarPlantas();

    plantForm.reset(); // Limpa os campos do formulário
});

// Função para resetar o temporizador de rega
window.regarPlanta = function(index) {
    plantas[index].dataPlantio = Date.now(); // Reseta o tempo para agora
    salvarNoLocalStorage();
    renderizarPlantas();
    alert(`Você regou a planta: ${plantas[index].nome}!`);
};

// Função para deletar uma planta
window.removerPlanta = function(index) {
    plantas.splice(index, 1);
    salvarNoLocalStorage();
    renderizarPlantas();
};

// Inicializa a tela com os dados salvos
renderizarPlantas();
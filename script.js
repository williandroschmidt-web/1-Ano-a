const modal = document.getElementById('modal-config');
const btnConfig = document.getElementById('btn-config');
const btnFechar = document.getElementById('btn-fechar');
const btnSalvar = document.getElementById('btn-salvar');
const inputNome = document.getElementById('username');
const selectClima = document.getElementById('clima-teste');
const tituloBoasVindas = document.getElementById('welcome-title');
const subtitulo = document.getElementById('subtitulo-boasvindas');

// Abre e fecha Modal
btnConfig.addEventListener('click', () => modal.style.display = 'flex');
btnFechar.addEventListener('click', () => modal.style.display = 'none');

// Função para checar o clima baseado no horário ou escolha
function atualizarClimaETema(modoForcado) {
    // Remove todas as classes antigas do corpo do site
    document.body.classList.remove('tema-dia', 'tema-noite', 'tema-chuva');

    if (modoForcado === 'chuva') {
        document.body.classList.add('tema-chuva');
        subtitulo.innerText = "⚡ Está chovendo por aqui hoje! Cuidado com os raios.";
        return;
    }

    // Se estiver no Automático, pega a hora real do sistema
    const horaAtual = new Date().getHours();

    // Considera DIA das 6h às 18h (6 às 18)
    if (horaAtual >= 6 && horaAtual < 18) {
        document.body.classList.add('tema-dia');
        subtitulo.innerText = "☀️ Tenha um excelente dia de estudos!";
    } else {
        // Noite das 18h às 5h da manhã
        document.body.classList.add('tema-noite');
        subtitulo.innerText = "🌙 Foco nos estudos noturnos!";
    }
}

// Quando clicar em Salvar
btnSalvar.addEventListener('click', () => {
    const nomeDigitado = inputNome.value;
    const climaEscolhido = selectClima.value;

    if (nomeDigitado.trim() !== "") {
        tituloBoasVindas.innerText = `Olá, ${nomeDigitado}`;
        localStorage.setItem('usuarioNome', nomeDigitado);
    }

    localStorage.setItem('climaPreferencia', climaEscolhido);
    atualizarClimaETema(climaEscolhido);

    modal.style.display = 'none';
});

// Quando o site carregar
window.addEventListener('load', () => {
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const climaSalvo = localStorage.getItem('climaPreferencia') || 'auto';

    if (nomeSalvo) {
        tituloBoasVindas.innerText = `Olá, ${nomeSalvo}`;
        inputNome.value = nomeSalvo;
    }

    selectClima.value = climaSalvo;
    atualizarClimaETema(climaSalvo);
});

export const dadosBlocos = {
    "Bloco A": ["Sala 101", "Sala 102", "Lab de Informática A"],
    "Bloco B": ["Sala 201", "Sala 202", "Lab de Química"],
    "Bloco C": ["Auditório", "Sala de Reuniões"]
};

export const DOM = {
    formAgendamento: document.getElementById("formAgendamento"),
    selectBloco: document.getElementById("bloco"),
    selectSala: document.getElementById("sala"),
    selectFiltroBloco: document.getElementById("filtroBloco"),
    selectFiltroSala: document.getElementById("filtroSala"),
    inputFiltroSolicitante: document.getElementById("filtroSolicitante"),
    inputFiltroData: document.getElementById("filtroData"),
    
    listaReservas: document.getElementById("listaReservas"),
    alertaVazio: document.getElementById("alertaVazio"),
    areaTabela: document.getElementById("areaTabela"),
    alertaFormulario: document.getElementById("alertaFormulario"),

    elTotalReservas: document.getElementById("totalReservas"),
    elTotalManha: document.getElementById("totalManha"),
    elTotalOutrosTurnos: document.getElementById("totalOutrosTurnos"),
    elContadorReservas: document.getElementById("contadorReservas"),

   
    getCamposFormulario() {
        return {
            solicitante: document.getElementById("solicitante").value.trim(),
            bloco: this.selectBloco.value,
            sala: this.selectSala.value,
            data: document.getElementById("data").value,
            turno: document.getElementById("turno").value
        };
    }
};
export function carregarSalas(blocoSelecionado, elementoSelect, textoPadrao) {
    elementoSelect.innerHTML = `<option value="">${textoPadrao}</option>`;
    
    if (!blocoSelecionado) {
        if (elementoSelect === DOM.selectSala) elementoSelect.disabled = true;
        return;
    }

    const salas = dadosBlocos[blocoSelecionado] || [];
    salas.forEach(sala => {
        elementoSelect.add(new Option(sala, sala));
    });

    elementoSelect.disabled = false;
}
export function exibirAlertaFormulario(mensagem) {
    DOM.alertaFormulario.textContent = mensagem;
    DOM.alertaFormulario.classList.remove("d-none");
}
export function esconderAlertaFormulario() {
    DOM.alertaFormulario.textContent = "";
    DOM.alertaFormulario.classList.add("d-none");
}
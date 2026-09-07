import { blocosArray } from "./dados.js";

export const DOM = {
    formAgendamento:
        document.getElementById("formAgendamento"),

    selectBloco:
        document.getElementById("bloco"),

    selectSala:
        document.getElementById("sala"),

    selectFiltroBloco:
        document.getElementById("filtroBloco"),

    selectFiltroSala:
        document.getElementById("filtroSala"),

    inputFiltroSolicitante:
        document.getElementById("filtroSolicitante"),

    inputFiltroData:
        document.getElementById("filtroData"),

    listaReservas:
        document.getElementById("listaReservas"),

    alertaVazio:
        document.getElementById("alertaVazio"),

    areaTabela:
        document.getElementById("areaTabela"),

    alertaFormulario:
        document.getElementById("alertaFormulario"),

    elTotalReservas:
        document.getElementById("totalReservas"),

    elTotalManha:
        document.getElementById("totalManha"),

    elTotalOutrosTurnos:
        document.getElementById("totalOutrosTurnos"),

    elContadorReservas:
        document.getElementById("contadorReservas"),

    getCamposFormulario() {
        return {
            solicitante:
                document
                    .getElementById("solicitante")
                    .value
                    .trim(),

            bloco:
            this.selectBloco.value,

            sala:
            this.selectSala.value,

            data:
            document
                .getElementById("data")
                .value,

            turno:
            document
                .getElementById("turno")
                .value
        };
    }
};

// Preenche os selects de blocos
export function getForEachBlocos() {
    DOM.selectBloco.innerHTML =
        '<option value="">Selecione o bloco</option>';

    DOM.selectFiltroBloco.innerHTML =
        '<option value="">Todos os blocos</option>';

    blocosArray.forEach((bloco) => {

        DOM.selectBloco.add(
            new Option(
                bloco.nome,
                bloco.nome
            )
        );

        DOM.selectFiltroBloco.add(
            new Option(
                bloco.nome,
                bloco.nome
            )
        );
    });
}

// Carrega as salas de um determinado bloco
export function carregarSalas(
    blocoSelecionado,
    elementoSelect,
    textoPadrao
) {
    elementoSelect.innerHTML =
        `<option value="">${textoPadrao}</option>`;

    if (!blocoSelecionado) {
        elementoSelect.disabled = true;
        return;
    }

    const bloco = blocosArray.find(
        (bloco) =>
            bloco.nome === blocoSelecionado
    );

    if (!bloco) {
        elementoSelect.disabled = true;
        return;
    }

    bloco.salas.forEach((sala) => {

        elementoSelect.add(
            new Option(
                sala.nome,
                String(sala.id)
            )
        );
    });

    elementoSelect.disabled = false;
}

// Exibe alerta
export function exibirAlertaFormulario(mensagem) {
    DOM.alertaFormulario.textContent = mensagem;

    DOM.alertaFormulario.classList.remove(
        "d-none"
    );
}

// Esconde alerta
export function esconderAlertaFormulario() {
    DOM.alertaFormulario.textContent = "";

    DOM.alertaFormulario.classList.add(
        "d-none"
    );
}
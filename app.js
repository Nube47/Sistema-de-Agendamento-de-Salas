import {
    DOM,
    carregarSalas,
    exibirAlertaFormulario,
    esconderAlertaFormulario,
    getForEachBlocos
} from "./jsModules/dom.js";

import {
    blocosArray,
    reservasArray
} from "./jsModules/dados.js";

import {
    incrementarReservas,
    seedArray,
    filtrarReservas as filtrarReservasDados,
    removerReserva as removerReservaDados
} from "./jsModules/reservas.js";

import {
    incrementarIteravelObjectBlocos,
    incrementarIteravelObjectSala,
    seedSalas,
    seedBloco
} from "./jsModules/blocos.js";


// ==============================
// CARREGAMENTO DOS SEEDS
// ==============================

incrementarReservas(seedArray);

incrementarIteravelObjectBlocos(
    seedBloco
);

incrementarIteravelObjectSala(
    seedSalas
);


// ==============================
// INICIALIZAÇÃO
// ==============================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        getForEachBlocos();

        registrarEventos();

        atualizarInterface();
    }
);


// ==============================
// EVENTOS
// ==============================

function registrarEventos() {

    DOM.selectBloco.addEventListener(
        "change",
        (e) => {

            carregarSalas(
                e.target.value,
                DOM.selectSala,
                "Selecione a sala"
            );
        }
    );


    DOM.selectFiltroBloco.addEventListener(
        "change",
        (e) => {

            carregarSalas(
                e.target.value,
                DOM.selectFiltroSala,
                "Todas as salas"
            );

            atualizarInterface();
        }
    );


    DOM.formAgendamento.addEventListener(
        "submit",
        salvarAgendamento
    );


    DOM.inputFiltroSolicitante.addEventListener(
        "input",
        atualizarInterface
    );


    DOM.inputFiltroData.addEventListener(
        "change",
        atualizarInterface
    );


    DOM.selectFiltroSala.addEventListener(
        "change",
        atualizarInterface
    );


    const modalAgendamento =
        document.getElementById(
            "modalAgendamento"
        );


    modalAgendamento.addEventListener(
        "hidden.bs.modal",
        () => {

            DOM.formAgendamento.reset();

            DOM.selectSala.innerHTML =
                '<option value="">Selecione primeiro o bloco</option>';

            DOM.selectSala.disabled = true;

            esconderAlertaFormulario();

            document
                .querySelectorAll(
                    ".modal-backdrop"
                )
                .forEach(
                    (elemento) =>
                        elemento.remove()
                );

            document.body.classList.remove(
                "modal-open"
            );

            document.body.style.removeProperty(
                "padding-right"
            );

            document.body.style.removeProperty(
                "overflow"
            );
        }
    );
}


// ==============================
// SALVAR RESERVA
// ==============================

function salvarAgendamento(e) {

    e.preventDefault();

    const {
        solicitante,
        bloco,
        sala,
        data,
        turno
    } = DOM.getCamposFormulario();


    const conflito =
        reservasArray.some(
            (reserva) =>

                reserva.bloco === bloco &&
                reserva.sala === sala &&
                reserva.data === data &&
                reserva.turno === turno
        );


    if (conflito) {

        exibirAlertaFormulario(
            "Esta sala já está reservada para a data e turno selecionados."
        );

        return;
    }


    const novaReserva = {

        id: Date.now(),

        nomeSolicitante:
        solicitante,

        bloco,

        sala,

        data,

        turno
    };


    reservasArray.push(
        novaReserva
    );


    atualizarInterface();


    const modalEl =
        document.getElementById(
            "modalAgendamento"
        );


    const modalInstance =
        bootstrap.Modal.getInstance(
            modalEl
        ) ||
        new bootstrap.Modal(
            modalEl
        );


    modalInstance.hide();
}


// ==============================
// REMOVER RESERVA
// ==============================

function removerReserva(id) {

    removerReservaDados(id);

    atualizarInterface();
}


// ==============================
// ATUALIZAÇÃO DA INTERFACE
// ==============================

function atualizarInterface() {

    filtrarReservas();

    atualizarMetricas();
}


// ==============================
// FILTRO
// ==============================

function filtrarReservas() {

    const reservasFiltradas =
        filtrarReservasDados(

            DOM.inputFiltroSolicitante.value,

            DOM.inputFiltroData.value,

            DOM.selectFiltroBloco.value,

            DOM.selectFiltroSala.value
        );


    renderizarTabela(
        reservasFiltradas
    );
}


// ==============================
// MÉTRICAS
// ==============================

function atualizarMetricas() {

    DOM.elTotalReservas.textContent =
        reservasArray.length;


    DOM.elTotalManha.textContent =
        reservasArray.filter(
            (reserva) =>
                reserva.turno === "Manhã"
        ).length;


    DOM.elTotalOutrosTurnos.textContent =
        reservasArray.filter(
            (reserva) =>
                reserva.turno === "Tarde" ||
                reserva.turno === "Noite"
        ).length;
}


// ==============================
// RENDERIZAÇÃO DA TABELA
// ==============================

function renderizarTabela(lista) {

    DOM.listaReservas.innerHTML =
        "";


    DOM.elContadorReservas.textContent =
        `${lista.length} reserva${
            lista.length !== 1
                ? "s"
                : ""
        }`;


    if (lista.length === 0) {

        DOM.alertaVazio.classList.remove(
            "d-none"
        );

        DOM.areaTabela.classList.add(
            "d-none"
        );

        return;
    }


    DOM.alertaVazio.classList.add(
        "d-none"
    );

    DOM.areaTabela.classList.remove(
        "d-none"
    );


    lista.forEach(
        (reservaObject) => {

            const tr =
                document.createElement(
                    "tr"
                );


            const [
                ano,
                mes,
                dia
            ] =
                reservaObject.data.split(
                    "-"
                );


            const dataFormatada =
                `${dia}/${mes}/${ano}`;


            tr.innerHTML = `
                <td>
                    ${reservaObject.nomeSolicitante}
                </td>

                <td>
                    ${reservaObject.bloco}
                </td>

                <td>
                    ${reservaObject.sala}
                </td>

                <td>
                    ${dataFormatada}
                </td>

                <td>
                    <span class="badge text-bg-secondary">
                        ${reservaObject.turno}
                    </span>
                </td>

                <td class="text-center">
                    <button
                        class="btn btn-outline-danger btn-sm btn-deletar"
                        data-id="${reservaObject.id}"
                    >
                        Excluir
                    </button>
                </td>
            `;


            tr
                .querySelector(
                    ".btn-deletar"
                )
                .addEventListener(
                    "click",
                    () =>
                        removerReserva(
                            reservaObject.id
                        )
                );


            DOM.listaReservas.appendChild(
                tr
            );
        }
    );
}
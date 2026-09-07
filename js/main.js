
import { 
    DOM, 
    dadosBlocos, 
    carregarSalas, 
    exibirAlertaFormulario, 
    esconderAlertaFormulario 
} from './dom.js';


let reservas = [];


document.addEventListener("DOMContentLoaded", () => {
    carregarOpcoesBlocos();
    registrarEventos();
    atualizarInterface();
});


function carregarOpcoesBlocos() {
    const blocos = Object.keys(dadosBlocos);
    
    blocos.forEach(bloco => {
        DOM.selectBloco.add(new Option(bloco, bloco));
        DOM.selectFiltroBloco.add(new Option(bloco, bloco));
    });
}


function registrarEventos() {
    
    DOM.selectBloco.addEventListener("change", (e) => {
        carregarSalas(e.target.value, DOM.selectSala, "Selecione a sala");
    });

   
    DOM.selectFiltroBloco.addEventListener("change", (e) => {
        carregarSalas(e.target.value, DOM.selectFiltroSala, "Todas as salas");
        filtrarReservas();
    });

   
    DOM.formAgendamento.addEventListener("submit", salvarAgendamento);

    DOM.inputFiltroSolicitante.addEventListener("input", filtrarReservas);
    DOM.inputFiltroData.addEventListener("change", filtrarReservas);
    DOM.selectFiltroSala.addEventListener("change", filtrarReservas);

    const modalAgendamento = document.getElementById("modalAgendamento");
    modalAgendamento.addEventListener("hidden.bs.modal", () => {
        DOM.formAgendamento.reset();
        DOM.selectSala.innerHTML = '<option value="">Selecione primeiro o bloco</option>';
        DOM.selectSala.disabled = true;
        esconderAlertaFormulario();

        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        document.body.style.removeProperty('overflow');
    });
}

function salvarAgendamento(e) {
    e.preventDefault();

    const { solicitante, bloco, sala, data, turno } = DOM.getCamposFormulario();

    const conflito = reservas.some(r => 
        r.bloco === bloco && 
        r.sala === sala && 
        r.data === data && 
        r.turno === turno
    );

    if (conflito) {
        exibirAlertaFormulario("Esta sala já está reservada para a data e turno selecionados.");
        return;
    }

    const novaReserva = {
        id: Date.now(),
        solicitante,
        bloco,
        sala,
        data,
        turno
    };

    reservas.push(novaReserva);
    atualizarInterface();

    const modalEl = document.getElementById("modalAgendamento");
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.hide();
}

function removerReserva(id) {
    reservas = reservas.filter(r => r.id !== id);
    atualizarInterface();
}

function atualizarInterface() {
    filtrarReservas();
    atualizarMetricas();
}

function atualizarMetricas() {
    DOM.elTotalReservas.textContent = reservas.length;
    DOM.elTotalManha.textContent = reservas.filter(r => r.turno === "Manhã").length;
    DOM.elTotalOutrosTurnos.textContent = reservas.filter(r => r.turno === "Tarde" || r.turno === "Noite").length;
}

function filtrarReservas() {
    const termoSolicitante = DOM.inputFiltroSolicitante.value.toLowerCase().trim();
    const dataFiltro = DOM.inputFiltroData.value;
    const blocoFiltro = DOM.selectFiltroBloco.value;
    const salaFiltro = DOM.selectFiltroSala.value;

    const reservasFiltradas = reservas.filter(r => {
        const atendeSolicitante = r.solicitante.toLowerCase().includes(termoSolicitante);
        const atendeData = !dataFiltro || r.data === dataFiltro;
        const atendeBloco = !blocoFiltro || r.bloco === blocoFiltro;
        const atendeSala = !salaFiltro || r.sala === salaFiltro;

        return atendeSolicitante && atendeData && atendeBloco && atendeSala;
    });

    renderizarTabela(reservasFiltradas);
}

function renderizarTabela(lista) {
    DOM.listaReservas.innerHTML = "";
    DOM.elContadorReservas.textContent = `${lista.length} reserva${lista.length !== 1 ? 's' : ''}`;

    if (lista.length === 0) {
        DOM.alertaVazio.classList.remove("d-none");
        DOM.areaTabela.classList.add("d-none");
        return;
    }

    DOM.alertaVazio.classList.add("d-none");
    DOM.areaTabela.classList.remove("d-none");

    lista.forEach(r => {
        const tr = document.createElement("tr");
        const [ano, mes, dia] = r.data.split("-");
        const dataFormatada = `${dia}/${mes}/${ano}`;

        tr.innerHTML = `
            <td>${r.solicitante}</td>
            <td>${r.bloco}</td>
            <td>${r.sala}</td>
            <td>${dataFormatada}</td>
            <td><span class="badge text-bg-secondary">${r.turno}</span></td>
            <td class="text-center">
                <button class="btn btn-outline-danger btn-sm btn-deletar" data-id="${r.id}">
                    Excluir
                </button>
            </td>
        `;

        tr.querySelector(".btn-deletar").addEventListener("click", () => removerReserva(r.id));
        DOM.listaReservas.appendChild(tr);
    });
}
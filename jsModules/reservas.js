import { reservasArray } from "./dados.js";

export const seedArray = [
    {
        id: 1,
        nomeSolicitante: "Carlos",
        bloco: "Bloco A",
        sala: "101",
        data: "2026-09-05",
        turno: "Manhã"
    },

    {
        id: 2,
        nomeSolicitante: "George",
        bloco: "Bloco B",
        sala: "101",
        data: "2026-09-06",
        turno: "Manhã"
    },

    {
        id: 3,
        nomeSolicitante: "Kleyton",
        bloco: "Bloco A",
        sala: "102",
        data: "2026-09-07",
        turno: "Manhã"
    }
];

// Adiciona reservas ao array principal
export function incrementarReservas(seedArray) {
    reservasArray.push(...seedArray);
}

// Retorna todas as reservas
export function getReservas() {
    return reservasArray;
}

// Filtra as reservas
export function filtrarReservas(
    termoSolicitante = "",
    dataFiltro = "",
    blocoFiltro = "",
    salaFiltro = ""
) {
    const termo = termoSolicitante
        .toLowerCase()
        .trim();

    return reservasArray.filter((reservaObject) => {

        const atendeSolicitante =
            reservaObject.nomeSolicitante
                .toLowerCase()
                .includes(termo);

        const atendeData =
            !dataFiltro ||
            reservaObject.data === dataFiltro;

        const atendeBloco =
            !blocoFiltro ||
            reservaObject.bloco === blocoFiltro;

        const atendeSala =
            !salaFiltro ||
            reservaObject.sala === salaFiltro;

        return (
            atendeSolicitante &&
            atendeData &&
            atendeBloco &&
            atendeSala
        );
    });
}

// Remove uma reserva pelo ID
export function removerReserva(id) {
    const indice = reservasArray.findIndex(
        (reserva) => reserva.id === id
    );

    if (indice !== -1) {
        reservasArray.splice(indice, 1);
    }
}
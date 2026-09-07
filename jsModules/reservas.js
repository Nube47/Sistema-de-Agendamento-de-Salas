import { blocosArray, reservasArray } from "./dados.js"
const seedArray = [
    {
        nomeSolicitante: "Carlos",
        bloco: "Bloco A",
        sala: "101",
        data: "2026-09-05",
    },
    {
        nomeSolicitante: "George",
        bloco: "Bloco B",
        sala: "101",
        data: "2026-09-06",
    },
    {
        nomeSolicitante: "Kleyton",
        bloco: "Bloco A",
        sala: "102",
        data: "2026-09-07",
    }
]
const seedBlocos = [
    {
        id: 3,
        nome: "Bloco C",
        salas: [
            {
                id: 101,
                nome: "Sala 101",
                descricao: "Laboratório de Informática",
                reservas: []
            },
            {
                id: 102,
                nome: "Sala 102",
                descricao: "Laboratório de Informática",
                reservas: []
            }
        ]
    }
]

//funções de agendamento de reserva e afins
function incrementarReservas(seedArray) {reservasArray.push(...seedArray)}

export function getReservas (){
    return reservasArray;
}
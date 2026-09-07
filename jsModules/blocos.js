import { blocosArray } from "./dados.js";

export const seedSalas = [
    {
        id: 103,
        nome: "Sala 103",
        descricao: "Laboratório de Informática",
        reservas: []
    },

    {
        id: 104,
        nome: "Sala 104",
        descricao: "Laboratório de Informática",
        reservas: []
    }
];

export const seedBloco = [
    {
        id: 2,
        nome: "Bloco C",
        salas: []
    }
];

// Adiciona blocos ao array principal
export function incrementarIteravelObjectBlocos(seedBlocos) {
    blocosArray.push(...seedBlocos);
}

// Adiciona salas a um bloco
export function incrementarIteravelObjectSala(seedSala, blocoID) {
    if (blocoID === undefined) {
        blocoID = blocosArray.length - 1;
    }

    blocosArray[blocoID].salas.push(...seedSala);
}

// Retorna todos os blocos
export function getBlocosArray() {
    return blocosArray;
}

// Retorna uma sala específica.
// Se salaID não for informado, retorna a última sala do bloco.
export function callbackObjectSala(blocoID, salaID) {
    const bloco = blocosArray[blocoID];

    if (!bloco) {
        return undefined;
    }

    if (salaID === undefined) {
        return bloco.salas[bloco.salas.length - 1];
    }

    return bloco.salas[salaID];
}

// Retorna um bloco específico.
// Se blocoID não for informado, retorna o último bloco.
export function callbackObjectBloco(blocoID) {
    if (blocoID === undefined) {
        return blocosArray[blocosArray.length - 1];
    }

    return blocosArray[blocoID];
}

// Retorna o array de blocos
export function getForEachBloco() {
    return blocosArray;
}
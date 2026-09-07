import {blocosArray, reservasArray} from "./dados.js";
const iteravelSeedSala = [{
    id: 103,
    nome: "Sala 103",
    descricao: "Laboratório de Informática",
    reservas: []
}]

//manipulação dos blocos e salas
function incrementarIteravelObjectBlocos(seedBlocos) {blocosArray.push(...seedBlocos)}
function incrementarIteravelObjectSala(seedSala, blocoID) {blocosArray[blocoID].salas.push(...seedSala);}

//callback dos dados
export const getBlocosArray = () => { return blocosArray}

export const callbackObjectSala = (blocoID, salaID) => {
    if (salaID === undefined) return (blocosArray[blocoID].salas[blocosArray[blocoID].salas.length -1])
        else return blocosArray[blocoID].salas[salaID]
}

export const callbackObjectBloco = (blocoID) => {
    if (blocoID === undefined) return  blocosArray[blocosArray.length -1]
        else return blocosArray[blocoID]
}
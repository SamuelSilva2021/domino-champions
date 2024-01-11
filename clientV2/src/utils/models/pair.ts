import { Player } from "./player";

export interface Pair {
    id: number;
    nome: string;
    jogador1: Player;
    jogador2: Player;
    pontos: Number;
    pontosBatida: Number;
    partidasConcluidas: Number;
    flAtivo: boolean
    pontosSofridos: number
}
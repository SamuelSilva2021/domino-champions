import { Pair } from "./pair"

export interface Duel {
        id: string
        dupla1: Pair
        ptsBtdDp1Jogador1: number
        ptsBtdDp1Jogador2: number
        dupla2: Pair
        ptsBtdDp2Jogador1: number
        ptsBtdDp2Jogador2: number
        vencedorId: number
        flConcluido: boolean
    }

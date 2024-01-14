import axios from "axios"
import { Rotas } from "@/utils/constants/rotas";
import { Duel } from "@/utils/models/duel";

export async function GetDuelsInProgress(): Promise<Duel[]> {
    try {
        const res = await axios.get(Rotas.DUELS);
        return res.data;
    } catch (error: any) {
        throw (error.response.data.message) || 'Erro desconhecido';
    }
}

import { Rotas } from "@/utils/constants/rotas"
import axios, { Axios } from "axios"

export const HandleDelete = async (id: number | null) => await axios.delete(`${Rotas.PLAYERS}/${id}`)

export const GetPlayers = async () => {
  try {
    const response = await axios.get(`${Rotas.PLAYERS}`);
    return response.data;
  } catch (error: any) {
    throw (error.response.data.message) || 'Erro desconhecido';
  }
};


export const HandleEditPlayer = async (id: number | null, formData: FormData) => {
  try {
    const response = await axios.put(`${Rotas.PLAYERS}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return await response.data
  } catch (error) {
    throw error;
  }
}



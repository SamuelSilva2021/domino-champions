import { Rotas } from "@/utils/constants/rotas"
import axios from "axios"
import { toast } from "react-toastify";

export const HandleDelete = async (id: number | null) => await axios.delete(`${Rotas.PLAYERS}/${id}`)

export const GetPlayers = async () => {
  try {
    const response = await axios.get(`${Rotas.PLAYERS}`);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const HandleEditPlayer = async (id: number | null, formData: FormData) => {
  try {
    const response = await axios.put(`${Rotas.PLAYERS}/${id}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return await response.data
  } catch (error) {
    throw error;
  }
}

export const Sucess = (message: string) => toast.success(`${message}`, {
  position: 'top-right', // Posição do Toast
  autoClose: 3000, // Duração em milissegundos
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const Error = (message: string) => toast.error(`${message}`, {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

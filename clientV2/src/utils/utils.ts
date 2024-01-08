import { toast } from "react-toastify";

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
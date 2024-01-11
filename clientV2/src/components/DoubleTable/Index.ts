import { Rotas } from "@/utils/constants/rotas";
import { Pair } from "@/utils/models/pair"
import { Sucess, Error } from "@/utils/utils";
import axios from "axios";

interface Props {
    setSelectedDouble: React.Dispatch<React.SetStateAction<Pair | undefined>>;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    double: Pair
}

export const handleCancelDelete = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen(false)
}

export const handleConfirmDelete = async (
    id: number | undefined,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    updateTable: () => void
) => {
    await axios.delete(`${Rotas.DOUBLES}/${id}`)
        .then((resp) => {
            Sucess(`${resp.data.message}`)
            setIsOpen(false);
            updateTable();
        })
        .catch((error) => {
            Error(`${error.response.data}`)
        })
}

export const openModal = (double: Pair
    , setSelectedDouble: React.Dispatch<React.SetStateAction<Pair | undefined>>
    , setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    , setTextModal: React.Dispatch<React.SetStateAction<string>>
) => {
    setIsOpen(true)
    setTextModal(`Deseja realmente deletar a dupla ${double.nome}?`)
    setSelectedDouble(double)
}

export const handleEdit = ({ setSelectedDouble, double, setEdit }: Props) => {
    setSelectedDouble(double)
    setEdit(true)
}
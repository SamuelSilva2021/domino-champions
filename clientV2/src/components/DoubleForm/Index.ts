import { Rotas } from "@/utils/constants/rotas";
import { Pair } from "@/utils/models/pair";
import { hasLength, useForm } from "@mantine/form";
import { Error, Sucess } from "@/utils/utils";
import axios from "axios";
import { Player } from "@/utils/models/player";

interface Props {
    double?: Pair,
    players?: Player[],
    edit: boolean
    onClose: () => void | undefined
    updateTable: () => void
}

const player = { id: 0, nome: '', email: '', apelido: '', pontos: 0, flAtivo: true, urlImagem: '', titulos: 0 }

export const DoubleFormInputs = (
    { double, edit, active }:
        { double: Pair | undefined, edit: boolean, active: boolean }
) => useForm<Pair>({
    initialValues: {
        id: double ? double?.id || 0 : 0,
        nome: edit && double ? double?.nome || '' : '',
        jogador1: edit && double ? double?.jogador1 : player,
        jogador2: edit && double ? double?.jogador2 : player,
        pontos: edit && double ? double?.pontos || 0 : 0,
        pontosBatida: edit && double ? double?.pontosBatida || 0 : 0,
        partidasConcluidas: edit && double ? double?.partidasConcluidas || 0 : 0,
        flAtivo: edit ? active : true,
        pontosSofridos: edit && double ? double?.pontosSofridos || 0 : 0,
    },
    validate: {
        nome: hasLength({ min: 2, max: 50 }, 'Nome precisa ter de 2-10 caracteres'),
        jogador1: hasLength({min:1}, 'Selecione um jogador'),
        jogador2: hasLength({min:1}, 'Selecione um jogador'),
    }
})


export const GetDouble = async () => {
    try {
        const response = await axios.get(Rotas.DOUBLES)
        return await response.data
    } catch (error) {
        Error('Erro ao consultar duplas')
    }
}

export const Post = async (double: Pair, onClose: () => void | undefined, updateTable: () => void) => {
    await axios.post(Rotas.DOUBLES, double)
        .then(() => {
            Sucess('Dupla cadastrada com sucesso!')
            onClose();
            updateTable()
        }
        )
        .catch((error) => {
            Error(`Erro: ${error.response.data.errors[0].message}`)
        })
}

export const Put = async (double: Pair, onClose: () => void | undefined, updateTable: () => void) => {
    await axios.put(`${Rotas.DOUBLES}/${double?.id}`, double)
        .then(() => {
            Sucess('Dupla editada com sucesso!')
            onClose();
            updateTable()
        }
        )
        .catch((error) => {
            Error(`${error.response.data.errors[0].message}`)
            console.error(`${error.response.data.errors[0].message}`)
        })
}

export const HandleSubmit = ({ double, players, edit, onClose, updateTable }: Props, {active}:{active: boolean}) => {
    const jogador1 = players?.find(j => j.id === Number(double?.jogador1))
    const jogador2 = players?.find(j => j.id === Number(double?.jogador2))

    const newDouble: Pair = {
        id: double?.id || 0,
        nome: double?.nome || '',
        jogador1: jogador1 || player,
        jogador2: jogador2 || player,
        pontos: double?.pontos || 0,
        pontosBatida: double?.pontosBatida || 0,
        partidasConcluidas: double?.partidasConcluidas || 0,
        flAtivo: edit ? active : true,
        pontosSofridos: double?.pontosSofridos || 0
    };

    edit ? Put(newDouble, onClose, updateTable) : Post(newDouble, onClose, updateTable);
}
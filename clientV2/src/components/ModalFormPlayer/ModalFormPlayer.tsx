import { Modal } from "@mantine/core";
import { PlayerForm } from "../PlayerForm/PlayerForm";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Player } from "@/utils/models/player";

interface Props{
    onClose: () => void
    opened: boolean
    edit?: boolean
    fetchPlayers: () => void
    title: string
    player?: Player
}

export default function ModalFormPlayer({opened, onClose, edit, fetchPlayers, title, player} :Props) {
    return (
        <>
            <Modal opened={opened} onClose={onClose} title={title} centered>
                <PlayerForm edit={edit} close={onClose} updateTable={fetchPlayers} player={player} />
            </Modal>
        </>

    )
}
import { Pair } from "@/utils/models/pair";
import { Badge, Button, Modal, Table, Text, rem } from "@mantine/core";
import { IconTrash, IconUserEdit } from "@tabler/icons-react";
import { openModal, handleEdit, handleConfirmDelete, handleCancelDelete } from "./Index";
import { useState } from "react";
import DoubleForm from "../DoubleForm/DoubleForm";
import { useDisclosure } from "@mantine/hooks";
import { ModalConfirm } from "../ModalConfirm/ModalConfirm";

interface Props {
    doubles: Pair[],
    updateTable: () => void,
    onSearchChange: (term: string) => void,
    openModalNew: (title: string, edit: boolean) => void
}

export default function DoubleTable({ doubles, updateTable, onSearchChange, openModalNew }: Props) {
    const [selectedDouble, setSelectedDouble] = useState<Pair>()
    const [opened, { open, close }] = useDisclosure(false);
    const [edit, setEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [textModal, setTextModal] = useState('');

    const handleCancelDelete = () => {
        setIsOpen(false);
    };

    const confirmDelete = async () => {
        await handleConfirmDelete(selectedDouble?.id, setIsOpen, updateTable)
    }

    const rows = doubles ? doubles.map(double => (
        <Table.Tr key={double.id}>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    {double.nome}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={300}>
                    {double.jogador1.nome}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={300}>
                    {double.jogador2.nome}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={300}>
                    {double.pontos.toString()}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={300}>
                    {double.pontosBatida.toString()}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={300}>
                    {double.pontosSofridos.toString()}
                </Text>
            </Table.Td>
            <Table.Td>
                {double.flAtivo ? (
                    <Badge fullWidth variant="light">
                        Active
                    </Badge>
                ) : (
                    <Badge color="gray" fullWidth variant="light">
                        Disabled
                    </Badge>
                )}
            </Table.Td>
            <Table.Td
            >
                <Button
                    style={{ marginRight: rem(16) }}
                    color='red'
                    variant='outline'
                    onClick={() => openModal(double, setSelectedDouble, setIsOpen, setTextModal)}
                >
                    <IconTrash stroke={1.5} />
                </Button>
                <Button
                    color='orange'
                    variant='outline'
                    onClick={() => {
                        open()
                        handleEdit({ setSelectedDouble, double, setEdit })
                    }}
                >
                    <IconUserEdit stroke={1.5} />
                </Button>
            </Table.Td>
        </Table.Tr>
    )) : null

    return (
        <>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Dupla</Table.Th>
                            <Table.Th>Jogador 1</Table.Th>
                            <Table.Th>Jogador 2</Table.Th>
                            <Table.Th>Pontos</Table.Th>
                            <Table.Th>Pontos de batida</Table.Th>
                            <Table.Th>Pontos sofridos</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Opções</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
            <Modal opened={opened} onClose={close} title={'Editar'} centered>
                <DoubleForm edit={edit} onClose={close} updateTable={updateTable} double={selectedDouble} />
            </Modal>
            <ModalConfirm
                isOpen={isOpen}
                onConfirm={confirmDelete}
                onCancel={handleCancelDelete}
                text={textModal}
            />
        </>
    )
}
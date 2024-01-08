import { Pair } from "@/utils/models/pair";
import { Badge, Button, Group, Modal, Table, Text, rem } from "@mantine/core";
import { IconTrash, IconUserEdit } from "@tabler/icons-react";
import { handleDelete, handleEdit } from "./Index";
import { useState } from "react";
import DoubleForm from "../DoubleForm/DoubleForm";
import { useDisclosure } from "@mantine/hooks";

interface Props {
    doubles: Pair[],
    updateTable: () => void
}

export default function DoubleTable({ doubles, updateTable }: Props) {
    const [selectedDouble, setSelectedDouble] = useState<Pair>()
    const [opened, { open, close }] = useDisclosure(false);
    const [edit, setEdit] = useState(false);
    
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
                    onClick={() => handleDelete(double)}
                >
                    <IconTrash stroke={1.5} />
                </Button>
                <Button
                    color='orange'
                    variant='outline'
                    onClick={() => {
                        open()
                        handleEdit({setSelectedDouble, double, setEdit})
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
        </>
    )
}
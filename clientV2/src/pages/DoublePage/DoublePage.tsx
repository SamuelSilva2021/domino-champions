import DoubleForm from "@/components/DoubleForm/DoubleForm";
import { GetDouble } from "@/components/DoubleForm/Index";
import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import { Pair } from "@/utils/models/pair";
import { Button, Container, Grid, Modal, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import DoubleTable from "@/components/DoubleTable/DoubleTable";
import classes from './Double.module.css';

export default function DoublePage() {
    const [doubles, setDoubles] = useState<Pair[]>([])
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);
    const [filteredDouble, setFilterDouble] = useState<Pair[]>([]);

    const fetchDouble = async () => {
        const response = await GetDouble()
        setDoubles(response)
    }

    const filterDouble = (term: string) => {
        const filtered = doubles.filter((player) =>
            player.nome.toLowerCase().includes(term.toLowerCase())
        );
        setFilterDouble(filtered);
    };

    const openModal = (title: string, edit: boolean) => {
        open();
        setTitle(title)
        setEdit(edit)
    }

    useEffect(() => {
        fetchDouble();
    }, [])

    return (
        <Container className={classes.responsiveContainer}>
            <DoubleTable
                doubles={filteredDouble.length > 0 ? filteredDouble : doubles}
                updateTable={fetchDouble}
                onSearchChange={filterDouble}
                openModalNew={openModal}
            />
            {
                doubles.length > 3 && (
                    <Button size="md" onClick={() => {
                        console.log('Iniciar torneiro')
                    }}>
                        Gerar torneio
                    </Button>
                )
            }

            <Modal opened={opened} onClose={close} title={title} centered>
                <DoubleForm edit={edit} onClose={close} updateTable={fetchDouble} />
            </Modal>
        </Container>
    )
}
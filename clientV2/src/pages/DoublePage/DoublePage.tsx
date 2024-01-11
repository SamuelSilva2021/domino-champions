import DoubleForm from "@/components/DoubleForm/DoubleForm";
import { GetDouble } from "@/components/DoubleForm/Index";
import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import { Pair } from "@/utils/models/pair";
import { Button, Container, Grid, Modal, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import DoubleTable from "@/components/DoubleTable/DoubleTable";

export default function DoublePage() {
    const [doubles, setDoubles] = useState<Pair[]>([])
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState('');
    const [edit, setEdit] = useState(false);

    const fetchDouble = async () => {
        const response = await GetDouble()
        setDoubles(response)
    }

    useEffect(() => {
        fetchDouble();
    }, [])

    return (
        <Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
                <Grid gutter="md">
                    <Grid.Col >
                        <Grid gutter='sm'>
                            <Grid.Col span={8}>
                                <InputWithButton
                                    onSearchChange={() => console.log()}
                                    placeholder="Pesquisar dupla"
                                />
                            </Grid.Col>
                            <Grid.Col span={2} >
                                <Button color="lime.7" size="md" onClick={() => {
                                    open()
                                    setTitle('Cria dupla')
                                    setEdit(false)
                                }}>
                                    Criar dupla
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={2} >
                                {
                                    doubles.length > 3 && (
                                        <Button size="md" onClick={() => {
                                            console.log('Iniciar torneiro')
                                        }}>
                                            Gerar torneio
                                        </Button>
                                    )
                                }

                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col>
                        <DoubleTable
                            doubles={doubles}
                            updateTable={fetchDouble}
                        />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            <Modal opened={opened} onClose={close} title={title} centered>
                <DoubleForm edit={edit} onClose={close} updateTable={fetchDouble} />
            </Modal>
        </Container>
    )
}
import { Pair } from "@/utils/models/pair"
import { Box, Button, Grid, Group, Select, TextInput } from "@mantine/core";
import { DoubleFormInputs, GetDouble, HandleSubmit } from "./Index";
import { useEffect, useState } from "react";
import { Player } from "@/utils/models/player";
import { GetPlayers } from "@/pages/PlayerPage/util";
import { Switche } from "../Switche/Switche";

interface Props {
    double?: Pair,
    edit: boolean,
    onClose: () => void,
    updateTable: () => void,
}

export default function DoubleForm({ edit, onClose, updateTable, double }: Props) {
    const [players, setPlayers] = useState<Player[]>([]);
    const [active, setActive] = useState<boolean>(true);
    const [activePlayers, setActivePlayers] = useState<Player[]>([]);

    const fetchPlayer = async () => {
        const res = await GetPlayers()
        setPlayers(res)
    }

    useEffect(() => {
        fetchPlayer()
    }, [])

    const form = DoubleFormInputs({ double: double, edit: edit, active: active });

    return (
        <Box maw={340} mx="auto">
            <form onSubmit={form.onSubmit((values) => 
                HandleSubmit({double: values, players, edit, onClose, updateTable}, {active: active}))}>
                <TextInput
                    withAsterisk
                    label="Nome"
                    placeholder="Digite o nome da dupla"
                    {...form.getInputProps('nome')}
                />
                <Select
                    withAsterisk
                    label="Jogador1"
                    placeholder="Selecione um jogador"
                    data={players.map(j => ({ value: j.id.toString(), label: j.nome }))}
                    {...form.getInputProps('jogador1Id')}
                />
                <Select
                    withAsterisk
                    label="Jogador2"
                    placeholder="Selecione um jogador"
                    data={players.map(j => ({ value: j.id.toString(), label: j.nome }))}
                    {...form.getInputProps('jogador2Id')}
                />
                {edit &&
                    <>
                        <Grid columns={2}>
                            <Grid.Col span={1}>
                                <TextInput
                                    label="Pontos"
                                    {...form.getInputProps('pontos')}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <TextInput
                                    label="Pontos Batida"
                                    {...form.getInputProps('pontosBatida')}
                                />
                            </Grid.Col>
                        </Grid>
                        <Grid columns={2}>
                            <Grid.Col span={1}>
                                <TextInput
                                    label="Partidas concluídas"
                                    {...form.getInputProps('partidasConcluidas')}
                                />
                            </Grid.Col>
                            <Grid.Col span={1}>
                                <TextInput
                                    label="Pontos sofridos"
                                    {...form.getInputProps('pontosSofridos')}
                                />
                            </Grid.Col>
                            <Switche
                                InitialChecked={double?.flAtivo || false}
                                setActive={setActive}
                                titleDisabled='Habilitar dupla'
                                titleEnabled='Desabilitar dupla'
                                {...form.getInputProps('flAtivo')}
                            />
                        </Grid>
                    </>
                }
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}
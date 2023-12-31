import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import { PlayerForm } from "@/components/PlayerForm/PlayerForm";
import { PlayerTable } from "@/components/UsersRolesTable/PlayerTable";
import { Rotas } from "@/utils/constants/rotas";
import { Button, Container, Grid, Modal, SimpleGrid, Skeleton, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, } from 'react-toastify';
import { GetPlayers, Sucess, Error } from "./util";
import ModalFormPlayer from "@/components/ModalFormPlayer/ModalFormPlayer";
import { Player } from "@/utils/models/player";

export function PlayerPage() {
    const [opened, {open, close}] = useDisclosure(false);
    const [titleModal, setTitleModal] = useState('');
    const [edit, setEdit] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);

    const fetchPlayers = async () => {
        try {
          const response = await GetPlayers();
          setPlayers(response);
        } catch (error) {
          Error(`Erro ao buscar jogadores: ${error}`);
          console.error(error);
        }
      };

    useEffect(() => {       
        fetchPlayers();   
      }, [GetPlayers]); 

    const openModal = (title:string, edit: boolean) => {
        open();
        setTitleModal(title)
        setEdit(edit) 
    }

    return (
        <Container my="md">
            <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
                <Grid gutter="md">
                    <Grid.Col >
                        <Grid gutter='sm'>
                            <Grid.Col span={8}>
                                <InputWithButton />
                            </Grid.Col>
                            <Grid.Col span={2} offset={2} >
                                <Button color="lime.7" size="sm" onClick={() => openModal('Cadastrar', false)}>
                                    Novo Jogador
                                </Button>         
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col>
                        <PlayerTable players={players} updateTable={fetchPlayers} />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            <ModalFormPlayer
                opened={opened}
                onClose={close}
                title={titleModal}
                fetchPlayers={fetchPlayers}                
            />
        </Container>
    )
}
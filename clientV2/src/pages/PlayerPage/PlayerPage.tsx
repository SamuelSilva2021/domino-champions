import { InputWithButton } from "@/components/InputWithButton/InputWithButton";
import { Button, Container, Grid, GridCol } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { GetPlayers } from "./util";
import ModalFormPlayer from "@/components/ModalFormPlayer/ModalFormPlayer";
import { Player } from "@/utils/models/player";
import { Error } from "@/utils/utils";
import { PlayerTable } from "@/components/PlayerTable/PlayerTable";
import classes from './PlayerPage.module.css'

export function PlayerPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [titleModal, setTitleModal] = useState('');
  const [edit, setEdit] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const res = await GetPlayers();
      setPlayers(res);
    } catch (error) {
      Error(`${error}`);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const openModal = (title: string, edit: boolean) => {
    open();
    setTitleModal(title)
    setEdit(edit)
  }

  const filterPlayers = (term: string) => {
    const filtered = players.filter((player) =>
      player.nome.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPlayers(filtered);
  };

  return (
    <Container className={classes.responsiveContainer}>
      <PlayerTable
        players={filteredPlayers.length > 0 ? filteredPlayers : players}
        updateTable={fetchPlayers}
        onSearchChange={filterPlayers}
        openModal={openModal}
      />
      <ModalFormPlayer
        opened={opened}
        onClose={close}
        title={titleModal}
        fetchPlayers={fetchPlayers}
      />
    </Container>
  )
}

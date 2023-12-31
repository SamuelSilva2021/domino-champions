import { HandleDelete, Sucess, Error, GetPlayers } from '@/pages/PlayerPage/util';
import { Rotas } from '@/utils/constants/rotas';
import { Avatar, Badge, Table, Group, Text, Select, Button, Checkbox, rem, Modal } from '@mantine/core';
import { IconTextColor, IconTrash, IconUserEdit } from '@tabler/icons-react';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { PlayerForm } from '../PlayerForm/PlayerForm';
import { Player } from '@/utils/models/player';
import ModalFormPlayer from '../ModalFormPlayer/ModalFormPlayer';

interface Props {
  players: Player[]
  updateTable: () => void
}

export function PlayerTable({ players, updateTable }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState(false);
  const [playerIdToDelete, setPlayerIdToDelete] = useState<number | null>(null);
  const [textModal, setTextModal] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player>();
  const [edit, setEdit] = useState(false);

  const handleDelete = async (jogador: Player) => {
    setPlayerIdToDelete(jogador.id);
    setIsOpen(true);
    setTextModal(`Deseja realmente deletar o jogador ${jogador.nome}`)
  };

  const handleConfirmDelete = async () => {
    HandleDelete(playerIdToDelete).then(() => {
      updateTable();
      Sucess('Jogador excluído com sucesso!')
    })
      .catch((error) => {
        Error(error)
        console.error(error)
      })
    setIsOpen(false);
    setPlayerIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsOpen(false);
    setPlayerIdToDelete(null);
  };

  const handleEdit = (player: Player) => {
    setEdit(true)
    setSelectedPlayer(player);
    open();
  }

  const rows = players ? players.map((player) => (
    <Table.Tr key={player.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={`http://localhost:7002/images/${player.urlImagem}`} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {player.nome}
            </Text>
            <Text fz="xs" c="dimmed">
              {player.email}
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text fz="xs" c="dimmed">
          {player.apelido}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="xs" c="dimmed">
          {player.pontos}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz="xs" c="dimmed">
          {player.titulos}
        </Text>
      </Table.Td>
      <Table.Td>
        {player.flAtivo ? (
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
          onClick={() => handleDelete(player)}
        >
          <IconTrash stroke={1.5} />
        </Button>
        <Button
          color='orange'
          variant='outline'
          onClick={() => handleEdit(player)}
        >
          <IconUserEdit stroke={1.5} />
        </Button>
      </Table.Td>
    </Table.Tr>
  )) : null;

  return (
    <>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Jogador</Table.Th>
              <Table.Th>Apelido</Table.Th>
              <Table.Th>Pontos</Table.Th>
              <Table.Th>Títulos</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Opções</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <ModalConfirm
        isOpen={isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        text={textModal}
      />
      <ModalFormPlayer
        opened={opened}
        onClose={close}
        title={'Editar'}
        fetchPlayers={updateTable}
        player={selectedPlayer}
        edit={edit}
      />
    </>
  );
}
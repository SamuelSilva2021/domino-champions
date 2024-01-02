import { toast, } from 'react-toastify';
import { useForm, hasLength } from '@mantine/form';
import { Button, Group, TextInput, Box, LoadingOverlay, Switch } from '@mantine/core';
import { Rotas } from '@/utils/constants/rotas';
import { useDisclosure } from '@mantine/hooks';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import { useState } from 'react';
import axios from 'axios';
import { Player } from '@/utils/models/player';
import { SwitchePlayer } from '../Switche/SwitchePlayer';
import { HandleEditPlayer, Sucess, Error } from '@/pages/PlayerPage/util';

interface Props {
  edit?: boolean
  close: () => void
  updateTable: () => void
  player?: Player
}

export function PlayerForm({ edit, close, updateTable, player }: Props) {
  const [visible, { toggle }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [active, setActive] = useState(true);

  const form = useForm({
    initialValues: {
      id: player ? player.id : 0,
      name: player ? player.nome : '',
      email: player ? player.email : '',
      nickName: player ? player.apelido : '',
      pontos: player ? player.pontos : 0,
      flAtivo: player ? player.flAtivo : true,
      urlImagem: player ? player.urlImagem : selectedImage,
      titulos: player ? player.titulos : 0
    },

    validate: {
      name: hasLength({ min: 2, max: 50 }, 'Name must be 2-10 characters long'),
      // email: isEmail('Invalid email'),
      nickName: hasLength({ min: 2, max: 50 }, 'Name must be 2-10 characters long'),
    },
  });

  const createPlayer = async () => {
    toggle()
    try {
      const formData = new FormData();
      formData.append('nome', form.values.name);
      formData.append('email', form.values.email);
      formData.append('apelido', form.values.nickName);
      formData.append('pontos', (edit ? form.values.pontos : 0).toString());
      formData.append('flAtivo', (edit? form.values.flAtivo : true).toString());
      if (selectedImage) {
        formData.append('imagem', selectedImage);
      }

      const response = await axios.post(Rotas.PLAYERS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status == 200 || response.status == 201) {
        toggle();
        close();
        toast.success('Jogador cadastrado com sucesso!', {
          position: 'top-right', // Posição do Toast
          autoClose: 3000, // Duração em milissegundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        updateTable();
      } else {
        toast.error(`Erro ao enviar os dados para a API:', ${response.statusText}`, {
          position: 'top-right', // Posição do Toast
          autoClose: 3000, // Duração em milissegundos
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error();
      }
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
    } finally {
      toggle();
      close();
    }
  }

  const editPlayer = async () => {
    toggle()

    console.log(form.values.flAtivo)

    const formData = new FormData();
    formData.append('id', (edit ? form.values.id : 0).toString());
    formData.append('nome', form.values.name);
    formData.append('email', form.values.email);
    formData.append('apelido', form.values.nickName);
    formData.append('pontos', (edit ? form.values.pontos : 0).toString());
    formData.append('flAtivo', (edit ? active : form.values.flAtivo).toString());
    selectedImage ? formData.append('imagem', selectedImage) :
                    formData.append('imagem', form.values.urlImagem || '');
    formData.append('titulos', form.values.titulos.toString());

    HandleEditPlayer(player?.id || null, formData)
    .then((data) => {
      updateTable();
      toggle();
      close();
      Sucess('Jogador atualizado com sucesso!')
    })
    .catch((error) => {
      console.error(error)
      Error(`Erro ao editar jogador: ${error}`)
      toggle();
      close();
    })
  }

  const handleSubmit = () => {
    edit ? editPlayer() : createPlayer()
  }

  return (
    <Box component="form" maw={400} mx="auto" onSubmit={form.onSubmit(() => handleSubmit())}>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <TextInput label="Nome" placeholder="Nome" withAsterisk {...form.getInputProps('name')} />
      <TextInput
        label="Email"
        placeholder="Seu email"
        withAsterisk
        mt="md"
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Apelido"
        placeholder="Seu apelido"
        withAsterisk
        mt="md"
        {...form.getInputProps('nickName')}
      />
      {edit &&
        <>
          <TextInput
            label="Pontos"
            withAsterisk
            mt="sm"
            {...form.getInputProps('pontos')}
          />
          <TextInput
            label="Títulos"
            withAsterisk
            mt="sm"
            {...form.getInputProps('titulos')}
          />
          <SwitchePlayer
            InitialChecked={player?.flAtivo || false}
            setActive={setActive} 
            {...form.getInputProps('flAtivo')}
          />
        </>
      }

      <DropzoneButton
        onSelectImage={(file) => setSelectedImage(file)}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">{player ? 'Editar' : 'Cadastrar'}</Button>
      </Group>
    </Box>
  );
}
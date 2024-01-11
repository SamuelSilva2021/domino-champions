import React, { useState, useEffect } from 'react';
import '../index.css';
import { FiEdit2 } from 'react-icons/fi';
import { IoSaveOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";

const url = 'https://localhost:7009/api/Jogadores/';

const PlayerTable = () => {
  const [jogadores, setJogadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [editedPlayerName, setEditedPlayerName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJogadores();
  }, []);

  const fetchJogadores = () => {
    setLoading(true);
    fetch(url) // Altere a porta para 7009
      .then(response => response.json())
      .then(data => {
        setJogadores(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os jogadores:', error);
        console.log(error)
        setLoading(false);
      });
  };  

  const addPlayer = () => {
    setShowModal(true);
    setEditingPlayer(null);
    setEditedPlayerName('');
  };

  const deletePlayer = playerId => {
    fetch(url + playerId, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Jogador removido com sucesso') {
          setJogadores(jogadores.filter(player => player.id !== playerId));
        } else {
          // Lógica de tratamento para outras mensagens de erro, se necessário
        }
      })
      .catch(error => {
        console.error('Erro ao remover o jogador:', error);
      });
  };

  const editPlayer = player => {
    setEditingPlayer(player);
    setEditedPlayerName(player.nome);
    setShowModal(true);
  };

  const filterPlayers = jogador => {
    if (searchTerm === '') {
      return true;
    } else {
      return jogador.nome.toLowerCase().includes(searchTerm.toLowerCase());
    }
  };

  const savePlayer = async () => {
    setSaving(true);
    setError(null);

    try {
      if (editingPlayer) {
        // Editar jogador existente
        const updatedPlayer = {
          id: editingPlayer.id,
          nome: editedPlayerName,
        };

        const response = await fetch(url + editingPlayer.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPlayer),
        });

        const data = await response.json();
        if (response.ok) {
          const updatedJogadores = jogadores.map(player =>
            player.id === editingPlayer.id ? { ...player, nome: editedPlayerName } : player
          );
          setJogadores(updatedJogadores);
          setShowModal(false);
          setEditingPlayer(null);
          setEditedPlayerName('');
        } else {
          setError(data.message);
        }
      } else {
        // Adicionar novo jogador
        const newPlayer = {
          nome: newPlayerName,
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPlayer),
        });

        const data = await response.json();
        if (response.ok) {
          fetchJogadores(); // Buscar jogadores atualizados após adicionar um novo jogador
          setShowModal(false);
          setNewPlayerName('');
        } else {
          setError(data.message);
        }
      }
    } catch (error) {
      console.error('Erro ao salvar o jogador:', error);
      setError('Erro ao salvar o jogador. Por favor, tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex items-center mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Pesquisar jogador"
            className="p-2 border border-gray-300 rounded-md mr-2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={addPlayer}
          >
            Adicionar
          </button>
        </div>
      </div>

      {loading ? (
        <p>Carregando jogadores...</p>
      ) : (
        <table className="w-1/2">
          <thead>
            <tr className='bg-blue-200 border-b'>
              <th className="py-2">Nome</th>
              <th className="py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {jogadores.length > 0 ? jogadores.filter(filterPlayers).map(player => (
              <tr key={player.id} className='itens-center border-b-2 cursor-pointer hover:bg-blue-200'>
                <td className='text-center'>{player.nome}</td>
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      onClick={() => editPlayer(player)}
                    >
                      <FiEdit2 className="mr-2" /> Editar
                    </button>
                    <button
                      className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => deletePlayer(player.id)}
                    >
                      <RiDeleteBin6Line className='mr-2'/>
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            )) : <></>}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editingPlayer ? 'Editar jogador' : 'Adicionar jogador'}
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <label htmlFor="playerName" className="block font-medium mb-2">
                Nome do jogador
              </label>
              <input
                type="text"
                id="playerName"
                className="p-2 border border-gray-300 rounded-md w-full"
                value={editingPlayer ? editedPlayerName : newPlayerName}
                onChange={e =>
                  editingPlayer
                    ? setEditedPlayerName(e.target.value)
                    : setNewPlayerName(e.target.value)
                }
              />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={savePlayer}
                disabled={saving}
              >
                <IoSaveOutline className="mr-2" />
                {saving ? 'Salvando...' : editingPlayer ? 'Salvar' : 'Adicionar'}
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowModal(false)}
                disabled={saving}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerTable;

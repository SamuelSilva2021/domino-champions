import React, { useState, useEffect } from 'react';
import '../index.css';
import { FiEdit2 } from 'react-icons/fi';
import { IoSaveOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from "react-icons/ri";

const url = 'https://localhost:7009/api/Duplas/';

const Duplas = () => {
    const [duplas, setDuplas] = useState([]);
    const [jogadores, setJogadores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [newDuplaName, setNewDuplaName] = useState('');
    const [selectedJogador1, setSelectedJogador1] = useState('');
    const [selectedJogador2, setSelectedJogador2] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingDupla, setEditingDupla] = useState(null);
    const [editedNomeDupla, setEditedNomeDupla] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDuplas();
    }, []);

      const fetchDuplas = () => {
        setLoading(true);
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setDuplas(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Erro ao buscar as duplas:', error);
            setLoading(false);
          });
      };

    const addDupla = () => {
        setShowModal(true);
        setEditingDupla(null);
        setEditedNomeDupla('');
        fetchJogadores();
    };  

    const deleteDupla = (duplaId) => {
        fetch(url + duplaId, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(data => {
            if (data.message === 'Dupla removida com sucesso') {
              setDuplas(duplas.filter(dupla => dupla.id !== duplaId));
              fetchDuplas(); // Adicionada chamada de fetchDuplas() após a remoção bem-sucedida
            } else {
              // Lógica de tratamento para outras mensagens de erro, se necessário
            }
          })
          .catch(error => {
            console.error('Erro ao remover a dupla:', error);
          });
      };
      
    const editDupla = dupla => {
        setEditingDupla(dupla);
        setEditedNomeDupla(dupla.name);
        setShowModal(true);
        fetchJogadores()
    };

    const filterDupla = dupla => {
        console.log(dupla)
        if (searchTerm === '') {
            return true;
        } else {
            if (dupla && dupla.name && searchTerm) {
                return dupla.name.toLowerCase().includes(searchTerm.toLowerCase());
            } else {
                return false;
            }
        }
    };
    

    const saveDupla = async () => {
        setSaving(true);
        setError(null);

        try {
            if (editingDupla) {
                // Editar dupla existente
                const updatedDupla = {
                  id: editingDupla.id,
                  name: editedNomeDupla, // Alterado de "nome" para "name"
                  jogador1: {
                    id: selectedJogador1,
                    nome: jogadores.find(jogador => jogador.id == selectedJogador1)?.nome || '',
                  },
                  jogador2: {
                    id: selectedJogador2,
                    nome: jogadores.find(jogador => jogador.id == selectedJogador2)?.nome || '',
                  },
                };
                const response = await fetch(url + editingDupla.id, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updatedDupla),
                });
              
                if (response.ok) {
                  const updatedDuplas = duplas.map(dupla =>
                    dupla.id === editingDupla.id ? { ...dupla, name: editedNomeDupla } : dupla
                  );
                  setDuplas(updatedDuplas);
                  setShowModal(false);
                  setEditingDupla(null);
                  setEditedNomeDupla('');
                  fetchDuplas();
                } else {
                    const errorResponse = await response.json();
                    
                    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
                        const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
                        throw new Error(errorMessages);
                    } else if (errorResponse.message) {
                        throw new Error(errorResponse.message);
                    } else {
                        throw new Error('Erro ao salvar a dupla. Por favor, tente novamente.');
                    }
                }
              }
              else {
                // Adicionar nova dupla
                const newDupla = {
                    name: newDuplaName,
                    jogador1: {
                        id: selectedJogador1,
                        nome: jogadores.find(jogador => jogador.id == selectedJogador1)?.nome || '',
                    },
                    jogador2: {
                        id: selectedJogador2,
                        nome: jogadores.find(jogador => jogador.id == selectedJogador2)?.nome || '',
                    },
                };
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newDupla),
                });

                if (response.ok) {
                    fetchDuplas();
                    setShowModal(false);
                    setNewDuplaName('');
                } else {
                    const errorResponse = await response.json();
                    
                    if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
                        const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
                        throw new Error(errorMessages);
                    } else if (errorResponse.message) {
                        throw new Error(errorResponse.message);
                    } else {
                        throw new Error('Erro ao salvar a dupla. Por favor, tente novamente.');
                    }
                }
            }
        } catch (error) {
            console.error('Erro ao salvar a dupla:', error);
            setError(error.message || 'Erro ao salvar a dupla. Por favor, tente novamente.');
        } finally {
            setSaving(false);
        }
    };

    const fetchJogadores = () => {
        setLoading(true);
        fetch('https://localhost:7009/api/jogadores/') // Altere a porta para 7009
            .then(response => response.json())
            .then(data => {
                setJogadores(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar os jogadores:', error);
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-2 md:mb-0">
                    <input
                        type="text"
                        placeholder="Pesquisar dupla"
                        className="p-2 border border-gray-300 rounded-md mr-2"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={addDupla}
                    >
                        Adicionar
                    </button>
                </div>
            </div>

            {loading ? (
                <p>Carregando duplas...</p>
            ) : (
                <table className="w-full">
                    <thead>
                        <tr className='bg-blue-200 border-b'>
                            <th className="py-2">Nome</th>
                            <th className="py-2">Jogador 1</th>
                            <th className="py-2">Jogador 2</th>
                            <th className="py-2 w-5">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {duplas.filter(filterDupla).map(dupla => (
                            <tr key={dupla.id} className='items-center border-b-2 cursor-pointer hover:bg-blue-200'>
                                <td className='text-center'>{dupla.name}</td>
                                <td className='text-center'>{dupla.jogador1.nome}</td>
                                <td className='text-center'>{dupla.jogador2.nome}</td>
                                <td>
                                    <div className="flex gap-2 justify-end ">
                                        <button
                                            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={() => editDupla(dupla)}
                                        >
                                            <FiEdit2 className="mr-2" /> Editar
                                        </button>
                                        <button
                                            className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-md"
                                            onClick={() => deleteDupla(dupla.id)}
                                        >
                                            <RiDeleteBin6Line className='mr-2' />
                                            Deletar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingDupla ? 'Editar dupla' : 'Adicionar dupla'}
                        </h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="mb-4">
                            <label htmlFor="duplaName" className="block font-medium mb-2">
                                Nome da dupla
                            </label>
                            <input
                                required
                                type="text"
                                id="duplaName"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                value={editingDupla ? editedNomeDupla : newDuplaName}
                                onChange={e =>
                                    editingDupla
                                        ? setEditedNomeDupla(e.target.value)
                                        : setNewDuplaName(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Jogador1" className="block font-medium mb-2">
                                Jogador1
                            </label>
                            <select
                                name="Jogador1"
                                id="Jogador1"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                value={selectedJogador1}
                                onChange={e => setSelectedJogador1(e.target.value)}
                            >
                                <option value="">Selecione um jogador</option>
                                {jogadores.map(jogador => (
                                    <option value={jogador.id} key={jogador.id}>
                                        {jogador.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Jogador2" className="block font-medium mb-2">
                                Jogador2
                            </label>
                            <select
                                name="Jogador2"
                                id="Jogador2"
                                className="p-2 border border-gray-300 rounded-md w-full"
                                value={selectedJogador2}
                                onChange={e => setSelectedJogador2(e.target.value)}
                            >
                                <option value="">Selecione um jogador</option>
                                {jogadores.map(jogador => (
                                    <option value={jogador.id} key={jogador.id}>
                                        {jogador.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={saveDupla}
                                disabled={saving}
                            >
                                <IoSaveOutline className="mr-2" />
                                {saving ? 'Salvando...' : editingDupla ? 'Salvar' : 'Adicionar'}
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

export default Duplas;
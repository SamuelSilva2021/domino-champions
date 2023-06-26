import React, { useState, useEffect } from 'react';
import { IoSaveOutline } from 'react-icons/io5';

const urlDuplas = 'https://localhost:7009/api/Duplas/';
const urlConfrontosConcluidos = 'https://localhost:7009/api/Confrontos/concluido/true';
const urlConfrontosAndamento = 'https://localhost:7009/api/Confrontos/concluido/false';
const urlRakingDuplas = 'https://localhost:7009/api/Duplas/ranking';
const urlRankingJogadores = 'https://localhost:7009/api/Jogadores/ranking';
const urlConfronto = 'https://localhost:7009/api/Confrontos/';

const AoVivo = () => {
    const [confrontosAndamento, setConfrontosAndamento] = useState([]);
    const [confrontosConcluido, setConfrontosConcluido] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rankingDuplas, setRankingDuplas] = useState([]);
    const [rankingJogadores, setRankingJogadores] = useState([]);
    const [confronto, setConfronto] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a exibição do modal

    useEffect(() => {
        fetchConfrontosAndamento();
        fetchConfrontosConcluido();
        fetchRakingDuplas();
        fetchRankingJogadores();
    }, []);

    const fetchRakingDuplas = () => {
        setLoading(true);
        fetch(urlRakingDuplas)
            .then(response => response.json())
            .then(data => {
                setRankingDuplas(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar ranking', error);
                setLoading(false);
            })
    }

    const fetchRankingJogadores = () => {
        setLoading(true)
        fetch(urlRankingJogadores)
            .then(response => response.json())
            .then(data => {
                setRankingJogadores(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar ranking de jogadores', error)
                setLoading(false);
            });
    }

    const fetchConfrontosAndamento = () => {
        setLoading(true);
        fetch(urlConfrontosAndamento)
            .then(response => response.json())
            .then(data => {
                setConfrontosAndamento(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar as duplas:', error);
                setLoading(false);
            });
    };

    const fetchConfrontosConcluido = () => {
        setLoading(true);
        fetch(urlConfrontosConcluidos)
            .then(response => response.json())
            .then(data => {
                setConfrontosConcluido(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar as duplas:', error);
                setLoading(false);
            });
    };

    const handleOpenModal = (id) => {
        setLoading(true);
        fetch(urlConfronto + id)
            .then(response => response.json())
            .then(dados => {
                setConfronto(dados);
                console.log(dados)
                setLoading(false);
                setModalOpen(true);
            })
            .catch(error => {
                console.error('Erro ao buscar confronto', error);
                setLoading(false);
            })
    }
    const finalizaConfronto = (id) => {
        setLoading(true);
        // Fazer a requisição para salvar os dados do confronto
        // no servidor e tratar a resposta, se necessário
      };

    return (
        <div className='grid grid-cols-10 gap-1 w-full' onClick={() => setModalOpen(false)}>
            <div className='col-span-4'>
                <div className="container mx-auto mb-5">
                    <table className="table-auto">
                        <thead>
                            <tr className='bg-slate-300'>
                                <th className="px-4 py-2">Dupla</th>
                                <th className="px-4 py-2">J</th>
                                <th className="px-4 py-2">Pontos</th>
                                <th className="px-4 py-2">Pt. Batida</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingDuplas.map((dupla, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="border px-4 py-2">{dupla.name}</td>
                                    <td className="border px-4 py-2">{dupla.partidasConcluidas}</td>
                                    <td className="border px-4 py-2">{dupla.pontos}</td>
                                    <td className="border px-4 py-2">{dupla.pontosBatida}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="container mx-auto">
                    <table className="table-auto">
                        <thead>
                            <tr className='bg-slate-300'>
                                <th className="px-4 py-2">Jogador</th>
                                <th className="px-4 py-2">Pontos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingJogadores.map((jogador, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="border px-4 py-2">{jogador.nome}</td>
                                    <td className="border px-4 py-2">{jogador.pontos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='col-span-3'>
                <h2 className="text-center text-2xl font-bold mb-4 bg-slate-300">Em andamento</h2>
                {confrontosAndamento.map((confronto) => (
                    <div key={confronto.id}>
                        <div className="bg-blue-300 shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2 m-5 hover:bg-blue-400 cursor-pointer"
                            onClick={() => handleOpenModal(confronto.id)}>
                            <div className="flex items-end justify-center space-x-2 h-10">
                                <div className="font-bold text-lg">{confronto.dupla1Nome}</div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-lg">({parseInt(confronto.dupla1Jogador1Pontos) + parseInt(confronto.dupla1Jogador2Pontos)})</span>
                                    <span className="text-xl font-bold">vs</span>
                                    <span className="text-gray-600 text-lg">({parseInt(confronto.dupla2Jogador1Pontos) + parseInt(confronto.dupla2Jogador2Pontos)})</span>
                                </div>
                                <div className="font-bold text-lg">{confronto.dupla2Nome}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-span-3'>
                <h2 className="text-center text-2xl font-bold mb-4 bg-slate-300">Concluído</h2>
                {confrontosConcluido.map((confronto) => (
                    <div key={confronto.id}>
                        <div className="bg-green-300 shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2 m-5 hover:bg-green-400 cursor-pointer"
                            onClick={() => handleOpenModal(confronto.id)}>
                            <div className="flex items-end justify-center space-x-2 h-10">
                                <div className="font-bold text-lg">{confronto.dupla1Nome}</div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-600 text-lg">({parseInt(confronto.dupla1Jogador1Pontos) + parseInt(confronto.dupla1Jogador2Pontos)})</span>
                                    <span className="text-xl font-bold">vs</span>
                                    <span className="text-gray-600 text-lg">({parseInt(confronto.dupla2Jogador1Pontos) + parseInt(confronto.dupla2Jogador2Pontos)})</span>
                                </div>
                                <div className="font-bold text-lg">{confronto.dupla2Nome}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* {modalOpen && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                <div>
                <div className="flex items-end justify-center space-x-2 h-10">
                        <div className="font-bold text-lg">{confronto.dupla1Nome}</div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">({parseInt(confronto.dupla1Jogador1Pontos) + parseInt(confronto.dupla1Jogador2Pontos)})</span>
                            <span className="text-xl font-bold">vs</span>
                            <span className="text-gray-600">({parseInt(confronto.dupla2Jogador1Pontos) + parseInt(confronto.dupla2Jogador2Pontos)})</span>
                        </div>
                        <div className="font-bold text-lg">{confronto.dupla2Nome}</div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2">
                        <div>
                            <div className="flex items-center">
                                <div className='w-20 text-end'>
                                    <span>{confronto.dupla1Jogador1Nome}</span>
                                </div>
                                <div className="ml-2">
                                    <input
                                        type="number"
                                        value={confronto.dupla1Jogador1Pontos}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setConfronto((prevConfrontos) =>
                                                prevConfrontos.map((prevConfronto) => {
                                                    if (prevConfronto.id === confronto.id) {
                                                        prevConfronto.dupla1Jogador1Pontos = value;
                                                        prevConfronto.pontosDupla1 =
                                                            parseInt(value) + parseInt(prevConfronto.dupla1Jogador2Pontos);
                                                    }
                                                    return prevConfronto;
                                                })
                                            );
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                    />
                                </div>
                                <div className='w-20 text-end'>
                                    <span>{confronto.dupla1Jogador2Nome}</span>
                                </div>
                                <div className="ml-2">
                                    <input
                                        type="number"
                                        value={confronto.dupla1Jogador2Pontos}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setConfronto((prevConfrontos) =>
                                                prevConfrontos.map((prevConfronto) => {
                                                    if (prevConfronto.id === confronto.id) {
                                                        prevConfronto.dupla1Jogador2Pontos = value;
                                                        prevConfronto.pontosDupla1 =
                                                            parseInt(value) + parseInt(prevConfronto.dupla1Jogador1Pontos);
                                                    }
                                                    return prevConfronto;
                                                })
                                            );
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="mx-2 w-10 text-center">
                        </div>

                        <div>
                            <div className="flex items-center">
                                <div className='w-20 text-end'>
                                    <span>{confronto.dupla2Jogador1Nome}</span>
                                </div>
                                <div className='ml-2 w-20'>
                                    <input
                                        type="number"
                                        value={confronto.dupla2Jogador1Pontos}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setConfronto(prevConfrontos => prevConfrontos.map(prevConfronto => {
                                                if (prevConfronto.id === confronto.id) {
                                                    prevConfronto.dupla2Jogador1Pontos = value;
                                                    prevConfronto.pontosDupla2 = parseInt(prevConfronto.dupla2Jogador2Pontos) + parseInt(value);
                                                }
                                                return prevConfronto;
                                            }));
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                    />
                                </div>
                                <div className='w-20 text-end'>
                                    <span>{confronto.dupla2Jogador2Nome}</span>
                                </div>
                                <div className='ml-2 w-20'>
                                    <input
                                        type="number"
                                        value={confronto.dupla2Jogador2Pontos}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setConfronto(prevConfrontos => prevConfrontos.map(prevConfronto => {
                                                if (prevConfronto.id === confronto.id) {
                                                    prevConfronto.dupla2Jogador2Pontos = value;
                                                    prevConfronto.pontosDupla2 = parseInt(value) + parseInt(prevConfronto.dupla2Jogador1Pontos);
                                                }
                                                return prevConfronto;
                                            }));
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                    />
                                </div>

                            </div>
                        </div>
                        <button
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            onClick={() => finalizaConfronto(confronto.id)}
                        >
                            <IoSaveOutline className="mr-2" />
                            Salvar
                        </button>
                    </div>
                </div>
            

                </div>
            )} */}

        </div>
    );
};

export default AoVivo;

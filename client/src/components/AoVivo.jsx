    import React, { useState, useEffect } from 'react';
    import { IoSaveOutline } from 'react-icons/io5';
    import Confrontos from './Confrontos';
    import ConfrontoModal from './ConfrontoModal';


    const urlDuplas = 'https://localhost:7009/api/Duplas/';
    const urlConfrontosConcluidos = 'https://localhost:7009/api/Confrontos/concluido/true';
    const urlConfrontosAndamento = 'https://localhost:7009/api/Confrontos/concluido/false';
    const urlRakingDuplas = 'https://localhost:7009/api/Duplas/ranking';
    const urlRankingJogadores = 'https://localhost:7009/api/Jogadores/ranking';
    const urlConfronto = 'https://localhost:7009/api/Confrontos/';

    const AoVivo = () => {
        const [confrontosAndamento, setConfrontosAndamento] = useState([]);
        const [confrontosConcluido, setConfrontosConcluido] = useState([]);
        const [confrontoFinal, setConfrontoFinal] = useState([]);
        const [loading, setLoading] = useState(true);
        const [rankingDuplas, setRankingDuplas] = useState([]);
        const [rankingJogadores, setRankingJogadores] = useState([]);
        const [confronto, setConfronto] = useState({});
        const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a exibição do modal
        const [partidaConcluida, setPartidaConcluida] = useState(false);

        useEffect(() => {
            fetchConfrontosAndamento();
            fetchConfrontosConcluido();
            fetchRakingDuplas();
            fetchRankingJogadores();
            
        }, []);

        useEffect(() => {
            geraFinal();
        }, [rankingDuplas, rankingJogadores]);

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

        const handleOpenModal = (confronto, partidaConcluida) => {
            setLoading(true);
            setConfronto(confronto);
            setModalOpen(true);
            setPartidaConcluida(partidaConcluida)
        };

        const closeModal = () => {
            setModalOpen(false)
        }
        const updateAoVivo = () => {
            // Função para atualizar o componente AoVivo após a conclusão da requisição PUT do modal
            fetchConfrontosAndamento();
            fetchConfrontosConcluido();
            fetchRakingDuplas();
            fetchRankingJogadores();
        };
        const geraFinal = () => {
            if (confrontosAndamento.length < 6) {
                // Realizar a lógica para gerar o confronto da final
                const dupla1 = rankingDuplas[0];
                const dupla2 = rankingDuplas[1];

                const final = {
                    partidaId: `${dupla1?.id}_${dupla2?.id}`,
                    dupla1Id: dupla1?.id,
                    dupla1Nome: dupla1?.name,
                    dupla1Jogador1Nome: dupla1?.jogador1?.nome,
                    dupla1Jogador1Id: dupla1?.jogador1?.id,
                    dupla1Jogador1Pontos: 0,
                    dupla1Jogador2Pontos: 0,
                    dupla1Jogador2Id: dupla1?.jogador2?.id,
                    dupla1Jogador2Nome: dupla1?.jogador2?.nome,
                    pontosDupla1: 0,

                    dupla2Id: dupla2?.id,
                    dupla2Nome: dupla2?.name,
                    dupla2Jogador1Nome: dupla2?.jogador1?.nome,
                    dupla2Jogador1Id: dupla2?.jogador1?.id,
                    dupla2Jogador1Pontos: 0,
                    dupla2Jogador2Pontos: 0,
                    dupla2Jogador2Nome: dupla2?.jogador2?.nome,
                    dupla2Jogador2Id: dupla2?.jogador2?.id,
                    pontosDupla2: 0,

                    vencedorId: 0,
                    flConcluido: 0,
                    flFaseGrupos: 0,
                    flFinal:1
                };

                // Enviar o confronto final para a API ou realizar a ação necessária
                setConfrontoFinal(final);
            }
        }

        return (
            <div>
                <div className='grid grid-cols-10 gap-1 w-full'>
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
                    {confrontosAndamento.length > 0 ? 
                        <h2 className="text-center text-2xl font-bold mb-4 bg-slate-300">Em andamento ({confrontosAndamento.length})</h2> :
                        ''
                    }
                        
                        {confrontosAndamento.map((confronto) => (
                            <div key={confronto.id}>
                                <div className="bg-blue-300 shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2 m-5 hover:bg-blue-400 cursor-pointer"
                                    onClick={() => handleOpenModal(confronto, false)}>
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
                        {confrontosAndamento.length < 6 ?
                                <div>
                                    <h2 className="text-center text-2xl font-bold mb-4 bg-slate-300">Final</h2>
                                    <div key={confrontoFinal.id}>
                                        <div className="bg-blue-300 shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2 m-5 hover:bg-blue-400 cursor-pointer"
                                            onClick={() => handleOpenModal(confrontoFinal, false)}>
                                            <div className="flex items-end justify-center space-x-2 h-10">
                                                <div className="font-bold text-lg">{confrontoFinal.dupla1Nome}</div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-600 text-lg">({parseInt(confrontoFinal.dupla1Jogador1Pontos) + parseInt(confrontoFinal.dupla1Jogador2Pontos)})</span>
                                                    <span className="text-xl font-bold">vs</span>
                                                    <span className="text-gray-600 text-lg">({parseInt(confrontoFinal.dupla2Jogador1Pontos) + parseInt(confrontoFinal.dupla2Jogador2Pontos)})</span>
                                                </div>
                                                <div className="font-bold text-lg">{confrontoFinal.dupla2Nome}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : ''}
                    </div>
                    <div className='col-span-3'>
                        <h2 className="text-center text-2xl font-bold mb-4 bg-slate-300">Concluído ({confrontosConcluido.length})</h2>
                        {confrontosConcluido.map((confronto) => (
                            <div key={confronto.id}>
                                <div className="bg-green-300 shadow-lg rounded-lg p-6 flex items-center justify-center space-x-2 m-5 hover:bg-green-400 cursor-pointer"
                                    onClick={() => handleOpenModal(confronto, true)}>
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

                    {modalOpen && (
                        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                            <div>
                                <ConfrontoModal
                                    confronto={confronto}
                                    closeModal={closeModal}
                                    updateAoVivo={updateAoVivo}
                                    partidaConcluida={partidaConcluida}
                                />
                            </div>


                        </div>
                    )}

                </div>
            </div>

        );
    };

    export default AoVivo;

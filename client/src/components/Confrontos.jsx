import React, { useState, useEffect } from 'react';
import { IoSaveOutline } from 'react-icons/io5';

const urlDuplas = 'https://localhost:7009/api/Duplas/';
const urlConfrontos = 'https://localhost:7009/api/Confrontos/'

const Confrontos = () => {
    const [confrontos, setConfrontos] = useState([]);
    const [duplas, setDuplas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gerarConfroto, setGerarConfronto] = useState(false);

    useEffect(() => {
        fetchDuplas();
        fetchConfrontos();
    }, []);

    useEffect(() => {
        if (duplas.length > 0 && gerarConfroto) {
            gerarConfrontosAleatorios(duplas);
        }
    }, [duplas, gerarConfroto]);

    const fetchDuplas = () => {
        setLoading(true);
        fetch(urlDuplas)
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

    const fetchConfrontos = () => {
        setLoading(true);
        fetch(urlConfrontos)
            .then(response => response.json())
            .then(data => {
                setConfrontos(data);
                setGerarConfronto(false);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao buscar as duplas:', error);
                setLoading(false);
            });
    };

    const gerarConfrontosAleatorios = (duplas) => {
        const confrontosArray = [];

        // Gerar confrontos todas contra todas
        for (let i = 0; i < duplas.length; i++) {
            for (let j = i + 1; j < duplas.length; j++) {
                const confronto = {
                    partidaId: `${duplas[i].id}_${duplas[j].id}`,
                    dupla1Id: duplas[i].id,
                    dupla1Nome: duplas[i].name,
                    dupla1Jogador1Nome: duplas[i].jogador1.nome,
                    dupla1Jogador1Id: duplas[i].jogador1.id,
                    dupla1Jogador1Pontos: 0,
                    dupla1Jogador2Pontos: 0,
                    dupla1Jogador2Id: duplas[i].jogador2.id,
                    dupla1Jogador2Nome: duplas[i].jogador2.nome,
                    pontosDupla1: 0,

                    dupla2Id: duplas[j].id,
                    dupla2Nome: duplas[j].name,
                    dupla2Jogador1Nome: duplas[j].jogador1.nome,
                    dupla2Jogador1Id: duplas[j].jogador1.id,
                    dupla2Jogador1Pontos: 0,
                    dupla2Jogador2Pontos: 0,
                    dupla2Jogador2Nome: duplas[j].jogador2.nome,
                    dupla2Jogador2Id: duplas[j].jogador2.id,
                    pontosDupla2: 0,

                    vencedorId: 0,
                    flConcluido: 0
                };
                confrontosArray.push(confronto);
            }
        }

        // Embaralhar a lista de confrontos
        for (let i = confrontosArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [confrontosArray[i], confrontosArray[j]] = [confrontosArray[j], confrontosArray[i]];
        }

        saveConfronto(confrontosArray)
        setConfrontos(confrontosArray);
        return confrontosArray;
    };
    const finalizaConfronto = async (confrontoId) => {
        const confronto = confrontos.find((confronto) => confronto.id === confrontoId);
        // Montar o objeto com os dados do confronto para enviar para a API
        const data = {
            partidaId: confronto.partidaId,
            dupla1Id: confronto.dupla1Id,
            dupla1Nome:confronto.dupla1Nome,
            dupla1Jogador1Nome: confronto.dupla1Jogador1Nome,
            dupla1Jogador1Id: confronto.dupla1Jogador1Id,
            dupla1Jogador1Pontos: confronto.dupla1Jogador1Pontos,
            dupla1Jogador2Nome:confronto.dupla1Jogador2Nome,
            dupla1Jogador2Id: confronto.dupla1Jogador2Id,
            dupla1Jogador2Pontos: confronto.dupla1Jogador2Pontos,            
            pontosDupla1: confronto.pontosDupla1,
                        
            dupla2Id: confronto.dupla2Id,
            dupla2Nome: confronto.dupla2Nome,
            dupla2Jogador1Nome: confronto.dupla2Jogador1Nome,
            dupla2Jogador1Id: confronto.dupla2Jogador1Id,
            dupla2Jogador1Pontos: confronto.dupla2Jogador1Pontos,
            dupla2Jogador2Nome: confronto.dupla2Jogador2Nome,
            dupla2Jogador2Id: confronto.dupla2Jogador2Id,
            dupla2Jogador2Pontos: confronto.dupla2Jogador2Pontos,
            pontosDupla2: confronto.pontosDupla2,

            vencedorId: confronto.pontosDupla1 > confronto.pontosDupla2 ? confronto.dupla1Id : confronto.dupla2Id,
            flConcluido: 1
        };

        const response = await fetch(urlConfrontos + confrontoId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

        if (response.ok) {
            //Lógica
            setConfrontos((prevConfrontos) => prevConfrontos.filter((prevConfronto) => prevConfronto.id !== confrontoId));
        } else {
            const errorResponse = await response.json();

            if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
                const errorMessages = errorResponse.errors.map(error => error.message).join(', ');
                throw new Error(errorMessages);
            } else if (errorResponse.message) {
                throw new Error(errorResponse.message);
            } else {
                throw new Error('Erro ao finalizar a partida. Por favor, tente novamente.');
            }
        }

    };

    const saveConfronto = async (confronto) => {
        // Montar o objeto com os dados do confronto para enviar para a API
        for(let i = 0; confronto.length; i++){
            const data = {
                
                partidaId: confronto[i].partidaId,
                dupla1Id: confronto[i].dupla1Id,
                dupla1Nome:confronto[i].dupla1Nome,
                pontosDupla1: confronto[i].pontosDupla1,
                dupla1Jogador1Id: confronto[i].dupla1Jogador1Id,
                dupla1Jogador1Nome:confronto[i].dupla1Jogador1Nome,
                dupla1Jogador1Pontos: confronto[i].dupla1Jogador1Pontos,
                dupla1Jogador2Id: confronto[i].dupla1Jogador2Id,
                dupla1Jogador2Nome:confronto[i].dupla1Jogador2Nome,
                dupla1Jogador2Pontos: confronto[i].dupla1Jogador2Pontos,
    
                dupla2Id: confronto[i].dupla2Id,
                dupla2Nome:confronto[i].dupla2Nome,
                pontosDupla2: confronto[i].pontosDupla2,
                dupla2Jogador1Id: confronto[i].dupla2Jogador1Id,
                dupla2Jogador1Nome:confronto[i].dupla2Jogador1Nome,
                dupla2Jogador1Pontos: confronto[i].dupla2Jogador1Pontos,
                dupla2Jogador2Id: confronto[i].dupla2Jogador2Id,
                dupla2Jogador2Nome:confronto[i].dupla2Jogador2Nome,
                dupla2Jogador2Pontos: confronto[i].dupla2Jogador2Pontos,
    
                vencedorId: confronto[i].pontosDupla1 > confronto[i].pontosDupla2 ? confronto[i].dupla1Id : confronto[i].dupla2Id,
                flConcluido: confronto[i].flConcluido
            };
            const response = await fetch(urlConfrontos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                //Lógica
                fetchConfrontos();
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
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className="text-center text-2xl font-bold mb-4">Confrontos</h2>
            {confrontos.length > 0 ? '' : <button
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => setGerarConfronto(true)}
            >
                <IoSaveOutline className="mr-2" />
                Gerar confrontos
            </button>}
            
            
            {confrontos.map((confronto) => (
                
                <div key={confronto.partidaId}>
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
                                            setConfrontos((prevConfrontos) =>
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
                                        min="0"
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
                                            setConfrontos((prevConfrontos) =>
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
                                        min="0"
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
                                            setConfrontos(prevConfrontos => prevConfrontos.map(prevConfronto => {
                                                if (prevConfronto.id === confronto.id) {
                                                    prevConfronto.dupla2Jogador1Pontos = value;
                                                    prevConfronto.pontosDupla2 = parseInt(prevConfronto.dupla2Jogador2Pontos) + parseInt(value);
                                                }
                                                return prevConfronto;
                                            }));
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                        min="0"
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
                                            setConfrontos(prevConfrontos => prevConfrontos.map(prevConfronto => {
                                                if (prevConfronto.id === confronto.id) {
                                                    prevConfronto.dupla2Jogador2Pontos = value;
                                                    prevConfronto.pontosDupla2 = parseInt(value) + parseInt(prevConfronto.dupla2Jogador1Pontos);
                                                }
                                                return prevConfronto;
                                            }));
                                        }}
                                        className="border border-gray-300 rounded-md px-2 py-1 w-20"
                                        min="0"
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
            ))}
        </div>
    );
};

export default Confrontos;

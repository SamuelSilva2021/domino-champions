import { useState } from 'react';
import { IoSaveOutline } from 'react-icons/io5';
import { AiOutlineClose } from 'react-icons/ai';

const urlConfrontos = 'https://localhost:7009/api/Confrontos/'

const ConfrontoModal = ({ confronto, closeModal, updateAoVivo, partidaConcluida }) => {
  const [confrontoData, setConfrontoData] = useState(confronto);

  const finalizaConfronto = async (confronto) => {
    const data = {
      partidaId: confronto.partidaId,
      dupla1Id: confronto.dupla1Id,
      dupla1Nome: confronto.dupla1Nome,
      dupla1Jogador1Nome: confronto.dupla1Jogador1Nome,
      dupla1Jogador1Id: confronto.dupla1Jogador1Id,
      dupla1Jogador1Pontos: confronto.dupla1Jogador1Pontos,
      dupla1Jogador2Nome: confronto.dupla1Jogador2Nome,
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

    const response = await fetch(urlConfrontos + confronto.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      closeModal(); // Fechar o modal
      updateAoVivo(); // Atualizar o componente AoVivo
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

  const handleInputChange = (e, jogadorIndex) => {
    const { value } = e.target;

    setConfrontoData((prevConfronto) => {
      let updatedConfronto = { ...prevConfronto };

      if (jogadorIndex === 1) {
        updatedConfronto.dupla1Jogador1Pontos = value;
        updatedConfronto.pontosDupla1 = parseInt(value) + parseInt(updatedConfronto.dupla1Jogador2Pontos);
      } else if (jogadorIndex === 2) {
        updatedConfronto.dupla1Jogador2Pontos = value;
        updatedConfronto.pontosDupla1 = parseInt(value) + parseInt(updatedConfronto.dupla1Jogador1Pontos);
      } else if (jogadorIndex === 3) {
        updatedConfronto.dupla2Jogador1Pontos = value;
        updatedConfronto.pontosDupla2 = parseInt(value) + parseInt(updatedConfronto.dupla2Jogador2Pontos);
      } else if (jogadorIndex === 4) {
        updatedConfronto.dupla2Jogador2Pontos = value;
        updatedConfronto.pontosDupla2 = parseInt(value) + parseInt(updatedConfronto.dupla2Jogador1Pontos);
      }

      return updatedConfronto;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="relative">
        <button
          onClick={closeModal}
          className=" bg-red-400 text-white hover:text-white focus:outline-none hover:bg-red-500 rounded-md p-2 absolute top-0 right-0 mt-2 mr-2"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>

      <div className="flex items-end justify-center space-x-2 h-10">
        <div className="font-bold text-lg">{confrontoData.dupla1Nome}</div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">
            ({parseInt(confrontoData.dupla1Jogador1Pontos) + parseInt(confrontoData.dupla1Jogador2Pontos)})
          </span>
          <span className="text-xl font-bold">vs</span>
          <span className="text-gray-600">
            ({parseInt(confrontoData.dupla2Jogador1Pontos) + parseInt(confrontoData.dupla2Jogador2Pontos)})
          </span>
        </div>
        <div className="font-bold text-lg">{confrontoData.dupla2Nome}</div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className='w-20 text-end'>
              <span>{confrontoData.dupla1Jogador1Nome}</span>
            </div>
            <div className="ml-2">
              <input
                type="number"
                value={confrontoData.dupla1Jogador1Pontos}
                onChange={(e) => handleInputChange(e, 1)}
                className="border border-gray-300 rounded-md px-2 py-1 w-20"
                min="0"
                disabled={partidaConcluida}
              />
            </div>
            <div className='w-20 text-end'>
              <span>{confrontoData.dupla1Jogador2Nome}</span>
            </div>
            <div className="ml-2"><input
              type="number"
              value={confrontoData.dupla1Jogador2Pontos}
              onChange={(e) => handleInputChange(e, 2)}
              className="border border-gray-300 rounded-md px-2 py-1 w-20"
              min="0"
              disabled={partidaConcluida}
            /></div>
          </div>

        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className='w-20 text-end'>
              <span>{confrontoData.dupla2Jogador1Nome}</span>
            </div>
            <div className="ml-2">
              <input
                type="number"
                value={confrontoData.dupla2Jogador1Pontos}
                onChange={(e) => handleInputChange(e, 3)}
                className="border border-gray-300 rounded-md px-2 py-1 w-20"
                min="0"
                disabled={partidaConcluida}
              />
            </div>
            <div className='w-20 text-end'>
              <span>{confrontoData.dupla2Jogador2Nome}</span>
            </div>
            <div className="ml-2">
              <input
                type="number"
                value={confrontoData.dupla2Jogador2Pontos}
                onChange={(e) => handleInputChange(e, 4)}
                className="border border-gray-300 rounded-md px-2 py-1 w-20"
                min="0"
                disabled={partidaConcluida}
              />
            </div>
          </div>
        </div>
      </div>

      {!partidaConcluida ? <div className="flex justify-center mt-6">
        <button
          onClick={() => finalizaConfronto(confrontoData)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center space-x-2"
        >
          <IoSaveOutline />
          <span>Salvar</span>
        </button>
      </div> : ''}
    </div>
  );
};

export default ConfrontoModal;

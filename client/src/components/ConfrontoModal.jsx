import React from 'react';

const ConfrontoModal = ({
  confronto,
  handleInputChange,
  finalizaConfronto
}) => {
  return (
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
              onChange={(e) => handleInputChange(e, confronto.id, 'dupla1Jogador1Pontos')}
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
              onChange={(e) => handleInputChange(e, confronto.id, 'dupla1Jogador2Pontos')}
              className="border border-gray-300 rounded-md px-2 py-1 w-20"
            />
          </div>
        </div>
      </div>
      <div className="mx-2 w-10 text-center"></div>
      <div>
        <div className="flex items-center">
          <div className='w-20 text-end'>
            <span>{confronto.dupla2Jogador1Nome}</span>
          </div>
          <div className='ml-2 w-20'>
            <input
              type="number"
              value={confronto.dupla2Jogador1Pontos}
              onChange={(e) => handleInputChange(e, confronto.id, 'dupla2Jogador1Pontos')}
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
              onChange={(e) => handleInputChange(e, confronto.id, 'dupla2Jogador2Pontos')}
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
  );
};

export default ConfrontoModal;

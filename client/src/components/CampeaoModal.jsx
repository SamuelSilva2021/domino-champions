import Modal from 'react-modal';
import Confetti from 'react-confetti';
import './CampeaoModal.css'; // Importe o arquivo CSS para adicionar os estilos personalizados
import { IoSaveOutline } from 'react-icons/io5';


// Estilos personalizados para o modal
const customModalStyles = {
    content: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinhar no topo
        maxWidth: '50%', // Largura máxima do modal
        margin: '0 auto', // Centraliza o modal horizontalmente
        overflow: 'hidden', // Remove a barra de rolagem
    },
};

const CampeaoModal = ({ isOpen, dadosFinal, onRequestClose, }) => {

    const handlerEnd = () => {
        onRequestClose();
    }
    return (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={customModalStyles}
                contentLabel="Champion Modal"
                className='animated-card'
            >
                <Confetti width={window.innerWidth} height={window.innerHeight} />
                <h2 className="highlighted-name mt-36">Time campeão</h2>
                <h2 className="highlighted-player font-bold mt-9">{dadosFinal.duplaNome}</h2>
                <h2 className="highlighted-name mt-20">Maior pontuador</h2>
                <h2 className="highlighted-player font-bold mt-9"> {dadosFinal.jogadorNome} {dadosFinal.pontosJogador} Pontos</h2>

                <div className="flex justify-center items-center h-full mt-0">
                    <button
                        onClick={handlerEnd}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex justify-center items-center space-x-2"
                    >
                        <IoSaveOutline />
                        <span>Finalizar</span>
                    </button>
                </div>
            </Modal>

    );
};

export default CampeaoModal;

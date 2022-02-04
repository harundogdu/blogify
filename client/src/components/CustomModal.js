import React from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';

const CustomModal = ({ modalIsOpen, setIsOpen, children, modalTitle }) => {
    React.useEffect(() => {
        Modal.setAppElement('#root');
    }, []);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "600px",
            padding: "60px 40px",
            borderRadius: "10px",
        },
    };
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className='w-full h-full flex items-center justify-center bg-red-600'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className='flex justify-between items-center my-4'>
                    <h2 className='text-lg'>{modalTitle}</h2>
                    <button onClick={closeModal}><IoMdClose size={16} /></button>
                </div>
                {children}
            </Modal>
        </div>
    );
};

export default CustomModal;
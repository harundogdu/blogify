import React from 'react';
import Modal from 'react-modal';
import { IoMdClose } from 'react-icons/io';

const CustomModal = ({ modalIsOpen, setIsOpen, children, modalTitle }) => {
    React.useEffect(() => {
        Modal.setAppElement('#root');
    }, []);

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className="w-11/12 h-3/4 md:h-fit md:w-1/2 rounded-lg bg-white px-6 py-8 shadow-lg absolute outline-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
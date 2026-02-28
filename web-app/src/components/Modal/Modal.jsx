import React from 'react';

function Modal({ isOpen, closeModal, children, title }) {
    return (
        <div className={`modal overlay d-${isOpen ? 'flex' : 'none'}`}>
            <div className="modalContainer">
                <div className="topbar">
                    <div className="title">
                        {title}
                    </div>
                    <div className="modalControls">
                        <button className="modalControlButtons" onClick={closeModal}>✖</button>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default Modal

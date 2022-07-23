import { useState } from 'react';
import './ModalInput.scss'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';


function ModalInput() {
    const handleInput = () => {
    }
    const [value, setValue] = useState('');
    const [arrValue, setarrValue] = useState([]);

    const onClose = () => {
        console.log("close")
        // this.props.setContentOfConfirmModal({
        //     isOpen: false,
        //     messageId: "",
        //     handleFunc: null,
        //     dataFunc: null
        // });
    }
    return (
        <Modal className='confirm-modal'>
            <div className="modal-header">
                <div className="modal-title">
                    Confim
                </div>
                <div className="col-auto">
                    <button className="btn btn-close" onClick={() => onClose()}>
                        <i className="fal fa-times" />
                    </button>
                </div>
            </div>

            <div className="modal-body">
                <div className="confirm-modal-content">
                    <div className="row">
                        <div className="col-12">
                            Hêllo
                        </div>

                        <hr />

                        <div className="col-12">
                            <div className="btn-container text-center">
                                <button className="btn btn-add" onClick={this.onClose} >
                                    Close
                                </button>
                                <button ref={this.acceptBtnRef} className="btn btn-add">
                                    Accpet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}
export default ModalInput
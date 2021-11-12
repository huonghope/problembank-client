import React, {useState} from 'react';
import Modal from '../DesignComponent/Modal';
import {Provider, Consumer} from './ModalContext';

export {Consumer};

export default function createModalProvider(ContentMap = {}) {
	return function ModalProvider(props) {
		const [showModal, setShowModal] = useState(false);
		const [contentId, setContentId] = useState(null);
		const [modalProps, setModalProps] = useState({});

		const handleOpen = (contentId, modalProps)=> {
			setContentId(contentId);
			setModalProps(modalProps);
			setShowModal(true);
		};

		const handleClose = ()=> {
			setShowModal(false);
		};

		const {children} = props;
		const ModalContent = ContentMap[contentId];

		return (
			<Provider
				value={{
					openModal: handleOpen,
					closeModal: handleClose,
				}}>
				{children}
				{showModal && ModalContent && (
					<Modal>
						<ModalContent {...modalProps}/>
					</Modal>
				)}
			</Provider>
		);
	};
}

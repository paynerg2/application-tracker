import React, { useState } from 'react';
import Button from '../Button/button';
import ConfirmationDialog from '../ConfirmationDialog/confirmationDialog';
import Modal from '../Modal/modal';
import TextButton from '../TextButton/textButton';

import { Actions, Container } from './ActionAccordion.styles';

interface Props {
    edit: any;
    onDelete: any;
    isOpen: boolean;
    children: React.ReactChild | React.ReactChild[];
}

function ActionAccordion({ isOpen, edit, onDelete, children }: Props) {
    const [showModal, setShowModal] = useState(false);

    const getActionButtons = () => {
        return (
            // @ts-ignore
            <Actions isOpen={isOpen}>
                <TextButton color="primary" onClick={edit}>
                    Edit
                </TextButton>
                <TextButton color="destructive" onClick={() => setShowModal(true)}>
                    Delete
                </TextButton>
                <Modal show={showModal}>
                    <ConfirmationDialog confirm={onDelete} cancel={() => setShowModal(false)} />
                </Modal>
            </Actions>
        );
    };

    return (
        <Container>
            {children}
            {getActionButtons()}
        </Container>
    );
}

export default ActionAccordion;

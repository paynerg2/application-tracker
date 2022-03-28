import React, { useState } from 'react';
import Prompt from '../Prompt/prompt';
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
                    <Prompt confirm={onDelete} cancel={() => setShowModal(false)}>
                        Are you sure you want to delete item?
                    </Prompt>
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

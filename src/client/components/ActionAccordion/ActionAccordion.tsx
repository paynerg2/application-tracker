import React from 'react';
import TextButton from '../TextButton/textButton';

import { Actions, Container } from './ActionAccordion.styles';

interface Props {
    edit: any;
    onDelete: any;
    isOpen: boolean;
    children: React.ReactChild | React.ReactChild[];
}

function ActionAccordion({ isOpen, edit, onDelete, children }: Props) {
    const getActionButtons = () => {
        return (
            // @ts-ignore
            <Actions isOpen={isOpen}>
                <TextButton color="primary" onClick={edit}>
                    Edit
                </TextButton>
                <TextButton color="destructive" onClick={onDelete}>
                    Delete
                </TextButton>
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

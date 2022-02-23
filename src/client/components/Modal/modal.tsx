import React from 'react';
import { Container } from '../Checkbox/checkbox.styles';
import { Main } from './modal.styles';

interface Props {
    show: boolean;
    children: React.ReactChild | React.ReactChild[];
}

function Modal({ show, children }: Props) {
    return (
        <Container>
            <Main showModal={show}>{children}</Main>
        </Container>
    );
}

export default Modal;

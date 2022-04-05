import React from 'react';
import Button from '../Button/button';
import { ButtonGroup, Container } from './prompt.styles';

interface Props {
    confirm: any;
    cancel: any;
    children: React.ReactChild | React.ReactChild[];
}

function Prompt({ confirm, cancel, children }: Props) {
    return (
        <Container>
            <p style={{ textAlign: 'center' }}>{children}</p>
            <ButtonGroup>
                <Button id="confirm" onClick={confirm}>
                    Yes
                </Button>
                <Button id="cancel" onClick={cancel}>
                    No
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default Prompt;

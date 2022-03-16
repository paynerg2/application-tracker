import React from 'react';
import Button from '../Button/button';
import { ButtonGroup, Container } from './prompt.styles';
import { theme } from '../../app/theme/theme';

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
                <Button style={{ width: '10vw' }} onClick={confirm}>
                    Yes
                </Button>
                <Button
                    style={{
                        width: '10vw',
                        backgroundColor: `${theme.color.error}`,
                        border: 'none',
                    }}
                    onClick={cancel}
                >
                    No
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default Prompt;

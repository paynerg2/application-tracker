import React from 'react';
import Button from '../Button/button';
import { ButtonGroup, Container } from './confirmationDialog.styles';
import { theme } from '../../app/theme/theme';

interface Props {
    confirm: any;
    cancel: any;
}

function ConfirmationDialog({ confirm, cancel }: Props) {
    return (
        <Container>
            <p>Are you sure you want to do this?</p>
            <ButtonGroup>
                <Button style={{ width: '10vw' }} onClick={confirm}>
                    Confirm
                </Button>
                <Button
                    style={{
                        width: '10vw',
                        backgroundColor: `${theme.color.error}`,
                        border: 'none',
                    }}
                    onClick={cancel}
                >
                    Cancel
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default ConfirmationDialog;

import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import Button from '../Button/button';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 20vw;
    min-width: 300px;
    height: fit-content;
    background: ${(props) => props.theme.color.primary};
    border: 2px solid ${(props) => props.theme.color.primary};
    border-radius: ${(props) => props.theme.borders.radius};
`;

interface Props {
    isCardView?: boolean;
    toggleCardView: () => void;
}

function StyleSelector({ isCardView = true, toggleCardView }: Props) {
    const defaultApplicationDisplayStyle = useAppSelector(
        (state) => state.auth.user.settings.defaultApplicationDisplayStyle
    );
    const [cardViewSelected, setCardViewSelected] = useState(
        defaultApplicationDisplayStyle === 'Card'
    );

    const handleToggle = () => {
        setCardViewSelected((prev) => !prev);
        toggleCardView();
    };

    return (
        <Container>
            <Button inverted={cardViewSelected} onClick={handleToggle}>
                Card View
            </Button>
            <Button inverted={!cardViewSelected} onClick={handleToggle}>
                List View
            </Button>
        </Container>
    );
}

export default StyleSelector;

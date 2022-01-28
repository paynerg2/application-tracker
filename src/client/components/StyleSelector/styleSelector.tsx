import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button/button';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 20vw;
    min-width: 300px;
    height: fit-content;
    background: ${(props) => props.theme.color.primaryBlue};
    border: 2px solid ${(props) => props.theme.color.primaryBlue};
    border-radius: ${(props) => props.theme.borders.radius};
`;

interface Props {
    setIsCardView: React.Dispatch<React.SetStateAction<boolean>>;
}

function StyleSelector({ setIsCardView }: Props) {
    const [cardViewSelected, setCardViewSelected] = useState(true);

    const handleToggle = () => {
        setCardViewSelected((prev) => !prev);
        setIsCardView((prev) => !prev);
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

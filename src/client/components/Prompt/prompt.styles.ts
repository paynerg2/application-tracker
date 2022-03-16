import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 30vh;
    width: 30vw;
    background: ${(props) => props.theme.color.secondarySurface};
    border-radius: ${(props) => props.theme.borders.radius};
    box-shadow: ${(props) => props.theme.borders.shadow};
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    height: auto;

    margin-top: 5vh;
`;

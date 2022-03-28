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

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 80vw;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70%;
    height: auto;

    margin-top: 5vh;

    > #confirm,
    #cancel {
        width: 10vw;
    }

    > #cancel {
        background-color: ${(props) => props.theme.color.error};
        border: none;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 80vw;
        justify-content: space-around;

        > #confirm,
        #cancel {
            width: 35vw;
        }
    }
`;

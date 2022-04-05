import styled from 'styled-components';

interface Props {
    showModal: boolean;
}
export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.background};
    opacity: 1;
`;

export const Main = styled.section<Props>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;

    display: ${(props) => (props.showModal ? 'block' : 'none')};
`;

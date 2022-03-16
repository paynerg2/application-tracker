import styled from 'styled-components';

interface Props {
    isDragReject: boolean;
    isFocused: boolean;
    isDragAccept: boolean;
}

export const Container = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 15vh;
    width: calc(100% - 20vmin);
    padding: 2em;
    box-sizing: border-box;
    text-align: center;
    border-width: 2px;
    border-radius: ${(props) => props.theme.borders.radius};
    border-color: ${(props) => props.theme.color.lightGray};
    border-style: solid;
    background-color: ${(props) => props.theme.color.dropzone};
    color: ${(props) => props.theme.color.dropzoneText};
    outline: none;
    transition: border 0.24s ease-in-out;

    > p {
        color: ${(props) => props.theme.color.dropzoneText};
    }
`;

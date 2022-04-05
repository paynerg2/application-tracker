import styled from 'styled-components';
import Button from '../../components/Button/button';
import { List } from '../List/list';

export const CircularButton = styled(Button)`
    border-radius: 50%;
    height: 1.25em;
    width: 1.25em;
    font-size: 4em;

    &:hover {
        transform: rotate(180deg) scale(1.02);
        transition: all 0.3s ease-in-out;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: none;
    }
`;

export const ListContainer = styled(List)`
    height: auto;
    gap: 2vmin;

    > ${CircularButton} {
        align-self: flex-end;
        margin-right: 2.5%;
        margin-top: 2.5%;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        border-radius: 0;
    }
`;

export const Response = styled.input.attrs({ type: 'radio' })`
    display: none;

    &:not(:disabled) ~ label {
        cursor: pointer;
    }

    &:disabled ~ label {
        color: ${(props) => props.theme.color.veryLightGray};
        box-shadow: none;
        cursor: not-allowed;
    }

    &:checked + label {
        font-weight: 700;
        color: ${(props) => props.theme.color.contrastText};
        box-shadow: ${(props) => props.theme.borders.shadow};
        background: ${(props) =>
            (props.id === 'rejected' && props.theme.color.error) ||
            (props.id === 'offer' && props.theme.color.mintGreen)};
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        > ${Button} {
        }
    }
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 1em;
    height: auto;
    background: ${(props) => props.theme.color.background};
    border-radius: ${(props) => props.theme.borders.radius};
    padding: 0.2em;
    box-sizing: border-box;
    border: solid 1px ${(props) => props.theme.color.mainText};
    position: relative;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
    }
`;

export const ResponseGroup = styled.div`
    width: min-content;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 5em;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
    }
`;

export const Placeholder = styled.div`
    width: 60%;
    font-size: 1.25em;
    font-family: ${(props) => props.theme.font.secondary};
`;

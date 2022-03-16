import styled from 'styled-components';
interface Props {
    active?: boolean;
}

/* eslint-disable-next-line */
export const StepIndicator = styled.li<Props>`
    position: relative;
    height: 2rem;
    width: 2rem;
    border-radius: 100%;
    text-align: center;
    line-height: 2rem;
    font-weight: 700;
    border: solid 2px ${(props) => props.theme.color.primary};
    background-color: ${(props) =>
        props.active ? props.theme.color.primary : props.theme.color.background};
    color: ${(props) =>
        props.active ? props.theme.color.buttonInverted : props.theme.color.button};
    list-style-type: none;
    margin: 0 1em;
    display: inline-block;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        width: 2.2em;
        height: 2px;
        top: 0.9em;
        bottom: 0px;
        left: 2em;
        background-color: ${(props) => props.theme.color.primary};
    }

    &:last-child {
        &::before {
            display: none;
        }
    }

    &:first-child {
        margin-left: 0;
    }
`;

export const StepContainer = styled.ul`
    padding: 0;
    margin: 0;
`;

import styled from 'styled-components';

export const StyledInput = styled.input`
    width: 100%;
    text-align: left;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: solid 1px rgba(0, 0, 0, 0.15);
    background-color: ${(props) => props.theme.color.input};
    color: ${(props) => props.theme.color.mainText};
    padding: 0.75rem;
    box-sizing: border-box;

    &:focus,
    :active {
        outline: none !important;
        box-shadow: 0 0 2px ${(props) => props.theme.color.primary};
    }

    /* type="date" specific styles */
    ::-webkit-datetime-edit-text,
    ::-webkit-datetime-edit-month-field,
    ::-webkit-datetime-edit-day-field,
    ::-webkit-datetime-edit-year-field {
        color: ${(props) => props.theme.color.lightGray};
    }

    ::-webkit-datetime-edit-text {
        margin: 0.1em;
    }
`;

export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5vh;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 18em;
        height: fit-content;
    }
`;

export const SmallInput = styled(StyledInput)`
    width: 4em;
    text-align: center;
`;

export const TwoColumnFormInput = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: min-content;
    margin-bottom: 1vh;
`;

export const MinorLabel = styled(Label)`
    color: ${(props) => props.theme.color.lightGray};
    margin-left: 2vw;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        max-width: 60vw;
    }
`;

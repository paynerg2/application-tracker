import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: any;
    required: boolean;
}

export const StyledInput = styled.input`
    text-align: left;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: solid 1px rgba(0, 0, 0, 0.15);
    color: ${(props) => props.theme.color.desaturatedGray};
    padding: 0.75rem;
    box-sizing: border-box;

    &:focus,
    :active {
        outline: none !important;
        box-shadow: 0 0 2px ${(props) => props.theme.color.primaryBlue};
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
`;

const Input = ({ id, label, register, required, ...rest }: InputProps) => {
    return (
        <>
            <Label htmlFor={id}>{label}</Label>
            <StyledInput name={id} id={id} {...register(id, { required })} {...rest} />
        </>
    );
};

export default Input;

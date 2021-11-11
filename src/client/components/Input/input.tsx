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
    padding: 1rem;
    box-sizing: border-box;

    &:focus,
    :active {
        outline: none !important;
        box-shadow: 0 0 2px ${(props) => props.theme.color.primaryBlue};
    }
`;

export const Label = styled.label`
    font-size: 1rem;
    font-weight: 600;
    margin-top: 2vh;
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

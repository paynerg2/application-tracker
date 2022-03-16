import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    register: any;
    required: boolean;
}

export const StyledInput = styled.input`
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
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ id, label, register, required, ...rest }, ref?) => {
        return (
            <>
                <Label htmlFor={id}>{label}</Label>
                <StyledInput
                    ref={ref || null}
                    name={id}
                    id={id}
                    {...register(id, { required })}
                    {...rest}
                />
            </>
        );
    }
);

export default Input;

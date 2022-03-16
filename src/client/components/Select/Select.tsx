import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Label } from '../Input/input';
import DownChevron from '../../assets/Down_Chevron.png';

interface SelectProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    register: any;
    required: boolean;
}

export const StyledSelect = styled.select`
    text-align: left;
    font-size: 1rem;
    border-radius: ${(props) => props.theme.borders.radius};
    border: solid 1px rgba(0, 0, 0, 0.15);
    background-color: ${(props) => props.theme.color.input};
    color: ${(props) => props.theme.color.mainText};
    padding: 0.75rem;
    box-sizing: border-box;
    cursor: pointer;

    // Dropdown Arrow
    appearance: none;
    background-image: url(${`${DownChevron}`});
    background-repeat: no-repeat;
    background-position: calc(100% - 10px) center;

    &:focus,
    :active {
        outline: none !important;
        box-shadow: 0 0 2px ${(props) => props.theme.color.primary};
    }

    > option {
        color: ${(props) => props.theme.color.mainText};
    }
`;

const Select = ({ id, label, register, required, ...rest }: SelectProps) => {
    return (
        <>
            <Label htmlFor={id}>{label}</Label>
            <StyledSelect name={id} id={id} {...register(id, { required })} {...rest} />
        </>
    );
};

export default Select;

import React, { InputHTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import { Label, StyledInput } from '../Input/input.styles';
import { Error } from '../Form/form';
import 'react-datepicker/dist/react-datepicker.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    showTimeSelect?: boolean;
    dateFormat?: string;
    control?: any;
    register?: UseFormRegister<FieldValues>;
}

const DatePicker = ({
    control,
    name,
    label,
    showTimeSelect = false,
    dateFormat = 'MMMM dd yyyy',
    ...rest
}: Props) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, name, value }, fieldState: { error } }) => (
                    <>
                        {/* @ts-ignore */}
                        <ReactDatePicker
                            name={name}
                            onChange={onChange}
                            onBlur={onBlur}
                            selected={value == null ? value : new Date(value)}
                            autoComplete="off"
                            customInput={<StyledInput />}
                            dateFormat={dateFormat}
                            aria-invalid={!!error}
                            showTimeInput={showTimeSelect}
                        />
                        <Error role="alert">{error && error.message}</Error>
                    </>
                )}
                {...rest}
            />
        </>
    );
};

export default DatePicker;

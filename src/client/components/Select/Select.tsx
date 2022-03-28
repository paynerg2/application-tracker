import React, { InputHTMLAttributes } from 'react';
import { FieldValues, useController, UseFormRegister } from 'react-hook-form';
import { Label } from '../Input/input.styles';
import { Error } from '../Form/form';
import { StyledSelect } from './select.styles';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    control?: any;
    register?: UseFormRegister<FieldValues>;
}

interface ControllerOptions {
    control?: any;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ control, name, label, ...rest }, ref?) => {
        const useControllerOptions: ControllerOptions = {};

        if (control) {
            useControllerOptions.control = control;
        }

        const {
            field: { onChange, onBlur, value },
            fieldState: { invalid, isTouched, isDirty, error },
            formState: { touchedFields, dirtyFields, isSubmitting },
        } = useController({
            name,
            defaultValue: '',
            ...useControllerOptions,
        });
        return (
            <>
                <Label htmlFor={name}>{label}</Label>
                <StyledSelect
                    disabled={isSubmitting}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref || null}
                    {...rest}
                />
                <Error role="alert">{error && error.message}</Error>
            </>
        );
    }
);

export default Select;

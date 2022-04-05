import React, { InputHTMLAttributes } from 'react';
import { FieldValues, useController, UseFormRegister } from 'react-hook-form';
import { Error } from '../Form/form';
import { StyledInput, Label, SmallInput, TwoColumnFormInput, MinorLabel } from './input.styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    small?: boolean;
    control?: any;
    register?: UseFormRegister<FieldValues>;
}

interface ControllerOptions {
    control?: any;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ control, name, label, small, type, ...rest }, ref?) => {
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
                {small ? (
                    <>
                        <TwoColumnFormInput>
                            <MinorLabel htmlFor={name}>{label}</MinorLabel>
                            <SmallInput
                                disabled={isSubmitting}
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                name={name}
                                ref={ref || null}
                                aria-invalid={!!error}
                                {...rest}
                            />
                        </TwoColumnFormInput>
                    </>
                ) : (
                    <>
                        <Label htmlFor={name}>{label}</Label>
                        <StyledInput
                            disabled={isSubmitting}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            name={name}
                            type={type}
                            ref={ref || null}
                            aria-invalid={!!error}
                            {...rest}
                        />
                    </>
                )}
                <Error role="alert">{error && error.message}</Error>
            </>
        );
    }
);

export default Input;

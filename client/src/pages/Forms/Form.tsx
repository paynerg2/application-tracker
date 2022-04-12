import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { useStepper } from '../../_helpers/useStepper';
import { isEmpty, merge } from '../../_helpers/objectHelpers';
import Stepper from '../../components/Stepper/stepper';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormActions from './FormActions';

interface Props<T> {
    steps: Step<T>[];
    onSubmit: any;
    initialValues?: Partial<T>;
}

interface Step<T> {
    Component: typeof React.Component;
    defaultValues: Partial<T>;
    validationSchema: AnyObjectSchema;
    label: string;
    key: string;
}

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    > ul#stepper {
        margin-bottom: 2em;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        justify-self: center;
    }
`;

const Form = <T extends object>({ steps, initialValues, onSubmit }: Props<T>) => {
    const [state, dispatch] = useStepper();

    const getDefaultValues = (steps: any[]) => {
        let defaultValues = {};
        if (initialValues == null || isEmpty(initialValues)) {
            steps.forEach((step) => {
                defaultValues = merge(defaultValues, step.defaultValues);
            });
        } else {
            defaultValues = initialValues;
        }

        return { ...defaultValues };
    };

    const methods = useForm({
        defaultValues: getDefaultValues(steps),
        resolver: yupResolver(steps[state.activeStep].validationSchema),
        mode: 'onSubmit',
    });

    const { handleSubmit } = methods;

    return (
        <StyledForm>
            <FormProvider {...methods}>
                {steps.length > 1 && (
                    <Stepper
                        steps={steps.length}
                        currentStep={state.activeStep}
                        dispatch={dispatch}
                    />
                )}
                {steps.map(
                    (step, index) =>
                        state.activeStep === index && (
                            //@ts-ignore
                            <step.Component
                                key={step.key}
                                values={state.data[step.key] || step.defaultValues}
                            />
                        )
                )}
                <FormActions
                    state={state}
                    dispatch={dispatch}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    steps={steps}
                />
            </FormProvider>
        </StyledForm>
    );
};

export default Form;

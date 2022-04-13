import React from 'react';
import { StepActionTypes } from '../../_helpers/useStepper';
import { StepIndicator, StepContainer } from './stepper.styles';

/**
 * Generates a stepper for multi-step forms.
 * Automatically creates an array with numbered steps based on the total number of steps.
 * Gives the current step the active prop, which changes the color properties.
 */

interface Props {
    steps: number;
    currentStep: number;
    dispatch: any;
    baseRoute?: string;
}

function Stepper({ steps, currentStep, dispatch }: Props) {
    const handleClick = (step: number) => {
        dispatch({
            type: StepActionTypes.SETSTEP,
            payload: {
                step,
            },
        });
    };

    return (
        <StepContainer id="stepper">
            {Array.from(Array(steps).keys()).map((x) => (
                <StepIndicator key={x} active={x === currentStep} onClick={() => handleClick(x)}>
                    {(x + 1).toString()}
                </StepIndicator>
            ))}
        </StepContainer>
    );
}

export default Stepper;

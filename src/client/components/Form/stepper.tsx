import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StepIndicator, StepContainer } from './stepper.styles';

/**
 * Generates a stepper for multi-step forms.
 * Automatically creates an array with numbered steps based on the total number of steps.
 * Gives the current step the active prop, which changes the color properties.
 */

interface Props {
    steps: number;
    currentStep: number;
    baseRoute?: string;
}

function Stepper({ steps, currentStep, baseRoute }: Props) {
    const navigate = useNavigate();

    return (
        <StepContainer>
            {Array.from(Array(steps).keys()).map((x) => (
                <StepIndicator
                    onClick={() => navigate(`${baseRoute}/${x + 1}`)}
                    key={x}
                    active={x + 1 === currentStep}
                >
                    {(x + 1).toString()}
                </StepIndicator>
            ))}
        </StepContainer>
    );
}

export default Stepper;

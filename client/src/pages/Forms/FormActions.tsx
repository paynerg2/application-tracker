import React from 'react';
import Button from '../../components/Button/button';
import { StepActionTypes } from '../../_helpers/useStepper';

interface Props {
    state: any;
    dispatch: any;
    handleSubmit: any;
    onSubmit: any;
    steps: any;
}

const FormActions = ({ state, dispatch, handleSubmit, onSubmit, steps }: Props) => {
    return (
        <>
            {state.activeStep < steps.length - 1 && (
                <Button
                    onClick={() => {
                        handleSubmit((values: any) => {
                            dispatch({
                                type: StepActionTypes.SETDATA,
                                payload: values,
                            });
                            dispatch({
                                type: StepActionTypes.NEXT,
                            });
                        })();
                    }}
                >
                    Next
                </Button>
            )}
            {state.activeStep === steps.length - 1 && (
                <Button
                    onClick={() => {
                        handleSubmit((values: any) => {
                            dispatch({
                                type: StepActionTypes.SETDATA,
                                payload: values,
                            });
                            onSubmit(values);
                        })();
                    }}
                >
                    Submit
                </Button>
            )}
        </>
    );
};

export default FormActions;

import { useReducer } from 'react';

interface State {
    activeStep: number;
    data: any;
}

export enum StepActionTypes {
    NEXT = 'NEXT',
    PREV = 'PREV',
    SETSTEP = 'SETSTEP',
    SETDATA = 'SETDATA',
}

interface StepAction {
    type: StepActionTypes;
    payload: {
        values?: any;
        step?: number;
    };
}

const initialState = {
    activeStep: 0,
    data: {},
};

const stepperReducer = (state: State, action: StepAction): State => {
    const { type, payload } = action;
    switch (type) {
        case StepActionTypes.NEXT:
            return {
                ...state,
                activeStep: state.activeStep + 1,
            };
        case StepActionTypes.PREV:
            return {
                ...state,
                activeStep: state.activeStep - 1,
            };
        case StepActionTypes.SETSTEP:
            return {
                ...state,
                // Checking for null AND undefined
                activeStep: action.payload.step != null ? action.payload.step : state.activeStep,
            };
        case StepActionTypes.SETDATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload.values,
                },
            };
        default:
            throw new Error(`${type} action not supported`);
    }
};

export const useStepper = () => {
    return useReducer(stepperReducer, initialState);
};

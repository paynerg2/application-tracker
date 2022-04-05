import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Properties {
    isGoingToNavSection: boolean;
    direction: number;
}

export interface NavAction {
    current: string;
    next: string;
}

const initialState: Properties = {
    isGoingToNavSection: false,
    direction: 0,
};

const animationSlice = createSlice({
    name: 'animation',
    initialState: initialState,
    reducers: {
        updateNavState: (state, action: PayloadAction<NavAction>) => {
            state.isGoingToNavSection = true;
            const { current, next } = action.payload;
            state.direction = getNavValue(next) - getNavValue(current);
        },
        resetNavState: () => initialState,
    },
});

const getNavValue = (navLink: string) => {
    switch (navLink) {
        case 'applications':
            return 1;
        case 'interviews':
            return 2;
        case 'stats':
            return 3;
        default:
            return 0;
    }
};

export const { updateNavState, resetNavState } = animationSlice.actions;
export default animationSlice.reducer;

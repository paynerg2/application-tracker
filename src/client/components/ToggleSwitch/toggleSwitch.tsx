import React from 'react';
import { Switch, Slider, Checkbox } from './toggleSwitch.styles';

interface Props {
    handleChange: any;
    isChecked: boolean;
}

function ToggleSwitch({ handleChange, isChecked = false }: Props) {
    return (
        <Switch>
            <Checkbox checked={isChecked} onChange={handleChange} />
            <Slider />
        </Switch>
    );
}

export default ToggleSwitch;

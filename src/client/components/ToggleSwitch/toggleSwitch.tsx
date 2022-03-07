import React from 'react';
import { Switch, Slider, Checkbox } from './toggleSwitch.styles';

interface Props {
    handleChange: any;
}

function ToggleSwitch({ handleChange }: Props) {
    return (
        <Switch>
            <Checkbox onChange={handleChange} />
            <Slider />
        </Switch>
    );
}

export default ToggleSwitch;

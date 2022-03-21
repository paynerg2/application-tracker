import React, { useState } from 'react';

import { Checkmark, Container, StyledCheckbox } from './checkbox.styles';

interface Props {
    label: string;
    style?: React.CSSProperties;
    onChange: (s: string, type: string) => void;
    checked?: boolean;
    type?: string;
}

function Checkbox({ label, style, onChange, checked = false, type = '' }: Props) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleOnChange = () => {
        setIsChecked((prev) => !prev);
        onChange(label, type);
    };

    return (
        <Container style={style && style}>
            {/* For some reason using the conditional just on the child element of the label tag causes nothing to render. */}
            {isChecked ? (
                <label>
                    <strong>{label}</strong>
                </label>
            ) : (
                <label>{label}</label>
            )}
            <StyledCheckbox checked={isChecked} type="checkbox" onChange={handleOnChange} />
            <Checkmark />
        </Container>
    );
}

export default Checkbox;

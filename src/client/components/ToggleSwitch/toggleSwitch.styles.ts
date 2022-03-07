import styled from 'styled-components';

/**
 * Adapted from w3schools Toggle Switch tutorial.
 */

const transitionTime = '0.4s';
const sliderSize = '26px';
export const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.color.lightGray};
    transition: ${transitionTime};
    border-radius: 34px;

    &::before {
        position: absolute;
        content: '';
        height: ${sliderSize};
        width: ${sliderSize};
        left: 4px;
        bottom: 4px;
        border-radius: 50%;
        background-color: ${(props) => props.theme.color.white};
        transition: ${transitionTime};
    }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    &:checked + ${Slider} {
        background-color: ${(props) => props.theme.color.primaryBlue};
    }

    &:checked + ${Slider}::before {
        transform: translateX(26px);
    }
`;

export const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    ${Checkbox} {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

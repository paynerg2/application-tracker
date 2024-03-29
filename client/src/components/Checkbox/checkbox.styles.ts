import styled from 'styled-components';

export const Container = styled.label`
    display: block;
    position: relative;
    padding-left: 50px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 25px;
    user-select: none;
`;

export const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: ${(props) => props.theme.color.background};
    border: solid 2px ${(props) => props.theme.color.lightGray};
    border-radius: 5px;

    &::after {
        content: '';
        position: absolute;
        display: none;

        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
    }
`;
Checkmark.displayName = 'checkmark';

export const StyledCheckbox = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ ${Checkmark} {
        background-color: ${(props) => props.theme.color.primary};
        border: solid 2px ${(props) => props.theme.color.primary};
    }

    &:checked ~ ${Checkmark}::after {
        display: block;
    }
`;
StyledCheckbox.displayName = 'input';

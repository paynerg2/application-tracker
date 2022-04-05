import React from 'react';
import styled from 'styled-components';
import theme from '../../app/theme/theme';

interface Props extends React.HTMLAttributes<HTMLElement> {
    color?: 'primary' | 'neutral' | 'destructive';
    children?: React.ReactChild | React.ReactChild[];
}

type Color = Props['color'];

const handleColor = (color: Color) => {
    switch (color) {
        case 'primary':
            return theme.color.primary;
        case 'destructive':
            return theme.color.error;
        case 'neutral':
        default:
            return theme.color.mainText;
    }
};

const Button = styled.button<Props>`
    height: fit-content;
    width: fit-content;
    background: none;
    border: none;
    font-size: 1.2em;
    font-weight: 700;
    color: ${(props) => props.theme.color.mainText};

    cursor: pointer;

    &:hover {
        color: ${(props) => handleColor(props.color)};
    }
`;

const TextButton = ({ color = 'neutral', children, ...rest }: Props) => {
    return (
        <Button color={color} {...rest}>
            {children}
        </Button>
    );
};
export default TextButton;

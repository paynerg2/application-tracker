import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
    margin: 5px 0px;
    border: 2px solid lightblue;
    height: 2vh;
    width: 100%;
`;

const ProgressBarFill = styled.div`
    background: lightblue;
    height: 100%;
    width: ${props => props.fill}%;
`;

export const ProgressBar = ({ fill = 0 }) => {
    return (
        <ProgressBarWrapper>
            <ProgressBarFill fill={fill} />
        </ProgressBarWrapper>
    );
};

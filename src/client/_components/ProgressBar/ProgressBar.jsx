import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
    margin: 5px 0px;
    border: 2px solid #1995ad;
    height: 2vh;
    width: 100%;
`;

const ProgressBarFill = styled.div`
    background: #1995ad;
    height: 100%;
    width: ${props => props.fill}%;
`;

export const ProgressBar = ({ fill }) => {
    return (
        <ProgressBarWrapper>
            <ProgressBarFill displayName="ProgressBarFill" fill={fill} />
        </ProgressBarWrapper>
    );
};

ProgressBar.propTypes = {
    fill: PropTypes.number
};

ProgressBar.defaultProps = {
    fill: 0
};

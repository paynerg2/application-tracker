import styled from 'styled-components';

export const DefaultProfileImage = styled.div`
    height: 5vmin;
    width: 5vmin;
    border-radius: 100%;
    background-color: ${(props) => props.theme.color.veryLightGray};
    text-align: center;
    line-height: 5vmin;
    font-weight: 700;
    color: ${(props) => props.theme.color.primaryBlue};
    font-size: 1.3em;
    border: 1px solid ${(props) => props.theme.color.primaryBlue};
    cursor: pointer;
`;

export const UserProfileImage = styled.img`
    height: 5vmin;
    width: 5vmin;
    border-radius: 100%;

    border: 1px solid ${(props) => props.theme.color.primaryBlue};
    cursor: pointer;
`;

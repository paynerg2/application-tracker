import styled from 'styled-components';

export const DefaultProfileImage = styled.div`
    height: 5vmin;
    width: 5vmin;
    border-radius: 100%;
    background-color: ${(props) => props.theme.color.veryLightGray};
    text-align: center;
    line-height: 5vmin;
    font-weight: 700;
    color: ${(props) => props.theme.color.primary};
    font-size: 1.3em;
    border: 1px solid ${(props) => props.theme.color.primary};
    cursor: pointer;
`;

export const UserProfileImage = styled.img`
    height: 5vmin;
    width: 5vmin;
    border-radius: 100%;
    object-fit: cover;

    border: 1px solid ${(props) => props.theme.color.primary};
    cursor: pointer;
`;

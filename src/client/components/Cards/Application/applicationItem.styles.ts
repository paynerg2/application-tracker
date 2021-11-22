import styled from 'styled-components';

export const Item = styled.li`
    height: 10vh;
    width: 60vw;
    min-width: 580px;
    border-radius: ${(props) => props.theme.borders.radius};
    background-color: ${(props) => props.theme.color.white};
    padding: 2vmin;
    margin: 0;
    box-sizing: border-box;
    text-align: center;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const VerticalLine = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const Date = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25vh;
    text-align: center;
`;

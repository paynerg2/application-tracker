import styled from 'styled-components';

export const Card = styled.div`
    height: 16vh;
    width: 20vw;
    border-radius: ${(props) => props.theme.borders.radius};
    background-color: ${(props) => props.theme.color.white};
    margin: 20px;
    padding: 2vmin;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Item = styled.li`
    height: 10vh;
    width: 40vw;
    border-radius: ${(props) => props.theme.borders.radius};
    background-color: ${(props) => props.theme.color.white};
    margin: 20px;
    padding: 2vmin;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Identity = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Name = styled.div`
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: capitalize;
`;

export const Email = styled.div`
    color: ${(props) => props.theme.color.lightGray};
`;

export const Position = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: capitalize;
`;

export const Line = styled.div`
    height: 4px;
    width: 100%;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const VerticalLine = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const Company = styled.div`
    color: ${(props) => props.theme.color.primaryBlue};
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: capitalize;
`;

import styled from 'styled-components';
export const Card = styled.div`
    color: ${(props) => props.theme.color.desaturatedGray};
    height: 22vh;
    min-height: 22vh;
    width: 20vw;
    min-width: 20vw;
    border-radius: ${(props) => props.theme.borders.radius};
    background: ${(props) => props.theme.color.white};
    box-shadow: 4px 4px 4px rgba(255, 255, 255, 0.3);

    padding: 1rem;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
`;

export const Title = styled.h2`
    grid-row: 1 / 3;
    grid-column: 1 / 5;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
`;

export const Company = styled.h3`
    grid-row: 2/3;
    grid-column: 1/5;
    align-self: start;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.color.lightGray};
    margin: 0;
`;

export const Location = styled.div`
    grid-row: 4/5;
    grid-column: 1/3;
    align-self: end;
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.desaturatedGray};
`;

export const Icon = styled.div`
    height: 60px;
    grid-row: 3/5;
    grid-column: 3/5;
    align-self: end;
    justify-self: end;
`;

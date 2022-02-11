import styled from 'styled-components';

export const Item = styled.li`
    height: 14vh;
    width: 95%;
    min-width: 450px;
    border-radius: ${(props) => props.theme.borders.radius};
    background-color: ${(props) => props.theme.color.white};
    padding: 2vmin;
    box-sizing: border-box;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    // Add margin to children to achieve desired spacing
    > * {
        margin: 2vmin;
    }
`;

export const VerticalLine = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const Time = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const Info = styled.div`
    font-size: 1.3rem;
`;

export const CompanyName = styled.span`
    font-weight: 700;
    color: ${(props) => props.theme.color.primaryBlue};
`;

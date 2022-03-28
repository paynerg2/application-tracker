import styled from 'styled-components';

export const Container = styled.div`
    width: 80vw;
    margin: 0 auto;
`;
export const Layout = styled.div`
    min-height: 90vh;
    display: flex;
    flex-direction: column;
`;

export const ChartSection = styled.section`
    width: 100%;
    height: fit-content;
    min-height: 30em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 2em;
    flex-wrap: wrap;
    background-color: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};
    padding: 2em;
    box-sizing: border-box;
`;
export const ChartLoader = styled.div`
    width: 50em;
    height: fit-content;
    padding: 2em;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    line-height: 1.4em;
    background: ${(props) => props.theme.color.veryLightGray};
    border-radius: ${(props) => props.theme.borders.radius};
    margin: 0 auto;
    color: ${(props) => props.theme.color.button};

    mask: linear-gradient(
            -60deg,
            ${(props) => props.theme.color.veryLightGray} 30%,
            #000b,
            ${(props) => props.theme.color.veryLightGray} 70%
        )
        right/300% 100%;
    background-repeat: no-repeat;
    animation: shimmer 2s infinite;

    @keyframes shimmer {
        100% {
            mask-position: left;
        }
    }
`;
export const ChartRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: min-content;
`;

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em 2em;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.color.secondarySurface};
    border-radius: ${(props) => props.theme.borders.radius};
`;

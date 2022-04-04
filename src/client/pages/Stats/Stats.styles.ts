import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
    width: 80vw;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        margin: 0;
    }
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

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        padding: 0;
        border-radius: 0;
    }
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
    min-height: 25em;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: min-content;
    flex-wrap: wrap;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        margin: 0;
        /* flex-direction: column; */
        justify-content: center;
        align-items: center;
    }
`;

export const ChartContainer = styled(motion.div)`
    min-height: 20em;
    height: fit-content;
    width: 49%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 2em;
    background-color: ${(props) => props.theme.color.secondarySurface};
    border-radius: ${(props) => props.theme.borders.radius};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
    }
`;

export const ChartHeader = styled.h2`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 3em;
    width: 100%;
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 2em;
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    padding: 0.2em;
    box-sizing: border-box;

    color: ${(props) => props.theme.color.contrastText};
    background-color: ${(props) => props.theme.color.primary};
    border-top-left-radius: ${(props) => props.theme.borders.radius};
    border-top-right-radius: ${(props) => props.theme.borders.radius};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        border-radius: 0;
        height: fit-content;
        text-align: center;
    }
`;

export const Chart = styled.div`
    height: 35em;
    width: 100%;
    padding: 2em;
    box-sizing: border-box;
`;

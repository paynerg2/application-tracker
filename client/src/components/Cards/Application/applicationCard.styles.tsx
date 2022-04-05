import { motion } from 'framer-motion';
import styled from 'styled-components';

export const applicationCardHeight = '22vh';

export const Card = styled(motion.div)`
    color: ${(props) => props.theme.color.mainText};
    height: 22vh;
    min-height: 22vh;
    width: 20vw;
    min-width: 20vw;
    border-radius: ${(props) => props.theme.borders.radius};
    background: ${(props) => props.theme.color.secondarySurface};

    padding: 1rem;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: fit-content 1fr 1fr 1fr;

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
        cursor: pointer;
        transform: scale(1.04);
        transition: 0.3s ease;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 48vw;
        min-width: 28em;

        margin: 0;
        border-radius: 0;

        &:hover {
            transform: none;
        }
    }
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
    align-self: center;
    justify-self: start;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${(props) => props.theme.color.lightGray};
    margin: 0;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        justify-self: center;
    }
`;

export const Location = styled.div`
    grid-row: 4/5;
    grid-column: 1/3;
    align-self: end;
    font-size: 0.8rem;
    color: ${(props) => props.theme.color.mainText};
`;

export const Icon = styled.div`
    height: 60px;
    grid-row: 3/5;
    grid-column: 3/5;
    align-self: end;
    justify-self: end;
`;

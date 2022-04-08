import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
    display: none;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        position: fixed;
        bottom: 10vh;
        padding: 2em 0;
        box-sizing: border-box;
        width: 100vw;
        background: ${(props) => props.theme.color.footer};
        color: ${(props) => props.theme.color.mainText};
    }
`;

export const MenuItem = styled(motion.div)`
    width: 100%;
    height: 3em;
    line-height: 3em;
    font-size: 1.5em;
    font-weight: 700;
    font-family: ${(props) => props.theme.font.secondary};
    background-color: inherit;
    color: ${(props) => props.theme.color.contrastText};
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => props.theme.color.primary};
    }
`;

export const HorizontalLine = styled(motion.li)`
    height: 0.1em;
    width: 90%;
    background-color: ${(props) => props.theme.color.separator};
`;

export const LinkContainer = styled(motion.ul)`
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

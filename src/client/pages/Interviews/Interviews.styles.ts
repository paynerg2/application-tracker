import styled from 'styled-components';
import { motion } from 'framer-motion';
import { CircularButton } from '../../components/InterviewList/InterviewList.styles';
import { List } from '../../components/List/list';
import Button from '../../components/Button/button';

export const Layout = styled(motion.div)`
    display: grid;

    grid-template-columns: 40% 1fr;

    column-gap: 10vw;

    min-height: 90vh;
    width: 80vw;
    margin: 0 auto;
    z-index: -1;
    overflow: auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
    }
`;

export const InterviewSection = styled.section`
    //height: 100%;
`;

export const ContactSection = styled.section`
    > ${List} {
        gap: 2vmin;

        > ${CircularButton} {
            align-self: flex-end;
            margin-right: 2.5%;
            margin-top: 2.5%;
        }
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        margin-bottom: 20vh;
    }
`;

export const SectionHeader = styled.h2`
    font-size: 2em;
    font-size: 700;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        text-align: center;
    }
`;

export const MobileButton = styled(Button)`
    display: none;
    opacity: 1;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        height: 10vh;
        width: 50%;
        border-radius: 0;
        z-index: 100;
    }
`;

export const MobileButtonSection = styled.section`
    display: flex;
    flex-direction: row;
    width: 100%;
    position: fixed;
    bottom: 10vh; // navbar height
    background-color: ${(props) => props.theme.color.buttonInverted};
`;

import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from '../../components/Button/button';

export const Layout = styled(motion.div)`
    display: grid;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fit, 24vh);

    row-gap: 2vh;

    width: 80vw;
    //min-height: 90vh;
    height: auto;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const NewApplication = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    justify-self: flex-start;

    grid-column: 3 / 6;
    grid-row: 1 /2;

    background: ${(props) => props.theme.color.primary};
    border-radius: ${(props) => props.theme.borders.radius};
    width: 80%;

    ${Button} {
        width: 60%;
        margin: 3vh 0;
    }

    p,
    h2 {
        margin: 0;
        color: ${(props) => props.theme.color.contrastText};
    }
    h2 {
        font-size: 2rem;
        margin-top: 3vh;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        height: min-content;
        position: fixed;
        bottom: 10vh; // nav height
        border-radius: 0;

        p,
        h2 {
            display: none;
        }

        > ${Button} {
            width: 100%;
            margin: 0;
            border-radius: 0;
            min-height: 48px;
            height: 10vh;
            font-size: 1.5em;
        }
    }
`;

export const SubmissionsList = styled.div`
    grid-column: 3 / 7;
    grid-row: 2 / 3;

    > h2 {
        font-size: 2em;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        text-align: center;
        background-color: ${(props) => props.theme.color.background};
        margin-bottom: 20vh; // Keep above navbar & button

        > h2 {
            display: none;
        }
    }
`;

export const SubmissionsContainer = styled(motion.div)`
    display: grid;
    grid-template-columns: 15% 1fr 1fr;

    height: fit-content;
    width: 100%;

    background: ${(props) => props.theme.color.surface};
    border-radius: ${(props) => props.theme.borders.radius};
    margin-bottom: 1vh;

    padding: 0.8em;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;

        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        border-radius: 0;
    }
`;
export const ApplicationCardContainer = styled.div`
    grid-column: 2 / 4;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2vmin;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        margin: 0;
        border-radius: 0;

        justify-content: center;
        align-items: center;

        padding: 1vmin 0;
        box-sizing: border-box;
    }
`;

export const ApplicationListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-height: 20vmin;
    height: fit-content;
    width: 100%;
    background: linear-gradient(
        to right,
        ${(props) => props.theme.color.primary} 10%,
        ${(props) => props.theme.color.surface} 10%,
        ${(props) => props.theme.color.surface} 100%
    );
    list-style: none;

    border-radius: ${(props) => props.theme.borders.radius};

    gap: 2vmin;
    padding: 2vmin 0;
    box-sizing: border-box;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;

        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        border-radius: 0;
    }
`;

export const applicationListItemHeight = '15vmin';
export const ApplicationListItem = styled(motion.li)`
    display: grid;
    // This syntax gives 5 equal-sized columns
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-flow: column;
    align-items: center;

    height: ${applicationListItemHeight};
    width: 95%;

    border-radius: ${(props) => props.theme.borders.radius};

    background-color: ${(props) => props.theme.color.secondarySurface};

    cursor: pointer;

    > div {
        max-width: 100%;
        width: 100%;
        height: 90%;
        border-right: solid 2px ${(props) => props.theme.color.separator};
        border-radius: 0;
        word-wrap: break-word;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 2vmin;
        box-sizing: border-box;
        text-align: center;
    }

    #icon {
        border-right: none;
    }
`;

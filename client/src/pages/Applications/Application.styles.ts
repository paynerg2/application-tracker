import styled from 'styled-components';
import ListBullet from '../../assets/List_Style.svg';
import Button from '../../components/Button/button';

export const Container = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        margin: 0;
        justify-content: space-between;
        align-items: center;
    }
`;
export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(33%, 3);
    grid-template-rows: min-content min-content;

    min-height: 85vh;
    height: fit-content;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
`;

export const TitleBanner = styled.div`
    width: 100%;
    height: 10vh;
    background: ${(props) => props.theme.color.primary};
    margin-top: 5vh;

    color: ${(props) => props.theme.color.contrastText};

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        margin-top: 0;
        padding: 0 2em;
        box-sizing: border-box;
        position: sticky;
        top: 0;
        z-index: 10000;
        height: fit-content;
        min-height: 10vh;
    }
`;

export const Company = styled.h2`
    color: ${(props) => props.theme.color.contrastText};
    font-size: 2.5em;
    letter-spacing: 0.03em;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        font-size: 1.5em;
    }
`;

export const ApplicationDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    align-self: flex-end;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100%;
        max-width: 18em;
    }
`;

export const Location = styled.div`
    color: ${(props) => props.theme.color.lightGray};
    font-weight: 500;
    margin-top: 4vh;
`;

export const JobTitle = styled.h1`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 3em;
    position: relative;
    margin-right: 1vmin;
    margin-top: 0;
    margin-bottom: 0;

    &::after {
        content: '';
        position: relative;
        display: block;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 1em;
        border-bottom: 3px solid ${(props) => props.theme.color.primary};
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        font-size: 2em;
    }
`;

export const SectionHeading = styled.h3`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 1.5em;
    margin-top: 4vh;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        text-align: center;
    }
`;

export const DetailList = styled.ul`
    columns: 2;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        columns: 1;
    }
`;
export const ListItem = styled.li`
    list-style: none;
    background-image: url(${ListBullet});
    background-repeat: no-repeat;
    padding-left: 2vw;
    height: 2vmin;
    width: fit-content;
    max-width: 50%;

    line-height: 2vmin;
    margin-bottom: 2vmin;
    white-space: nowrap;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        //padding-left: 2em;
        background-image: none;
        margin-bottom: 1em;
    }
`;

export const DateSection = styled.div`
    display: flex;
    gap: 2vw;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        justify-content: space-around;

        > #posted,
        #submitted {
            > div {
                min-width: 0;
                width: 8em;
                height: 8em;
                border-radius: ${(props) => props.theme.borders.radius};
                background-color: ${(props) => props.theme.color.background};
                border-color: ${(props) => props.theme.color.background};
                position: static; // prevents overlay on fixed buttons

                h2,
                p {
                    color: ${(props) => props.theme.color.mainText};
                }
            }
        }
    }
`;

export const RelatedInfoSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: fit-content;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;

        & #interviews,
        #contacts {
            width: 100%;
            color: ${(props) => props.theme.color.contrastText};
            padding: 0.5em 0;
            box-sizing: border-box;
            background-color: ${(props) => props.theme.color.primary};
        }
    }
`;

export const InterviewsSection = styled.div`
    width: 55%;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;

        ${Button} {
            width: 80%;
        }
    }
`;

export const ContactsSection = styled.div`
    width: 35%;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        margin-bottom: 25vh; // Accounting for response buttons
        display: flex;
        flex-direction: column;
        align-items: center;

        ${Button} {
            width: 80%;
        }
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1vmin;

    button {
        width: 8vw;
        display: flex;
        gap: 0.5vmin;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 50%;

        > ${Button} {
            width: 50%;
        }
    }
`;

export const Response = styled.input.attrs({ type: 'radio' })`
    display: none;

    &:not(:disabled) ~ label {
        cursor: pointer;
    }

    &:disabled ~ label {
        color: ${(props) => props.theme.color.veryLightGray};
        box-shadow: none;
        cursor: not-allowed;
    }

    &:checked + label {
        font-weight: 700;
        color: ${(props) => props.theme.color.contrastText};
        box-shadow: ${(props) => props.theme.borders.shadow};
        background: ${(props) =>
            (props.id === 'noResponse' && props.theme.color.lightGray) ||
            (props.id === 'interview' && props.theme.color.primary) ||
            (props.id === 'rejected' && props.theme.color.error)};
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        > ${Button} {
            width: 33%;
            height: 20em;
        }
    }
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 6vmin;
    line-height: 6vmin;
    width: 100%;
    background: ${(props) => props.theme.color.background};
    border-radius: ${(props) => props.theme.borders.radius};
    position: relative;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 10vh;
        border-radius: 0;
    }
`;

export const ResponseGroup = styled.div`
    height: 40vh;
    width: 20vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: row;
        position: fixed;
        bottom: 10vh;
        left: 0;
        width: 100vw;
        height: 10vh;
        gap: 0;
        z-index: 1000;
    }
`;

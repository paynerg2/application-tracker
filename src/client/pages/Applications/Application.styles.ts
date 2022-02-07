import styled from 'styled-components';
import ListBullet from '../../assets/List_Style.svg';

export const Container = styled.div`
    width: 80vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`;
export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(33%, 3);
    grid-template-rows: min-content min-content;

    min-height: 85vh;
    height: fit-content;
`;

export const TitleBanner = styled.div`
    width: 100%;
    height: 10vh;
    background: ${(props) => props.theme.color.primaryBlue};
    margin-top: 5vh;

    color: ${(props) => props.theme.color.white};

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`;

export const Company = styled.h2`
    font-size: 2.5em;
    letter-spacing: 0.03em;
`;

export const ApplicationDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    align-self: flex-end;
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
        border-bottom: 3px solid ${(props) => props.theme.color.primaryBlue};
    }
`;

export const SectionHeading = styled.h3`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 1.5em;
    margin-top: 4vh;
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
`;

export const DateSection = styled.div`
    display: flex;
    gap: 2vw;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 1vmin;

    button {
        width: 8vw;
        display: flex;
        gap: 0.5vmin;
    }
`;

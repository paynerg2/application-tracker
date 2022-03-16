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
    background: ${(props) => props.theme.color.primary};
    margin-top: 5vh;

    color: ${(props) => props.theme.color.background};

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
        border-bottom: 3px solid ${(props) => props.theme.color.primary};
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

export const RelatedInfoSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: fit-content;
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
        color: ${(props) => props.theme.color.background};
        box-shadow: ${(props) => props.theme.borders.shadow};
        background: ${(props) =>
            (props.id === 'noResponse' && props.theme.color.lightGray) ||
            (props.id === 'interview' && props.theme.color.primary) ||
            (props.id === 'rejected' && props.theme.color.error)};
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
`;

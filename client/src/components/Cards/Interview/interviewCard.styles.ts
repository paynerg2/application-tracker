import styled from 'styled-components';
import { ThemeType } from '../../../app/theme/theme';
import Button from '../../Button/button';

type CustomProps = {
    isOpen: boolean;
};
type Props = CustomProps & ThemeType;

export const Item = styled.li<Props>`
    height: 15vh;
    min-width: 20em;
    background-color: ${(props) => props.theme.color.secondarySurface};
    padding: 2vmin;
    box-sizing: border-box;
    cursor: pointer;

    flex-direction: row;
    justify-content: center;
    display: grid;
    grid-template-columns: 0.2fr 0.1fr 1fr;

    // Remove border radius on bottom corners when open so that the elements meet
    border-radius: ${(props) => props.theme.borders.radius};
    border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};
    border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};

    transition: ${(props) =>
        !props.isOpen
            ? 'border-bottom-left-radius 1.2s, border-bottom-right-radius 1.2s'
            : 'border-bottom-left-radius 0s, border-bottom-right-radius 0s'};

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 90vw;
        min-width: 18em;
        height: 12em;

        margin: 0;

        &:hover {
            transform: none;
        }
    }
`;

export const Divider = styled.div`
    // Vertical divider
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.separator};

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        // Horizontal divider
        height: 4px;
        width: 100%;
    }
`;

export const Time = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    > #month {
        font-weight: 500;
    }

    > #date {
        font-weight: 700;
    }

    > #time {
        font-size: 0.8em;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        height: 2em;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 0.4em;
        font-size: 1.4em;

        > #month {
            font-weight: 400;
        }

        > #date {
            font-weight: 400;
        }

        > #time {
            font-size: 1em;
        }
    }
`;

export const Info = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.3rem;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`;

export const CompanyName = styled.span`
    font-weight: 700;
    color: ${(props) => props.theme.color.primary};
`;

export const Actions = styled.div<Props>`
    //opacity: ${(props) => (props.isOpen ? 1 : 0)};

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    gap: 1vw;

    margin: 0;
    //height: 2em;
    height: ${(props) => (props.isOpen ? '2em' : 0)};
    width: 95%;
    background: ${(props) => props.theme.color.background};
    padding-right: 5%;
    box-sizing: border-box;

    transition: height 0.3s ease-in-out;
    overflow: hidden;

    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};
`;

export const ResponseButton = styled(Button)`
    font-size: 1em;
    width: fit-content;
    padding: 0.2em;
    box-sizing: border-box;
    border-color: ${(props) => props.theme.color.error};
`;

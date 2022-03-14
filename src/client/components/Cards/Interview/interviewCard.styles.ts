import styled from 'styled-components';
import { ThemeType } from '../../../app/theme/theme';

type CustomProps = {
    isOpen: boolean;
};
type Props = CustomProps & ThemeType;

export const Item = styled.li<Props>`
    height: 15vh;
    min-width: 450px;
    background-color: ${(props) => props.theme.color.white};
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
`;

export const VerticalLine = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const Time = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const Info = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 1.3rem;
`;

export const CompanyName = styled.span`
    font-weight: 700;
    color: ${(props) => props.theme.color.primaryBlue};
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
    background: ${(props) => props.theme.color.white};
    padding-right: 5%;
    box-sizing: border-box;

    transition: height 0.3s ease-in-out;
    overflow: hidden;

    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};
`;

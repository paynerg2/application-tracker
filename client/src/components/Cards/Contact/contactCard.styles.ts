import styled from 'styled-components';
import { ThemeType } from '../../../app/theme/theme';

type CustomProps = {
    isOpen: boolean;
};
type Props = CustomProps & ThemeType;

export const Card = styled.div<Props>`
    height: 16vh;
    //width: 20vw;
    background-color: ${(props) => props.theme.color.background};
    padding: 2vmin;
    box-sizing: border-box;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // Remove border radius on bottom corners when open so that the elements meet
    border-radius: ${(props) => props.theme.borders.radius};
    border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};
    border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};

    transition: ${(props) =>
        !props.isOpen
            ? 'border-bottom-left-radius 1.2s, border-bottom-right-radius 1.2s'
            : 'border-bottom-left-radius 0s, border-bottom-right-radius 0s'};
`;

export const Container = styled.div`
    border-radius: ${(props) => props.theme.borders.radius};
    margin: 0 2.5%;
    height: min-content;
    width: 95%;

    transition: box-shadow 0.2s ease-in-out;

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
    }
`;

export const Item = styled.li<Props>`
    height: 14vh;
    background-color: ${(props) => props.theme.color.secondarySurface};
    padding: 2vmin;
    box-sizing: border-box;
    cursor: pointer;
    margin: 0;

    display: grid;
    grid-template-columns: 1fr 0.1fr 1fr;

    // Remove border radius on bottom corners when open so that the elements meet
    border-radius: ${(props) => props.theme.borders.radius};
    border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};
    border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};
`;

export const Identity = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Name = styled.div`
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: capitalize;
`;

export const Email = styled.div`
    color: ${(props) => props.theme.color.lightGray};
`;

export const Position = styled.div`
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: capitalize;
`;

export const Line = styled.div`
    height: 4px;
    width: 100%;
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const VerticalLine = styled.div`
    height: 100%;
    width: 4px;
    background-color: ${(props) => props.theme.color.separator};
`;

export const Company = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //width: 100%;

    color: ${(props) => props.theme.color.primary};
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: capitalize;
`;

export const Actions = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    gap: 1vw;

    margin: 0;
    height: ${(props) => (props.isOpen ? '3em' : 0)};
    background: ${(props) => props.theme.color.background};
    padding-right: 5%;
    box-sizing: border-box;

    transition: height 0.3s ease-in-out;
    overflow: hidden;
    opacity: 0.6;

    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};
`;

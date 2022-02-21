import styled from 'styled-components';
import { ThemeType } from '../../../app/theme/theme';

type CustomProps = {
    isOpen: boolean;
};
type Props = CustomProps & ThemeType;

export const Card = styled.div<Props>`
    height: 16vh;
    width: 20vw;
    background-color: ${(props) => props.theme.color.white};
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

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
    }
`;

export const Item = styled.li<Props>`
    height: 14vh;
    width: 95%;
    background-color: ${(props) => props.theme.color.white};
    margin: 0 2.5%;
    padding: 2vmin;
    box-sizing: border-box;
    cursor: pointer;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    // Remove border radius on bottom corners when open so that the elements meet
    border-radius: ${(props) => props.theme.borders.radius};
    border-bottom-left-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};
    border-bottom-right-radius: ${(props) => (props.isOpen ? 0 : props.theme.borders.radius)};

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
    }
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
    background-color: ${(props) => props.theme.color.veryLightGray};
`;

export const Company = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //width: 100%;

    color: ${(props) => props.theme.color.primaryBlue};
    font-size: 1.6rem;
    font-weight: 700;
    text-transform: capitalize;
`;

export const Actions = styled.div<Props>`
    opacity: ${(props) => (props.isOpen ? 1 : 0)};

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    gap: 1vw;

    margin: 0;
    height: 2em;
    width: 95%;
    background: ${(props) => props.theme.color.white};
    padding-right: 5%;
    box-sizing: border-box;

    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};
`;

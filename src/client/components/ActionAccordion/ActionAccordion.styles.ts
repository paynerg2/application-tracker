import styled from 'styled-components';
import { ThemeType } from '../../app/theme/theme';

type CustomProps = {
    isOpen: boolean;
};
type Props = CustomProps & ThemeType;

export const Actions = styled.div<Props>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;

    gap: 1vw;

    margin: 0;
    height: ${(props) => (props.isOpen ? '3em' : 0)};
    background: ${(props) => props.theme.color.secondarySurface};
    padding-right: 5%;
    box-sizing: border-box;

    transition: height 0.3s ease-in-out;
    overflow: hidden;

    border-bottom-left-radius: ${(props) => props.theme.borders.radius};
    border-bottom-right-radius: ${(props) => props.theme.borders.radius};
`;
Actions.displayName = 'actions';

export const Container = styled.div`
    border-radius: ${(props) => props.theme.borders.radius};
    margin: 0 2.5%;
    height: min-content;
    width: 95%;

    transition: box-shadow 0.4s ease-in-out;

    &:hover {
        box-shadow: ${(props) => props.theme.borders.shadow};
    }
`;

import styled from 'styled-components';
import { CircularButton } from '../InterviewList/InterviewList.styles';

const gridColumnTemplate = '1fr 2fr 1fr 1fr 1fr';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
`;

export const Header = styled.div`
    width: 100%;
    height: 3em;
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.contrastText};

    display: grid;
    grid-template-columns: ${gridColumnTemplate};

    border-top-left-radius: ${(props) => props.theme.borders.radius};
    border-top-right-radius: ${(props) => props.theme.borders.radius};

    > div {
        text-align: center;
        line-height: 3em;
        border-right: 1px solid rgba(255, 255, 255, 0.05);

        &:last-child {
            border-right: none;
        }
    }
`;

export const Row = styled.div`
    width: 100%;
    height: 6em;
    background-color: ${(props) => props.theme.color.surface};
    display: grid;
    grid-template-columns: ${gridColumnTemplate};

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    &:last-child {
        border-bottom-left-radius: ${(props) => props.theme.borders.radius};
        border-bottom-right-radius: ${(props) => props.theme.borders.radius};
    }
`;

interface Props {
    name: 'passed' | 'rejected' | 'offer';
    isChecked: boolean;
}
export const ResponseButton = styled(CircularButton)<Props>`
    height: 0.75em;
    width: 0.75em;
    background-color: ${(props) => props.theme.color.surface};
    border: 1px solid ${(props) => props.theme.color.lightGray};

    &:hover {
        transform: none;
    }

    ${({ isChecked, theme, name }) =>
        isChecked &&
        `
        background-color: ${
            (isChecked && name === 'passed' && theme.color.primary) ||
            (isChecked && name === 'rejected' && theme.color.error) ||
            (isChecked && name === 'offer' && theme.color.mintGreen)
        };
        border-color: ${
            (isChecked && name === 'passed' && theme.color.primary) ||
            (isChecked && name === 'rejected' && theme.color.error) ||
            (isChecked && name === 'offer' && theme.color.mintGreen)
        };
    `}
`;

export const CheckmarkImg = styled.img`
    height: 0.5em;
    width: 0.5em;
`;

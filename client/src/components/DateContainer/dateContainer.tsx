import React from 'react';
import styled from 'styled-components';

const StyledDateContainer = styled.div`
    grid-column: 1 / 2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.color.secondarySurface};
    column-gap: 0;

    height: fit-content;
    width: 11vmin;
    height: 11vmin;
    border-radius: ${(props) => props.theme.borders.radius};

    > h2,
    p {
        margin: 0.2em;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        width: 100vw;
        min-width: 400px;
        height: fit-content;

        margin: 0;
        border-radius: 0;
        padding: 0.5vmin 0;
        box-sizing: border-box;

        position: sticky;
        top: 0;

        border-top: 2px solid ${(props) => props.theme.color.primary};
        border-bottom: 2px solid ${(props) => props.theme.color.primary};

        background-color: ${(props) => props.theme.color.primary};
        h2,
        p {
            color: ${(props) => props.theme.color.contrastText};
        }
    }
`;

interface Props {
    date: string | Date;
}

function DateContainer({ date }: Props) {
    return (
        <StyledDateContainer>
            <p>
                {new Date(date).toLocaleDateString('default', {
                    month: 'short',
                })}
            </p>
            <h2>{new Date(date).getUTCDate()}</h2>
        </StyledDateContainer>
    );
}

export default DateContainer;

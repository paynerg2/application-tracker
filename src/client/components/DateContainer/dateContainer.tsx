import React from 'react';
import styled from 'styled-components';

const StyledDateContainer = styled.div`
    grid-column: 1 / 2;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.color.white};
    column-gap: 0;

    height: fit-content;
    width: 11vmin;
    height: 11vmin;
    border-radius: ${(props) => props.theme.borders.radius};

    > h2,
    p {
        margin: 0.2em;
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

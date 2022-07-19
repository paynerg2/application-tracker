import styled from 'styled-components';

export const Container = styled.div`
    grid-column: 2 / 4;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2vmin;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        margin: 0;
        border-radius: 0;

        justify-content: center;
        align-items: center;

        padding: 1vmin 0;
        box-sizing: border-box;
    }
`;

export const PaginationButtions = styled.div`
    width: 90%; // Matches space used for cards
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    #nextButton {
        margin-left: auto;
    }
`;

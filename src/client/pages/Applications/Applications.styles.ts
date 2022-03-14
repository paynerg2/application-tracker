import styled from 'styled-components';

export const Layout = styled.div`
    display: grid;

    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fit, 24vh);

    row-gap: 2vh;

    width: 80vw;
    min-height: 90vh;
    margin: 0 auto;
`;

export const NewApplication = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    justify-self: flex-start;

    grid-column: 3 / 6;
    grid-row: 1 /2;

    color: ${(props) => props.theme.color.white};
    background: ${(props) => props.theme.color.primaryBlue};
    border-radius: ${(props) => props.theme.borders.radius};
    width: 80%;

    a {
        width: 60%;
        margin: 3vh 0;
    }

    p,
    h2 {
        margin: 0;
    }
    h2 {
        font-size: 2rem;
        margin-top: 3vh;
    }
`;

export const SubmissionsList = styled.div`
    grid-column: 3 / 7;
    grid-row: 2 / 3;
`;

export const SubmissionsContainer = styled.div`
    display: grid;
    grid-template-columns: 15% 1fr 1fr;

    height: fit-content;
    width: 100%;

    background: ${(props) => props.theme.color.veryLightGray};
    border-radius: ${(props) => props.theme.borders.radius};
    margin-bottom: 1vh;

    padding: 0.8em;
`;
export const ApplicationCardContainer = styled.div`
    grid-column: 2 / 4;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 2vmin;
`;

export const ApplicationListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-height: 20vmin;
    height: fit-content;
    width: 100%;
    background: linear-gradient(
        to right,
        ${(props) => props.theme.color.primaryBlue} 10%,
        ${(props) => props.theme.color.lightBlue} 10%,
        ${(props) => props.theme.color.lightBlue} 100%
    );
    list-style: none;

    border-radius: ${(props) => props.theme.borders.radius};

    gap: 2vmin;
    padding: 2vmin 0;
    box-sizing: border-box;
`;

export const ApplicationListItem = styled.li`
    display: grid;
    // This syntax gives 5 equal-sized columns
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-auto-flow: column;
    align-items: center;

    height: 15vmin;
    width: 95%;

    border-radius: ${(props) => props.theme.borders.radius};

    background-color: ${(props) => props.theme.color.white};

    cursor: pointer;

    > div {
        max-width: 100%;
        width: 100%;
        height: 90%;
        border-right: solid 2px ${(props) => props.theme.color.veryLightGray};
        word-wrap: break-word;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        padding: 2vmin;
        box-sizing: border-box;
        text-align: center;
    }
`;

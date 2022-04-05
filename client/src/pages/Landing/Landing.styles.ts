import styled from 'styled-components';
import ListStyle from '../../assets/List_Style.svg';

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
`;

export const GridSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: 5vh;
    margin-top: 10vmax;
    justify-content: center;
    align-items: center;
    text-align: center;

    h1,
    h2,
    p,
    a,
    img {
        width: 90%;
    }

    h1 {
        margin-top: 5vh;
        font-size: 3rem;
    }

    h2 {
        margin-top: 5vh;
        font-size: 2.5rem;
    }

    p {
        font-size: 1.25rem;
    }

    a {
        button {
            height: 4rem;
            font-size: 1.5rem;
        }
    }

    img {
        height: auto;
        max-width: 90%;
    }

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: repeat(4, 1fr);
        gap: 0;
        margin: 0 10vmax;
        margin-top: 10vmax;
    }
`;

export const SimplifySection = styled(GridSection)`
    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        #simplify_heading {
            grid-column: 1 / 2;
            margin: 0;
        }

        #simplify_text {
            grid-column: 1 / 2;
            grid-row: 2 / 3;
        }

        #simplify_cta {
            grid-column: 1 / 2;
            grid-row: 3 / 4;
        }

        #simplify_image {
            grid-column: 2 / 3;
            grid-row: 2 / 5;

            align-self: flex-end;
        }
    }
`;

export const BlueBackground = styled.section`
    background-color: ${(props) => props.theme.color.primary};
`;

export const EssentialsSection = styled(GridSection)`
    color: ${(props) => props.theme.color.buttonInverted};

    li {
        font-size: 1.5rem;
        font-weight: 500;
        text-align: left;
        list-style-image: url(${ListStyle});
        padding-inline-start: 1vmin;
        margin-bottom: 2vmin;
    }

    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        #essential_heading {
            grid-column: 2 / 3;
            grid-row: 1 / 3;

            margin-top: 0;
            text-align: left;
        }

        #essential_image {
            grid-column: 1 / 2;
            grid-row: 1 / 5;

            margin-top: 5vh;
        }

        #essential_list {
            grid-column: 2 /3;
            grid-row: 3 / 5;
        }
    }
`;

export const AnalyticsSection = styled(GridSection)`
    @media (min-width: ${(props) => props.theme.breakpoint.mobile}) {
        #analytics_heading {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
        }

        #analytics_text {
            grid-column: 1 / 2;
            grid-row: 3 / 5;
        }

        #analytics_image {
            grid-column: 2 / 3;
            grid-row: 1 / 5;

            align-self: flex-end;
        }
    }
`;

export const MainHeading = styled.h1`
    color: ${(props) => props.theme.color.primary};
    font-size: 4rem;
    font-weight: 700;
`;

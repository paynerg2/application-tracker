import styled from 'styled-components';
import DesktopLandingImage from '../../assets/Desktop_Landing_Image.png';
import MobileLandingImage from '../../assets/Mobile_Landing_Image.png';
import Button from '../../components/Button/button';

export const Layout = styled.div`
    min-height: 42em;
    height: 90vh;
    display: flex;
    flex-direction: column;

    background: white;

    &:after {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        right: 0;
        background-image: url(${DesktopLandingImage});
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        z-index: 0;
        opacity: 0.3;
        filter: brightness(60%);

        @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
            background-image: url(${MobileLandingImage});
            height: 100vh;
        }
    }

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        align-items: flex-start;
        justify-content: center;
        height: 100vh;
    }
`;
export const SimplifySection = styled.div`
    width: 80vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    z-index: 2;

    & > #simplify_text {
        font-weight: 600;
        font-size: 1.5em;
        max-width: 18em;

        @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
            font-size: 1em;
            text-align: center;
            width: 80vw;
        }
    }

    & > #simplify_cta {
        ${Button} {
            width: 16em;
            max-width: 80vw;
            font-size: 1.4em;
            font-weight: 700;
            background: transparent;
            color: ${(props) => props.theme.color.primary};
            text-transform: uppercase;
            border: 2px solid ${(props) => props.theme.color.primary};
            margin-top: 2em;

            &:hover {
                color: ${(props) => props.theme.color.contrastText};
                background-color: ${(props) => props.theme.color.primary};
                transition: all 0.4s ease-in-out;
            }
        }
    }
`;
export const MainHeading = styled.h1`
    color: ${(props) => props.theme.color.primary};
    font-size: 3em;
    font-weight: 700;
    text-align: left;
    max-width: 80vw;

    @media (max-width: ${(props) => props.theme.breakpoint.laptop}) {
        font-size: 2em;
        text-align: center;
    }
`;

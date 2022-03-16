import desktopBackground from '../../assets/Background_desktop.png';
import desktopBackgroundDark from '../../assets/Background_desktop_dark.png';
import mobileBackground from '../../assets/Background_mobile.png';
import mobileBackgroundDark from '../../assets/Background_mobile_dark.png';
import logo from '../../assets/Logo.svg';
import darkLogo from '../../assets/Dark_Logo.svg';

export const theme = {
    color: {
        primary: '#006F83',
        secondary: '#F5FBFF',
        background: '#FFF',
        mainText: '#4F4F4F',
        contrastText: '#FFF',
        footer: '#444',
        lightGray: '#A1A1A1',
        veryLightGray: '#F6F8F9',
        link: '#7E77FF',
        error: '#FF7E7E',
        mintGreen: '#67CC8E',
        skyBlue: '#00D8FF',
        surface: '#F5FBFF',
        secondarySurface: '#FFF',
        button: '#006F83',
        buttonInverted: '#FFF',
        separator: '#F6F8F9',
        input: '#FFF',
        dropzone: '#FAFAFA',
        dropzoneText: '#A1A1A1',
    },
    font: {
        primary: 'Montserrat',
        secondary: 'Poppins',
    },
    breakpoint: {
        laptop: '1200px',
        mobile: '600px',
    },
    borders: {
        radius: '1vmin',
        shadow: '2px 2px 10px rgba(0,0,0,0.15)',
    },
    background: `url(${desktopBackground})`,
    mobileBackground: `url(${mobileBackground})`,
    logo: `url(${logo})`,
};

export const darkTheme = {
    ...theme,
    color: {
        primary: '#332940',
        secondary: '#101D21',
        background: '#121212',
        mainText: 'rgba(255,255,255,0.87)',
        contrastText: '#rgba(255,255,255,0.87)',
        footer: '#000',
        lightGray: '#A1A1A1',
        veryLightGray: '#F6F8F9',
        link: '#7E77FF',
        error: '#CF6679',
        mintGreen: '#67CC8E',
        skyBlue: '#00D8FF',
        surface: '#1D1D1D',
        secondarySurface: '#212121',
        button: '#332940',
        buttonInverted: 'rgba(255,255,255,0.87)',
        separator: '#444',
        input: '#2A2631',
        dropzone: '#A1A1A1',
        dropzoneText: '#rgba(255,255,255,0.87)',
    },
    background: `url(${desktopBackgroundDark})`,
    mobileBackground: `url(${mobileBackgroundDark})`,
    logo: `url(${darkLogo})`,
};

export type ThemeType = typeof theme;
export default theme;

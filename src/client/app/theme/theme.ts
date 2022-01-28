export const theme = {
    color: {
        primaryBlue: '#006F83',
        lightBlue: '#F5FBFF',
        white: '#FFF',
        desaturatedGray: '#4F4F4F',
        darkGray: '#444',
        lightGray: '#A1A1A1',
        veryLightGray: '#F6F8F9',
        link: '#7E77FF',
        error: '#FF7E7E',
        mintGreen: '#67CC8E',
        skyBlue: '#00D8FF',
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
};

export type ThemeType = typeof theme;
export default theme;

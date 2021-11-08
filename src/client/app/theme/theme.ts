export const theme = {
    color: {
        primaryBlue: '#006F83',
        white: '#FFF',
        desaturatedGray: '#4F4F4F',
        link: '#7E77FF',
    },
    font: {
        primary: 'Montserrat',
        secondary: 'Poppins',
    },
    breakpoint: {
        laptop: '1200px',
    },
    borders: {
        radius: '1vmin',
        shadow: '2px 2px 10px rgba(0,0,0,0.15)',
    },
};

export type ThemeType = typeof theme;
export default theme;

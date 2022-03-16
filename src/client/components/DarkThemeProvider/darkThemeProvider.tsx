import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { theme, darkTheme } from '../../app/theme/theme';

interface Props {
    children?: React.ReactChild | React.ReactChild[];
}

const DarkThemeProvider = ({ children }: Props) => {
    const { isDarkMode } = useAppSelector((state) => state.auth.user.settings);

    const getTheme = () => (isDarkMode ? darkTheme : theme);

    return <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;

import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { theme, darkTheme } from '../../app/theme/theme';

const DarkThemeProvider: FC = ({ children }) => {
    const user = useAppSelector((state) => state.auth.user);

    const getTheme = () => (user.settings?.isDarkMode ? darkTheme : theme);

    return <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;

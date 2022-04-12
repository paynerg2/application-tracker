import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { theme, darkTheme } from '../../app/theme/theme';
import { isEmpty } from '../../_helpers/objectHelpers';

const DarkThemeProvider: FC = ({ children }) => {
    const user = useAppSelector((state) => state.auth.user);

    const getTheme = () => (user?.settings?.isDarkMode ? darkTheme : theme);

    //@ts-ignore
    return <ThemeProvider theme={!isEmpty(user) ? getTheme() : theme}>{children}</ThemeProvider>;
};

export default DarkThemeProvider;

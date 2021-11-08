import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { store } from './client/app/store';
import App from './client/App';
import { theme } from './client/app/theme/theme';
import GlobalCSS from './client/app/theme/global.css';

render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <GlobalCSS />
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.querySelector('#root')
);

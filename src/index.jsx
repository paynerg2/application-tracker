import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { store } from './client/app/store';
import App from './client/App';
import { theme } from './client/app/theme/theme';
import GlobalCSS from './client/app/theme/global.css';
import { AuthProvider } from './client/hooks/useAuth';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);
if (!root) throw new Error('Failed to find the root element.');

root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <GlobalCSS />
                    <App />
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);

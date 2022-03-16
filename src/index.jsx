import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './client/app/store';
import App from './client/App';
import GlobalCSS from './client/app/theme/global.css';
import DarkThemeProvider from './client/components/DarkThemeProvider/darkThemeProvider';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);
if (!root) throw new Error('Failed to find the root element.');

console.log(store.getState());

root.render(
    <Provider store={store}>
        <DarkThemeProvider>
            <BrowserRouter>
                <GlobalCSS />
                <App />
            </BrowserRouter>
        </DarkThemeProvider>
    </Provider>
);

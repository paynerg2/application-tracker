import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './client/app/store';
import App from './client/App';
import GlobalCSS from './client/app/theme/global.css';
import DarkThemeProvider from './client/components/DarkThemeProvider/darkThemeProvider';

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <DarkThemeProvider>
            <BrowserRouter>
                <GlobalCSS />
                <App />
            </BrowserRouter>
        </DarkThemeProvider>
    </Provider>,
    document.querySelector('#root')
);

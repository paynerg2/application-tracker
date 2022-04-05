import React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './app/store';
import App from './App';
import GlobalCSS from './app/theme/global.css';
import DarkThemeProvider from './components/DarkThemeProvider/darkThemeProvider';

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

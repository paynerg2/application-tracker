import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './client/_helpers';
import { App } from './client/App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

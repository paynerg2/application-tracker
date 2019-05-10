import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { applications } from './applications.reducer';

const rootReducer = combineReducers({
    authentication,
    users,
    applications,
    alert
});

export default rootReducer;

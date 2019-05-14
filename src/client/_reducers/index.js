import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { applications } from './applications.reducer';
import { interviews } from './interviews.reducer';

const rootReducer = combineReducers({
    authentication,
    users,
    applications,
    interviews,
    alert
});

export default rootReducer;

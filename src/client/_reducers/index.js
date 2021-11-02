import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { applications } from './applications.reducer';
import { interviews } from './interviews.reducer';

const reducers = {
    authentication,
    users,
    applications,
    interviews,
    alert,
};

export default reducers;

import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// Apply React 16 Enzyme adapter
Enzyme.configure({
    adapter: new EnzymeAdapter(),
    disableLifecycleMethods: true,
});

import Enzyme, { shallow, render, mount } from 'enzyme',
import Adapter from 'enzyme-adapter-react-16';

// Apply React 16 Enzyme adapter
Enzyme.configure({adapter: new Adapter()});

// Set Enzyme functions as global to reduce imports
global.shallow = shallow;
global.render = render;
global.mount = mount;
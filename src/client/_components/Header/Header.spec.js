import React from 'react';

import { shallow } from 'enzyme';
import { Header } from './Header';
import { testStore } from '../../_testing/utils';

const setUp = (props = {}, initialState = {}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<Header store={store} {...props} />).dive();
    return wrapper;
};

describe('Header Component', () => {
    let wrapper;
    let mockFunction;
    beforeEach(() => {
        mockFunction = jest.fn();
    });

    it('should render without errors', () => {
        wrapper = setUp({ dispatch: mockFunction });
        expect(wrapper).toBeDefined();
    });

    describe('when a user is logged in', () => {
        beforeEach(() => {
            const props = {
                dispatch: mockFunction
            };
            const initialState = {
                authentication: {
                    user: {
                        username: 'test'
                    }
                }
            };
            wrapper = setUp(props, initialState);
        });

        it('should render with user functions', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when a user is not logged in', () => {
        beforeEach(() => {
            const props = {
                dispatch: mockFunction
            };
            wrapper = setUp(props);
        });

        it('should render with authentication functions', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});

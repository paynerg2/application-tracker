import React from 'react';
import { shallow } from 'enzyme';

import { InterviewList } from './InterviewList';
import { testStore } from '../../_testing/utils';

const setUp = (props = {}, initialState = {}) => {
    const store = testStore(initialState);
    const component = shallow(
        <InterviewList store={store} {...props} />
    ).dive();
    return component;
};

const props = {
    interviews: [
        {
            startTime: '5:55PM',
            location: 'test 1'
        },
        {
            startTime: '5:55PM',
            location: 'test 2'
        }
    ]
};

describe('Interview List Component', () => {
    let mockFunction, wrapper;
    beforeEach(() => {
        mockFunction = jest.fn();

        const initialState = {
            interviews: {
                loading: false
            }
        };
        wrapper = setUp({ ...props, dispatch: mockFunction }, initialState);
    });

    describe('before finished loading', () => {
        it('does not render a list of interviews', () => {
            const initialState = {
                interviews: {
                    loading: true
                }
            };
            wrapper = setUp({ ...props, dispatch: mockFunction }, initialState);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when finished loading', () => {
        it('renders without error', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});

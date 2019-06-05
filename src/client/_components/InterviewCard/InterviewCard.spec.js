import React from 'react';
import { shallow } from 'enzyme';

import { InterviewCard } from './InterviewCard';
import { testStore } from '../../_testing/utils';

const setUp = (props = {}, initialState = {}) => {
    const store = testStore(initialState);
    const component = shallow(
        <InterviewCard store={store} {...props} />
    ).dive();
    return component;
};

describe('Interview Card Component', () => {
    let mockFunction, wrapper;
    beforeEach(() => {
        mockFunction = jest.fn();
        const props = {
            dispatch: mockFunction,
            interview: {
                startTime: '5:55pm',
                location: 'test',
                _id: 'test',
                applicationId: 'test'
            }
        };
        wrapper = setUp(props);
    });

    it('renders without crashing', () => {
        expect(wrapper).toBeDefined();
    });

    describe('when the component is selected', () => {
        beforeEach(() => {
            const cardListItemWrapper = wrapper.find('CardListItem');
            cardListItemWrapper.simulate('mouseEnter');
        });

        it('shows additional buttons', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when the component is not selected', () => {
        it('does not show additional buttons', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('returns to unselected state on mouse leave event', () => {
            const CardListItemWrapper = wrapper.find('CardListItem');
            CardListItemWrapper.simulate('mouseEnter');
            CardListItemWrapper.simulate('mouseLeave');
            expect(wrapper).toMatchSnapshot();
        });
    });
});

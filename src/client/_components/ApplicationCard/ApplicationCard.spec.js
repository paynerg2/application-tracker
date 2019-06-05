import React from 'react';
import { shallow } from 'enzyme';

import { ApplicationCard } from './ApplicationCard';
import { testStore } from '../../_testing/utils';

const setUp = (props = {}, initialState = {}) => {
    const store = testStore(initialState);
    const component = shallow(
        <ApplicationCard store={store} {...props} />
    ).dive();
    return component;
};

describe('Application Card Component', () => {
    let mockFunction, wrapper;
    beforeEach(() => {
        mockFunction = jest.fn();
        const props = {
            dispatch: mockFunction,
            application: {
                _id: 'test',
                jobTitle: 'test',
                company: 'test',
                location: 'test',
                mainSkill: 'test',
                dateApplicationSent: '5/5/55',
                response: 'No Response',
                requiredSkillsMet: 1,
                requiredSkillsTotal: 10,
                additionalSkillsMet: 1,
                additionalSkillsTotal: 10
            },
            interviews: []
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

        it('shows additional buttons in the right column', () => {
            const rightColumnWrapper = wrapper.find('RightColumn');
            expect(rightColumnWrapper).toMatchSnapshot();
        });
    });

    describe('when the component is not selected', () => {
        it('does not show additional buttons in the right column', () => {
            const rightColumnWrapper = wrapper.find('RightColumn');
            expect(rightColumnWrapper).toMatchSnapshot();
        });

        it('returns to unselected state on mouse leave event', () => {
            const cardListItemWrapper = wrapper.find('CardListItem');
            cardListItemWrapper.simulate('mouseEnter');
            cardListItemWrapper.simulate('mouseLeave');
            const rightColumnWrapper = wrapper.find('RightColumn');
            expect(rightColumnWrapper).toMatchSnapshot();
        });
    });

    describe('when there are no associated interviews', () => {
        it('shows a dropdown for application response', () => {
            const leftColumnWrapper = wrapper.find('LeftColumn');
            expect(leftColumnWrapper).toMatchSnapshot();
        });

        it('does not show an interview list or button to add interviews', () => {
            const bottomWrapper = wrapper.find('Bottom');
            expect(bottomWrapper).toMatchSnapshot();
        });
    });

    describe('when there are associated interviews', () => {
        beforeEach(() => {
            const props = {
                dispatch: mockFunction,
                application: {
                    _id: 'test',
                    jobTitle: 'test',
                    company: 'test',
                    location: 'test',
                    mainSkill: 'test',
                    dateApplicationSent: '5/5/55',
                    response: 'Interview',
                    requiredSkillsMet: 1,
                    requiredSkillsTotal: 10,
                    additionalSkillsMet: 1,
                    additionalSkillsTotal: 10
                },
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
            wrapper = setUp(props);
        });

        it('shows no dropdown for responses', () => {
            const leftColumnWrapper = wrapper.find('LeftColumn');
            expect(leftColumnWrapper).toMatchSnapshot();
        });

        it('shows a list of interviews and button to interviews', () => {
            const bottomWrapper = wrapper.find('Bottom');
            expect(bottomWrapper).toMatchSnapshot();
        });
    });
});

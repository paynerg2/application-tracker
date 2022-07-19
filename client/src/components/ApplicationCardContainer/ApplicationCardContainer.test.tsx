import React from 'react';
import { shallow } from 'enzyme';
import ApplicationCardContainer from './ApplicationCardContainer';
import {
    Application,
    contractTypes,
    degreeLevels,
    responseTypes,
} from '../../interfaces/application';

describe('<ApplicationCardContainer />', () => {
    // Arrange test data
    const testApplication: Application = {
        id: 'test',
        jobTitle: 'test',
        company: 'test',
        requiredSkillsTotal: 0,
        requiredSkillsMet: 0,
        additionalSkillsTotal: 0,
        additionalSkillsMet: 0,
        jobDescriptionLink: 'test',
        yearsOfExperience: 0,
        temp: false,
        arbitraryRelocation: false,
        location: 'test',
        degreeLevel: degreeLevels[0],
        contract: contractTypes[0],
        mainSkill: 'test',
        datePosted: new Date(),
        dateApplicationSent: new Date(),
        expectedSalary: 0,
        givenReferral: false,
        response: responseTypes[0],
    };

    const threePagesOfData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
        const app = { ...testApplication, id: `application_${value}` };
        return app;
    });
    const twoPagesOfData = threePagesOfData.slice(0, 8);
    const onePageOfData = threePagesOfData.slice(0, 4);

    it('Gives no pagination options if there is only one page of data', () => {
        const wrapper = shallow(<ApplicationCardContainer applications={onePageOfData} />);
        expect(wrapper.find('#nextButton')).toHaveLength(0);
        expect(wrapper.find('#prevButton')).toHaveLength(0);
    });

    it('Displays a next button if there is more than one page of data', () => {
        const wrapper = shallow(<ApplicationCardContainer applications={twoPagesOfData} />);
        expect(wrapper.find('#nextButton')).toHaveLength(1);
        expect(wrapper.find('#prevButton')).toHaveLength(0);
    });

    it('Displays only the prev button on the final page', () => {
        const wrapper = shallow(<ApplicationCardContainer applications={twoPagesOfData} />);

        expect(wrapper.find('#nextButton')).toHaveLength(1);
        expect(wrapper.find('#prevButton')).toHaveLength(0);

        const nextButton = wrapper.find('#nextButton');

        nextButton.simulate('click');

        expect(wrapper.find('#nextButton')).toHaveLength(0);
        expect(wrapper.find('#prevButton')).toHaveLength(1);
    });

    it('Displays both next and prev buttons on middle pages', () => {
        // Testing pagination. It is expected to initially display a 'next'
        // button since there are >4 elements. Once 'next' is clicked, it should
        // display both a 'prev' and 'next' button, since there are >8 elements.
        // Once 'next' is clicked again it should only display the 'prev' button
        // since there are <=12 elements.
        // Assumes pageSize=4

        const wrapper = shallow(<ApplicationCardContainer applications={threePagesOfData} />);

        expect(wrapper.find('#nextButton')).toHaveLength(1);
        expect(wrapper.find('#prevButton')).toHaveLength(0);

        let nextButton = wrapper.find('#nextButton');

        nextButton.simulate('click');

        expect(wrapper.find('#nextButton')).toHaveLength(1);
        expect(wrapper.find('#prevButton')).toHaveLength(1);

        nextButton = wrapper.find('#nextButton');
        nextButton.simulate('click');

        expect(wrapper.find('#nextButton')).toHaveLength(0);
        expect(wrapper.find('#prevButton')).toHaveLength(1);
    });
});

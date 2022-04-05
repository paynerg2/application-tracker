import React from 'react';
import { shallow } from 'enzyme';
import ActionAccordion from './ActionAccordion';

describe('<ActionAccordion />', () => {
    const edit = jest.fn();
    const onDelete = jest.fn();
    const childId = 'test-child';
    const wrapper = shallow(
        <ActionAccordion edit={edit} onDelete={onDelete} isOpen={false}>
            <div id={childId}>child</div>
        </ActionAccordion>
    );

    beforeEach(() => {
        edit.mockClear();
    });

    it('Renders the given child component', () => {
        expect(wrapper.find(`div#${childId}`)).toHaveLength(1);
    });

    it('Calls the provided edit function when the Edit button is clicked', () => {
        expect(edit).toHaveBeenCalledTimes(0);

        const editButton = wrapper.find({ color: 'primary' });
        editButton.simulate('click');

        expect(edit).toHaveBeenCalledTimes(1);
    });
});

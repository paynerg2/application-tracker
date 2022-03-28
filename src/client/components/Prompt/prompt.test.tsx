import React from 'react';
import { shallow } from 'enzyme';
import Prompt from './prompt';

describe('<Prompt />', () => {
    const confirm = jest.fn();
    const cancel = jest.fn();
    const childId = 'test-child';
    const wrapper = shallow(
        <Prompt confirm={confirm} cancel={cancel}>
            <div id={childId}>child</div>
        </Prompt>
    );

    beforeEach(() => {
        confirm.mockClear();
        cancel.mockClear();
    });

    it('Renders the given child component(s)', () => {
        expect(wrapper.find(`div#${childId}`)).toHaveLength(1);
    });

    it('Renders confirm and cancel buttons', () => {
        expect(wrapper.find('#confirm')).toHaveLength(1);
        expect(wrapper.find('#cancel')).toHaveLength(1);
    });

    it('Calls the provided cancel function when the Cancel button is clicked', () => {
        expect(cancel).toHaveBeenCalledTimes(0);

        wrapper.find('#cancel').simulate('click');

        expect(cancel).toHaveBeenCalledTimes(1);
    });
});

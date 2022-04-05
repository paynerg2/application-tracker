import React from 'react';
import { shallow } from 'enzyme';
import Checkbox from './checkbox';

describe('<Checkbox />', () => {
    const label = 'test';
    const onChange = jest.fn();
    const checkbox = shallow(<Checkbox label={label} onChange={onChange} />);

    it('Renders a given label', () => {
        expect(checkbox.find('label').text()).toEqual(label);
    });

    it('Calls the onChange function passed to it when clicked', () => {
        expect(onChange).toHaveBeenCalledTimes(0);
        checkbox.find('input').simulate('change');
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});

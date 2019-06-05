import React from 'react';
import { shallow, mount } from 'enzyme';

import { ProgressBar } from './ProgressBar';
import { checkProps } from '../../_testing/utils';

const setUp = (props = {}) => {
    const component = shallow(<ProgressBar {...props} />);
    return component;
};

const mountedSetUp = (props = {}) => {
    const mountedComponent = mount(<ProgressBar {...props} />);
    return mountedComponent;
};

describe('Progress Bar Component', () => {
    it('renders without crashing', () => {
        const component = setUp();
    });

    describe('Prop Types', () => {
        describe('when expected props are present', () => {
            const props = {
                fill: 20
            };

            it('renders without errors', () => {
                const component = setUp(props);
            });

            it('should not throw a warning', () => {
                const propsError = checkProps(ProgressBar, props);
                expect(propsError).toBeUndefined();
            });

            it('sets the property as expected', () => {
                const component = mountedSetUp({ fill: 20 });
                const { fill } = component.props();
                expect(fill).toBe(20);
            });
        });

        describe('when expected props are not present', () => {
            it('should not throw a warning', () => {
                const propsError = checkProps(ProgressBar, {});
                expect(propsError).toBeUndefined();
            });
        });
    });
});

/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import containerText from '../containerText.vue';

describe('containerText', () => {
	it('should render containerText', () => {
		const wrapper = mount(containerText, {
			propsData: {
				label: 'label',
				textValue: 'textValue'
			}
		});
		// has
		expect(wrapper.find('label').exists()).toBeTruthy();
		// has
		expect(wrapper.find('textarea').exists()).toBeTruthy();
		// props
		expect(wrapper.props().label).toBe('label');
		// props
		expect(wrapper.props().textValue).toBe('textValue');
	});
});
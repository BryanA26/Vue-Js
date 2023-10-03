/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import inputText from '../inputText.vue';

describe('InputText', () => {
	it('renders a text input', () => {
		const wrapper = mount(inputText, {
			propsData: {
				type: 'text'
			}
		});
		expect(wrapper.find('input[type="text"]').exists()).toBeTruthy();
	});

	it('emits an input event when text is entered', () => {
		const wrapper = mount(inputText, {
			propsData: {
				type: 'text'
			}
		});
		const input = wrapper.find('input[type="text"]');
		input.setValue('test');
		expect(wrapper.emitted().input).toBeTruthy();
		expect(wrapper.emitted().input[0]).toEqual(['test']);
	});
});

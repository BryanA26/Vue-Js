/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToTest from '../ToTest.vue'

describe('ToTest', () => {
	it('should render ToTest', () => {
		const wrapper = mount(ToTest)
		//  has h1
		expect(wrapper.find('h1').exists()).toBeTruthy()
		// has input text
		expect(wrapper.find('input[type="text"]').exists()).toBeTruthy()
		// has button
		expect(wrapper.find('button').exists()).toBeTruthy()
		// expect(wrapper.html()).toMatchSnapshot();
	})
	it('should change the text when button is clicked', async () => {
		const wrapper = mount(ToTest)
		await wrapper.find('input[type="text"]').setValue('clicked')
		await wrapper.find('button').trigger('click')
		expect(wrapper.find('h1').text()).toEqual('clicked')
	})

	it('should fail', () => {
		expect(1).toBe(1)
	})
})
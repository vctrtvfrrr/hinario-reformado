import { shallowMount } from '@vue/test-utils'
import About from './About.vue'

describe('About', () => {
  it('can mount the component', async () => {
    const component = await shallowMount(About)
    expect(component.html()).toContain('Sobre')
  })
})

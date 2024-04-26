import { mountSuspended } from '@nuxt/test-utils/runtime'
import Copyright from './Copyright.vue'

describe('Copyright', () => {
  it('can mount the component', async () => {
    const component = await mountSuspended(Copyright)
    expect(component.html()).toContain('Victor Ferreira')
  })
})

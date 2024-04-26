import { mountSuspended } from '@nuxt/test-utils/runtime'
import AppHeader from './AppHeader.vue'

describe('AppHeader', () => {
  it('has title and descriptioncan', async () => {
    const appConfig = useAppConfig()
    const component = await mountSuspended(AppHeader)
    const html = component.html()
    expect(html).toContain(appConfig.title)
    expect(html).toContain(appConfig.description)
  })
})

import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blackest: '#0b090a',
      black: '#161a1d',
      white: colors.white,
      blue: colors.sky,
      orange: colors.orange,
      green: {
        '50': '#f2fbf4',
        '100': '#e1f7e7',
        '200': '#c4eed0',
        '300': '#96dfab',
        '400': '#60c87f',
        '500': '#3aad5d',
        '600': '#2b8e4a',
        '700': '#25703c',
        '800': '#215732',
        '900': '#1d4a2c',
        '950': '#0b2815',
      },
      red: {
        '50': '#fbeaea',
        '100': '#f7d4d4',
        '200': '#efa9a9',
        '300': '#e77e7e',
        '400': '#df5353',
        '500': '#d62828',
        '600': '#ac2020',
        '700': '#811818',
        '800': '#561010',
        '900': '#2b0808',
        '950': '#150404',
      },
      // gray with another name for Nuxt UI reasons: https://ui.nuxt.com/getting-started/theming#css-variables
      cool: {
        '50': '#f4f7f7',
        '100': '#e2e9eb',
        '200': '#c9d4d8',
        '300': '#a3b6bd',
        '400': '#76909a',
        '500': '#5b757f',
        '600': '#4e626c',
        '700': '#44525a',
        '800': '#3d474d',
        '900': '#363e43',
        '950': '#161a1d',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        '112': '28rem',
        '120': '30rem',
      },
    },
  },
}

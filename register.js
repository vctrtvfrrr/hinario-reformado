// Needed to remove the '--experimental-loader=module' warning:
// https://nodejs.org/api/cli.html#--experimental-loadermodule
import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register('ts-node/esm', pathToFileURL('./'))

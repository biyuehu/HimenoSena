import '@lit-labs/ssr-client/lit-element-hydrate-support.js'
import { customElement } from 'lit/decorators.js'
import { SenaBlacklist } from './Components/SenaBlacklist.ts'
import { error, log } from './utils/logger.ts'

try {
  customElement('sena-blacklist')(SenaBlacklist)
  log('Blacklist page loaded.')
  if ('HIMENO_SENA_BUILD_TIME' in globalThis) {
    log(`Build time: ${(globalThis as unknown as { HIMENO_SENA_BUILD_TIME: string }).HIMENO_SENA_BUILD_TIME}`)
  }
} catch (err) {
  error(err instanceof Error ? err.message : String(err))
}

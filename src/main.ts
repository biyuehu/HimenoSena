import '@lit-labs/ssr-client/lit-element-hydrate-support.js'
import { bootstrap } from './index.ts'
import { error, log } from './utils/logger.ts'

bootstrap('姫野星奏、最高！')
  .then(() => {
    log("Hello from himenosena's lover!")
    log('If you like this, please give me a star on GitHub~: https://github.com/biyuehu/HimenoSena')
    if ('HIMENO_SENA_BUILD_TIME' in globalThis)
      log(`Build time: ${(globalThis as unknown as { HIMENO_SENA_BUILD_TIME: string }).HIMENO_SENA_BUILD_TIME}`)
  })
  .catch((err) => {
    error(err.message)
  })

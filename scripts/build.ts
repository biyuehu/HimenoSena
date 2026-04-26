import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SenaComponent } from '../src/Components/SenaComponent.ts'
import { copyFile, safe } from './utils.ts'

const [PUBLIC_DIR, DEST_DIR] = /* Deno.args */ ['public', 'build']

if (!PUBLIC_DIR || !DEST_DIR) {
  console.error('Usage: build.ts <public_dir> <dest_dir>')
  Deno.exit(1)
}

await new Deno.Command(Deno.execPath(), {
  args: ['check']
})

safe(() => Deno.removeSync(DEST_DIR, { recursive: true }))
safe(() => Deno.mkdirSync(DEST_DIR, { recursive: true }))

copyFile(PUBLIC_DIR, DEST_DIR)

const HIMENO_SENA_BUILD_TIME = new Date().toLocaleString()

const [indexComment, jsAndCssComment] = ((time) =>
  [
    /* html */ `<!-- Project: https://github.com/biyuehu/HimenoSena -->
<!-- Build time: ${time} -->\n`,
    /* js */ `/**
 * @project https://github.com/biyuehu/HimenoSena
 * @license SENA WITH GPL-3.0
 * @build ${time}
 */`
  ] as const)(HIMENO_SENA_BUILD_TIME)

await new Deno.Command(Deno.execPath(), {
  args: ['bundle', '--platform', 'browser', '--minify', '--output', `${DEST_DIR}/bundle.js`, 'src/main.ts']
})
  .spawn()
  .output()

customElement('sena-component')(SenaComponent)

Deno.writeTextFileSync(
  `${DEST_DIR}/index.html`,
  /* html */ `${indexComment}${Deno.readTextFileSync(`${PUBLIC_DIR}/index.html`).replace(
    '<sena-component></sena-component>',
    collectResultSync(render(html`<sena-component></sena-component>`))
  )}`
)
Deno.writeTextFileSync(
  `${DEST_DIR}/bundle.js`,
  `${jsAndCssComment}\n\nglobalThis.HIMENO_SENA_BUILD_TIME = ${JSON.stringify(HIMENO_SENA_BUILD_TIME)};\n${Deno.readTextFileSync(`${DEST_DIR}/bundle.js`)}`
)
Deno.writeTextFileSync(
  `${DEST_DIR}/styles.css`,
  `${jsAndCssComment}\n\n${Deno.readTextFileSync(`${DEST_DIR}/styles.css`)}`
)

console.log('Build complete.')

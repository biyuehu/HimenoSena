import { render } from '@lit-labs/ssr'
import { collectResultSync } from '@lit-labs/ssr/lib/render-result.js'
import { html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { SenaBlacklist } from '../src/Components/SenaBlacklist.ts'
import { SenaMain } from '../src/Components/SenaMain.ts'
import { copyFile, safe } from './utils.ts'

const [PUBLIC_DIR, DEST_DIR] = /* Deno.args */ ['public', 'build']

if (!PUBLIC_DIR || !DEST_DIR) {
  console.error('Usage: build.ts <public_dir> <dest_dir>')
  Deno.exit(1)
}

const check = await new Deno.Command(Deno.execPath(), {
  args: ['check']
}).output()

if (!check.success) {
  console.error(new TextDecoder().decode(check.stderr))
  Deno.exit(check.code)
}

safe(() => Deno.removeSync(DEST_DIR, { recursive: true }))
safe(() => Deno.mkdirSync(DEST_DIR, { recursive: true }))

copyFile(PUBLIC_DIR, DEST_DIR)
copyFile('data', `${DEST_DIR}/data`)

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

customElement('sena-main')(SenaMain)
customElement('sena-blacklist')(SenaBlacklist)

const pages = [
  {
    html: 'index.html',
    bundle: 'bundle.js',
    entry: 'src/main.ts',
    placeholder: '<sena-main></sena-main>',
    ssr: () =>
      collectResultSync(
        render(html`
        <sena-main></sena-main>
      `)
      )
  },
  {
    html: 'blacklist.html',
    bundle: 'blacklist.bundle.js',
    entry: 'src/blacklist.ts',
    placeholder: '<sena-blacklist></sena-blacklist>',
    ssr: () =>
      collectResultSync(
        render(html`
        <sena-blacklist></sena-blacklist>
      `)
      )
  }
] as const

for (const page of pages) {
  const bundle = await new Deno.Command(Deno.execPath(), {
    args: ['bundle', '--platform', 'browser', '--minify', '--output', `${DEST_DIR}/${page.bundle}`, page.entry]
  }).output()

  if (!bundle.success) {
    console.error(new TextDecoder().decode(bundle.stderr))
    Deno.exit(bundle.code)
  }

  Deno.writeTextFileSync(
    `${DEST_DIR}/${page.html}`,
    `${indexComment}${Deno.readTextFileSync(`${PUBLIC_DIR}/${page.html}`).replace(page.placeholder, page.ssr())}`
  )

  Deno.writeTextFileSync(
    `${DEST_DIR}/${page.bundle}`,
    `${jsAndCssComment}\n\nglobalThis.HIMENO_SENA_BUILD_TIME = ${JSON.stringify(
      HIMENO_SENA_BUILD_TIME
    )};\n${Deno.readTextFileSync(`${DEST_DIR}/${page.bundle}`)}`
  )
}

Deno.writeTextFileSync(
  `${DEST_DIR}/styles.css`,
  `${jsAndCssComment}\n\n${Deno.readTextFileSync(`${DEST_DIR}/styles.css`)}`
)

console.log('Build complete.')

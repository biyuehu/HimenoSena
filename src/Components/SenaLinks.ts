import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import type { Link } from '../types.ts'
import './SenaTextBlock.ts'

@customElement('sena-links')
export class SenaLinks extends LitElement {
  private readonly links: Link[] = [
    {
      name: 'Arimura Romi',
      description: "Character Arimura Romi (有村ロミ) 's webite",
      url: 'https://arimuraromi.com'
    },
    {
      name: 'RomiNest',
      description: "Author's nest...",
      url: 'https://hotaru.icu'
    }
  ]

  public override render() {
    return html`
    <link rel="stylesheet" href="./styles.css">
    <sena-text-block head="Links">
      ${this.links.map(({ name, description, url }) => html`<a href=${url} target="_blank">${name}<i>${description ? ` - ${description}` : ''}</i></a><br />`)}
    </sena-text-block>
    `
  }
}

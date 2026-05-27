import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { isHimenoSenaBirthday } from '../utils/birthday.ts'
import SenaEventsEmmiter from '../utils/eventsEmiter.ts'

@customElement('sena-birthday')
export class SenaBirthday extends LitElement {
  private readonly isBirthday = isHimenoSenaBirthday()

  private readonly lights = Array.from({ length: 18 }, (_, index) => index)

  private getLightStyle(index: number) {
    const left = (index * 47 + 11) % 100
    const drift = ((index % 5) - 2) * 24
    return `--birthday-left: ${left}vw; --birthday-drift: ${drift}px; --birthday-delay: -${index * 0.42}s`
  }

  public override render() {
    if (!this.isBirthday) return html``

    return html`
      <link rel="stylesheet" href="./styles.css">
      <div class="birthday-layer" aria-hidden="true">
        <div class="birthday-glow"></div>
        ${this.lights.map(
          (index) =>
            html`<span class="birthday-light" style=${this.getLightStyle(index)}></span>`
        )}
      </div>
      <div class="birthday-note">
        <div>Happy Birthday</div>
        <strong>Himeno Sena</strong>
        <span>星の音が、今日だけ少し近くに聞こえる。</span>
      </div>
    `
  }

  public override firstUpdated() {
    if (!this.isBirthday) return
    SenaEventsEmmiter.emit('notify', '今日は姫野星奏の誕生日。星奏、誕生日おめでとう。')
  }
}

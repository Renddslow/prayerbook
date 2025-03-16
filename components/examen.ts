import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("prayerbook-examen")
export class Examen extends LitElement {
  static styles = css`
    .examen {
      display: grid;
      grid-gap: var(--spacing-md);

      p {
        margin-block: 0;
      }

      h2 {
        font-size: var(--font-size-md);
        margin-block: 0;
      }
    }
  `;

  render() {
    return html`<prayerbook-block>
      <div class="examen">
        <h2>Examen</h2>
        <p>
          Come, Holy Spirit, fill the hearts of your faithful and kindle in them
          the fire of your love. Make us ever aware of your presence.
          <strong>Amen.</strong>
        </p>
        <prayerbook-instruction
          >Reflect on the day with gratitude. Then walk through your day with
          God, looking for his presence. Where was he most
          present?</prayerbook-instruction
        >
        <prayerbook-instruction
          >Where did you notice yourself actively ignoring God’s grace or
          presence? Where did you miss out on joy or actively
          sin?</prayerbook-instruction
        >
        <prayerbook-instruction
          >Reflect on the day ahead.</prayerbook-instruction
        >
        <prayerbook-instruction
          >Sit in silence with God.</prayerbook-instruction
        >
      </div>
    </prayerbook-block>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-examen": Examen;
  }
}

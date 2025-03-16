import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("prayerbook-prayer")
export class Prayer extends LitElement {
  static styles = css`
    .prayer p {
      margin-block: 0;
    }
  `;

  render() {
    return html`<prayerbook-block>
      <div class="prayer">
        <slot></slot>
      </div>
    </prayerbook-block>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-prayer": Prayer;
  }
}

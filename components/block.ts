import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("prayerbook-block")
export class Block extends LitElement {
  static styles = css`
    .block {
      break-inside: avoid;
      margin-block: var(--spacing-md);
    }
  `;

  render() {
    return html`<section class="block"><slot></slot></section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-block": Block;
  }
}

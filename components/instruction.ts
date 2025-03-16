import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("prayerbook-instruction")
export class Instruction extends LitElement {
  static styles = css`
    .instruction {
      display: block;
      font-style: italic;
      margin-block: 0;
      font-size: var(--font-size-md);
    }
  `;

  render() {
    return html`<prayerbook-block
      ><p class="instruction"><slot></slot></p
    ></prayerbook-block>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-instruction": Instruction;
  }
}

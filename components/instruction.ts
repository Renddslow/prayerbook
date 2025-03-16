import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("prayerbook-instruction")
export class Instruction extends LitElement {
  static styles = css`
    .instruction {
      display: block;
      font-style: italic;
      margin-block: 0;
    }
  `;

  render() {
    return html`<p class="instruction"><slot></slot></p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-instruction": Instruction;
  }
}

import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("prayerbook-page-break")
export class PageBreak extends LitElement {
  static styles = css`
    .page-break {
      break-after: page;
      break-before: page;
      margin-block: var(--spacing-xl);
    }
  `;

  render() {
    return html`<div class="page-break"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-page-break": PageBreak;
  }
}

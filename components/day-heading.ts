import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("prayerbook-day-heading")
export class DayHeading extends LitElement {
  @property()
  accessor title: string = "";

  static styles = css`
    .day-heading h2 {
      font-size: var(--font-size-lg);
      margin-block-end: var(--spacing-md);
    }
  `;

  render() {
    return html`<div class="day-heading">
      <h2>${this.title}</h2>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-day-heading": DayHeading;
  }
}

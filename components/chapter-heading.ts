import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("prayerbook-chapter-heading")
export class ChapterHeading extends LitElement {
  @property()
  accessor title: string = "";

  @property()
  accessor subtitle: string = "";

  static styles = css`
    .heading {
      break-before: page;
      display: grid;
      grid-gap: var(--spacing-sm);
      margin-block: var(--spacing-xl) var(--spacing-lg);
    }

    .heading h1 {
      font-size: var(--font-size-xl);
      margin-block: 0;
    }

    .heading p {
      font-size: var(--font-size-sm);
      margin-block: 0;
    }
  `;

  render() {
    return html`<div class="heading">
      <p>${this.subtitle}</p>
      <h1>${this.title}</h1>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-chapter-heading": ChapterHeading;
  }
}

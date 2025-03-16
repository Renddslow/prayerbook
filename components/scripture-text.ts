import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type ReferencePosition = "before" | "after";

@customElement("prayerbook-scripture-text")
export class ScriptureText extends LitElement {
  static styles = css`
    .reference {
      font-size: var(--font-size-md);
      font-weight: bold;
      margin: 0;

      &.before {
        text-align: left;
        margin-block-end: var(--spacing-md);
      }

      &.after {
        text-align: right;
        margin-block-start: var(--spacing-md);
      }
    }
  `;

  @property()
  accessor reference: string = "";

  @property()
  accessor referencePosition: ReferencePosition = "before";

  render() {
    return html`<section class="scripture-text">
      ${this.referencePosition === "before"
        ? html`<p class="reference before">${this.reference}</p>`
        : ""}
      <div class="text"><slot></slot></div>
      ${this.referencePosition === "after"
        ? html`<p class="reference after">${this.reference}</p>`
        : ""}
    </section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-scripture-text": ScriptureText;
  }
}

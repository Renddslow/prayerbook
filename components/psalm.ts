import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

@customElement("prayerbook-psalm")
export class Psalm extends LitElement {
  static styles = css`
    h3 {
      font-size: var(--font-size-md);
      margin-block-start: 0;
      margin-block-end: var(--spacing-md);
    }

    p {
      margin-block: 0;
      font-size: var(--font-size-md);
    }

    .pb-indent {
      padding-inline-start: 0.25in;
    }
  `;

  @property()
  accessor reference: number = 1;

  @property()
  accessor label: string = "";

  private _fetchPrayerData = new Task(this, {
    task: async ([reference], { signal }) => {
      const response = await fetch(`/data/psalms/${reference}.html`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    },
    args: () => [this.reference],
  });

  render() {
    return this._fetchPrayerData.render({
      pending: () => html`<p>Loading Psalm ${this.reference}...</p>`,
      complete: (text) => html`
        ${this.label ? html`<h3>${this.label}</h3>` : ""}
        <prayerbook-scripture-text
          referencePosition="before"
          reference="Psalm ${this.reference}"
        >
          ${unsafeHTML(text)}
        </prayerbook-scripture-text>
        <prayerbook-prayer prayer="Word of the Lord"></prayerbook-prayer>
        <prayerbook-prayer prayer="Gloria Patri"></prayerbook-prayer>
      `,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-psalm": Psalm;
  }
}

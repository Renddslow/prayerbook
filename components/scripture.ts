import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

@customElement("prayerbook-scripture")
export class Scripture extends LitElement {
  static styles = css`
    h3 {
      font-size: var(--font-size-md);
      margin-block-start: 0;
      margin-block-end: var(--spacing-md);
    }

    p {
      margin-block: 0;
      margin-block-end: var(--spacing-md);
      font-size: var(--font-size-md);
    }

    .pb-indent {
      padding-inline-start: 0.25in;
    }
  `;

  @property()
  accessor reference: string = "Genesis 1";

  @property()
  accessor label: string = "";

  private _fetchPrayerData = new Task(this, {
    task: async ([reference], { signal }) => {
      const slug = reference
        .replace(/:/, "_")
        .replace(/\s+/g, "-")
        .toLowerCase();
      const response = await fetch(`/data/scripture/${slug}.html`, {
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
      pending: () => html`<p>Loading ${this.reference}...</p>`,
      complete: (text) => html`
        ${this.label ? html`<h3>${this.label}</h3>` : ""}
        <prayerbook-scripture-text
          referencePosition="before"
          reference="${this.reference}"
        >
          ${unsafeHTML(text)}
        </prayerbook-scripture-text>
        <prayerbook-prayer prayer="Word of the Lord"></prayerbook-prayer>
      `,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-scripture": Scripture;
  }
}

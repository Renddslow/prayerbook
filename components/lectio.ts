import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

@customElement("prayerbook-lectio")
export class Lectio extends LitElement {
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

  private _fetchPrayerData = new Task(this, {
    task: async ([reference], { signal }) => {
      const response = await fetch(`/data/lectio/${reference}.html`, {
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
      complete: (text) => {
        const [, , reference] = /(<!-- (.*?) -->)(.*)/m.exec(text) ?? [];
        const body = text.replace(/<!-- .*? -->/, "");
        return html`
          <h3>Lectio Divina</h3>
          <prayerbook-prayer prayer="Lectio Divina"></prayerbook-prayer>
          <prayerbook-instruction
            >Begin by reading the following passage of Scripture carefully and
            prayerfully.</prayerbook-instruction
          >
          <prayerbook-scripture-text
            referencePosition="after"
            reference="${reference}"
          >
            ${unsafeHTML(body)}
          </prayerbook-scripture-text>
          <prayerbook-prayer prayer="Word of the Lord"></prayerbook-prayer>
          <prayerbook-instruction>
            Meditate deeply on the text you have just read. Consider each word
            and its meaning. Press until you long for the truth of these words
            to be made real in your life. Guigo II says that this is a type of
            profound suffering for the monk.
          </prayerbook-instruction>
          <prayerbook-instruction>
            Pray earnestly to God. Ask him to drive away evil and respond to the
            revelations you encountered through meditating on the text.
          </prayerbook-instruction>
          <prayerbook-prayer prayer="Good Gifts"></prayerbook-prayer>
          <prayerbook-instruction>
            Contemplate. Encounter God in silence. Guigo II says that
            "contemplation is when the mind is some sort lifted up to God and
            held above itself, so that it tastes the joys of everlasting
            sweetness." In prayer you are asking God to make his promises
            manifest themselves in your life. In contemplation you taste them.
          </prayerbook-instruction>
        `;
      },
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-lectio": Lectio;
  }
}

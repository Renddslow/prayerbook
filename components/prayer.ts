import { LitElement, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import { Task } from "@lit/task";

type PrayerType = "prayer" | "antiphon" | "collect";

@customElement("prayerbook-prayer")
export class Prayer extends LitElement {
  static styles = css`
    p {
      margin-block: 0;
      font-size: var(--font-size-md);
    }

    .prayer {
      margin-block: var(--spacing-lg);
    }

    .leading-instruction {
      font-style: italic;
      margin-block-end: var(--spacing-md);
      display: block;
    }

    .pb-people {
      font-weight: bold;
      padding-inline-start: 0.25in;
    }

    .pb-indent {
      padding-inline-start: 0.25in;
    }

    .pb-hanging-indent {
      text-indent: -0.25in;
      padding-inline-start: 0.25in;
    }
  `;

  @property()
  accessor prayer: string = "";

  @property()
  accessor type: PrayerType = "prayer";

  @property()
  accessor title: string = "";

  @property()
  accessor repeat: number = 1;

  private _fetchPrayerData = new Task(this, {
    task: async ([prayerName, type], { signal }) => {
      const slug = prayerName
        .replace(/['()]+/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      const response = await fetch(`/data/${type}s/${slug}.html`, {
        signal,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    },
    args: () => [this.prayer, this.type],
  });

  render() {
    return this._fetchPrayerData.render({
      pending: () => html`<p>Loading ${this.prayer}...</p>`,
      complete: (prayer) =>
        html`<prayerbook-block>
          <div class="prayer">
            ${this.title ? html`<h3>${this.title}</h3>` : ""}${Array(
              this.repeat,
            )
              .fill("")
              .map(() => unsafeHTML(prayer))}
          </div>
        </prayerbook-block>`,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-prayer": Prayer;
  }
}

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("prayerbook-opening-sentence")
export class OpeningSentence extends LitElement {
  @property()
  accessor content: string = "";

  @property()
  accessor reference: string = "";

  static styles = css``;

  render() {
    return html`<div class="heading">
      <blockquote>${this.content}</blockquote>
      <cite>${this.reference}</cite>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "prayerbook-opening-sentence": OpeningSentence;
  }
}

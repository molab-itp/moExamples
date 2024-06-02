//
// Lit for basic UI elements
// Button
// text input
// Slider
// checkbox
// radio button row
// selection
// color

import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class TestDrive extends LitElement {
  static properties = {
    _counter: { state: true },
  };
  static styles = css`
    /* .completed { text-decoration-line: line-through; color: #777; } */
  `;

  constructor() {
    super();
    this._counter = 0;
  }

  render() {
    return html`
      <h2>Test Drive Lit ${this._counter}</h2>
      <input id="newitem" value=${'counter=' + this._counter} />
      <button @click=${this.updateAction}>Update</button>
    `;
  }

  updateAction() {
    console.log('updateAction');
    this._counter += 1;
    this.input.value = 'counter=' + this._counter;
  }

  get input() {
    return this.renderRoot?.querySelector('#newitem') ?? null;
  }
}
customElements.define('test-drive', TestDrive);

// https://editor.p5js.org/jht9629-nyu/sketches/AwB8tHJ15
// test drive DOM.js v11 inputs

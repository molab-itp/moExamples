//
// Lit for UI input elements
// reference: https://lit.dev/tutorials/intro-to-lit/#8

// button
// text input
// slider -- input range
// checkbox
// radio button row
// selection
// color

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class LitDemo extends LitElement {
  static properties = {
    _counter: { state: true },
    sliderValue: { type: Number },
    checkBoxValue: { type: Boolean },
    radioValue: {},
    shapeValue: {},
    colorValue: {},
    updateCount: { state: true },
  };

  constructor() {
    super();
    this._counter = 0;
    this.sliderValue = 30;
    this.checkBoxValue = false;
    this.radioValue = 'gold';
    this.shapeValue = 'rect';
    this.colorValue = '#ffff00';
    this.updateCount = 0;
  }

  render() {
    this.updateCount++;
    return html`
      <h2>Lit Demo counter=${this._counter}</h2>
      <input id="id_counterInput" value=${'counter=' + this._counter} />
      <button @click=${this.updateUpClickEvent}>Update Up</button>
      <button @click=${this.updateDownClickEvent}>Update Down</button>
      <br />
      <label>
        <input type="range" min="0" max="100" value=${this.sliderValue} @input=${this.sliderInputEvent} />
        sliderValue ${this.sliderValue}
      </label>
      <br />
      <label>
        <input type="checkbox" @change=${this.checkBoxChangeEvent} ?checked=${this.checkBoxValue} />
        checkBoxValue
      </label>
      <fieldset @change=${this.radioChangeEvent}>
        <legend>Select a radioValue:</legend>
        <label>
          <input type="radio" name="drone" value="red" ?checked=${this.radioValue == 'red'} />
          Red
        </label>
        <label>
          <input type="radio" name="drone" value="green" ?checked=${this.radioValue == 'green'} />
          Green
        </label>
        <label>
          <input type="radio" name="drone" value="gold" ?checked=${this.radioValue == 'gold'} />
          Gold
        </label>
      </fieldset>
      <label>
        Choose a shapeValue:
        <select name="pets" @change=${this.shapeChangeEvent}>
          <option value="">--Please choose an option--</option>
          <option value="rect" ?selected=${this.shapeValue == 'rect'}>Rect</option>
          <option value="circle" ?selected=${this.shapeValue == 'circle'}>Circle</option>
          <option value="triangle" ?selected=${this.shapeValue == 'triangle'}>Triangle</option>
        </select>
      </label>
      <br />
      <label>
        Choose a colorValue
        <input type="color" name="head" value=${this.colorValue} @input=${this.colorInputEvent} />
      </label>
    `;
  }

  colorInputEvent(event) {
    // console.log('colorInputEvent event', event);
    this.colorValue = event.target.value;
  }

  shapeChangeEvent(event) {
    // console.log('shapeChangeEvent event.target.value', event.target.value, typeof event.target.value);
    this.shapeValue = event.target.value;
  }

  radioChangeEvent(event) {
    // console.log('radioChangeEvent event.target.value', event.target.value);
    this.radioValue = event.target.value;
  }

  checkBoxChangeEvent(event) {
    // console.log('checkBoxChangeEvent event.target.checked', event.target.checked);
    this.checkBoxValue = event.target.checked;
  }

  sliderInputEvent(event) {
    // console.log('sliderInputEvent event.target', event.target);
    this.sliderValue = parseFloat(event.target.value);
  }

  updateUpClickEvent(event) {
    // console.log('updateClickEvent event.target', event.target);
    this._counter += 1;
    this.input.value = 'counter=' + this._counter;
  }
  updateDownClickEvent(event) {
    // console.log('updateDownClickEvent event', event);
    this._counter -= 1;
    this.input.value = 'counter=' + this._counter;
  }

  get input() {
    return this.renderRoot?.querySelector('#id_counterInput') ?? null;
  }
}
customElements.define('lit-demo', LitDemo);

// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3

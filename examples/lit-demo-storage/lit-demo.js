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
    _size: { state: true },
    sliderValue: { type: Number },
    checkBoxValue: { type: Boolean },
    radioValue: {},
    shapeValue: {},
    colorValue: {},
    updateCount: { state: true },
    customColorValue: {},
  };

  constructor() {
    super();
    this._size = 0;
    this.sliderValue = 30;
    this.checkBoxValue = false;
    this.radioValue = 'gold';
    this.shapeValue = 'rect';
    this.colorValue = '#ffff00';
    this.updateCount = 0;
    this.customColorValue = '#ffff00';
  }

  render() {
    this.updateCount++;
    return html`
      <h2>Lit Demo Storage -- localStorage used to preserve settings</h2>
      <br />
      <input id="id_sizeInput" value=${'size=' + this._size} />
      <button @click=${this.resetClickEvent}>Reset</button>
      <button @mousedown=${this.biggerMouseDownEvent} @click=${this.biggerClickEvent}>Bigger</button>
      <button @mousedown=${this.smallerMouseDownEvent} @click=${this.smallerClickEvent}>Smaller</button>
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
        <label>
          <input type="radio" name="drone" value="custom" ?checked=${this.radioValue == 'custom'} />
          Custom
          <label>
            <input type="color" name="head" value=${this.customColorValue} @input=${this.customColorInputEvent} />
          </label>
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

  customColorInputEvent(event) {
    // console.log('customColorInputEvent event', event);
    this.customColorValue = event.target.value;
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

  biggerMouseDownEvent(event) {
    // console.log('biggerMouseDownEvent event.target', event.target);
    this.biggerIsActive = true;
  }

  biggerClickEvent(event) {
    // console.log('updateClickEvent event.target', event.target);
    this.biggerIsActive = false;
  }

  smallerMouseDownEvent(event) {
    // console.log('smallerMouseDownEvent event.target', event.target);
    this.smallerIsActive = true;
  }

  smallerClickEvent(event) {
    // console.log('smallerClickEvent event', event);
    this.smallerIsActive = false;
  }

  resetClickEvent(event) {
    // console.log('resetClickEvent event', event);
    this._size = 0;
  }

  get input() {
    return this.renderRoot?.querySelector('#id_sizeInput') ?? null;
  }
}
customElements.define('lit-demo', LitDemo);

// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3

// https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event

// https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event

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
    petSelectionValue: {},
    colorValue: {},
  };

  constructor() {
    super();
    this._counter = 0;
    this.sliderValue = 30;
    this.checkBoxValue = false;
    this.radioValue = 'louie';
    this.petSelectionValue = 'dog';
    this.colorValue = '#ffff00';
  }

  render() {
    return html`
      <h2>Lit Demo counter=${this._counter}</h2>
      <input id="id_counterInput" value=${'counter=' + this._counter} />
      <button @click=${this.updateClickEvent}>Update</button> <br />
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
          <input type="radio" id="huey" name="drone" value="huey" ?checked=${this.radioValue == 'huey'} />
          Huey
        </label>
        <label>
          <input type="radio" id="dewey" name="drone" value="dewey" ?checked=${this.radioValue == 'dewey'} />
          Dewey
        </label>
        <label>
          <input type="radio" id="louie" name="drone" value="louie" ?checked=${this.radioValue == 'louie'} />
          Louie
        </label>
      </fieldset>
      <label>
        Choose a pet for petSelectionValue:
        <select name="pets" @change=${this.petChangeEvent}>
          <option value="">--Please choose an option--</option>
          <option value="dog" ?selected=${this.petSelectionValue == 'dog'}>Dog</option>
          <option value="cat" ?selected=${this.petSelectionValue == 'cat'}>Cat</option>
          <option value="ape" ?selected=${this.petSelectionValue == 'ape'}>Ape</option>
        </select>
      </label>
      <br />
      <label>
        Choose a color for colorValue
        <input type="color" name="head" value=${this.colorValue} @input=${this.colorInputEvent} />
      </label>
    `;
  }

  colorInputEvent(event) {
    // console.log('colorInputEvent event', event);
    console.log('colorInputEvent event.target', event.target);
    console.log('colorInputEvent event.target.value', event.target.value, typeof event.target.value);
    this.colorValue = event.target.value;
  }

  petChangeEvent(event) {
    // console.log('petChangeEvent event', event);
    console.log('petChangeEvent event.target', event.target);
    console.log('petChangeEvent event.target.value', event.target.value, typeof event.target.value);
    this.petSelectionValue = event.target.value;
  }

  radioChangeEvent(event) {
    // console.log('radioChangeEvent event', event);
    // console.log('radioChangeEvent event.target', event.target);
    console.log('radioChangeEvent event.target.value', event.target.value);
    this.radioValue = event.target.value;
  }

  checkBoxChangeEvent(event) {
    console.log('checkBoxChangeEvent event', event);
    console.log('checkBoxChangeEvent event.target', event.target);
    console.log('checkBoxChangeEvent event.target.checked', event.target.checked);
    this.checkBoxValue = event.target.checked;
  }

  sliderInputEvent(event) {
    // console.log('sliderInputEvent event', event);
    // console.log('sliderInputEvent event.target', event.target);
    this.sliderValue = parseFloat(event.target.value);
  }

  updateClickEvent(event) {
    // console.log('updateClickEvent event', event);
    console.log('updateClickEvent event.target', event.target);
    this._counter += 1;
    this.input.value = 'counter=' + this._counter;
  }

  get input() {
    return this.renderRoot?.querySelector('#id_counterInput') ?? null;
  }
}
customElements.define('lit-demo', LitDemo);

// https://editor.p5js.org/jht9629-nyu/sketches/AwB8tHJ15
// test drive DOM.js v11 inputs

/* -- DOM Reference
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color

  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date

*/

// <input
// id="id_input2"
// type="range"
// min="0"
// max="100"
// value=${this.sliderValue}
// @input=${this.sliderInputEvent}
// @change=${this.sliderChangeEvent}
// />
// <label for="id_input2">sliderValue ${this.sliderValue}</label> <br />

// @change=${this.sliderChangeEvent}
// sliderChangeEvent(event) {
//   // console.log('sliderChangeEvent event', event);
//   // console.log('sliderChangeEvent event.target', event.target);
//   console.log('sliderChangeEvent event.target.value', event.target.value, typeof event.target.value);
// }

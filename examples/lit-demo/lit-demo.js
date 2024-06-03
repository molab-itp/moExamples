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

export class LitDemo extends LitElement {
  static properties = {
    _counter: { state: true },
    _value2: {},
    _value3: {},
    _value4: {},
    _value5: {},
  };
  static styles = css`
    /* .completed { text-decoration-line: line-through; color: #777; } */
  `;

  constructor() {
    super();
    this._counter = 0;
    this._value2 = 30;
    this._value3 = true;
    this._value4 = 'louie';
    this._value5 = 'dog';
    this._value6 = '#ffff00';
  }

  render() {
    return html`
      <h2>Lit Demo counter=${this._counter}</h2>
      <input id="id_input1" value=${'counter=' + this._counter} />
      <button @click=${this.update1Action}>Update</button> <br />
      <input
        id="id_input2"
        type="range"
        min="0"
        max="100"
        value=${this._value2}
        @input=${this.input2Action}
        @change=${this.change2Action}
      />
      <label for="id_input2">Value2 ${this._value2}</label> <br />
      <label>
        <input type="checkbox" @change=${this.change3Action} ?checked=${this._value3} />
        Value3
      </label>
      <fieldset @change=${this.change4Action}>
        <legend>Select a Value4:</legend>
        <label>
          <input type="radio" id="huey" name="drone" value="huey" ?checked=${this._value4 == 'huey'} />
          Huey
        </label>
        <label>
          <input type="radio" id="dewey" name="drone" value="dewey" ?checked=${this._value4 == 'dewey'} />
          Dewey
        </label>
        <label>
          <input type="radio" id="louie" name="drone" value="louie" ?checked=${this._value4 == 'louie'} />
          Louie
        </label>
      </fieldset>
      <label>
        Choose a pet for Value5:
        <select name="pets" @change=${this.change5Action}>
          <option value="">--Please choose an option--</option>
          <option value="dog" ?selected=${this._value5 == 'dog'}>Dog</option>
          <option value="cat" ?selected=${this._value5 == 'cat'}>Cat</option>
          <option value="ape" ?selected=${this._value5 == 'ape'}>Ape</option>
        </select>
      </label>
      <br />
      <label>
        Choose a color for Value6
        <input type="color" name="head" value=${this._value6} @change=${this.change6Action} />
      </label>
    `;
  }

  change6Action(event) {
    // console.log('change6Action event', event);
    console.log('change6Action event.target', event.target);
    console.log('change6Action event.target.value', event.target.value, typeof event.target.value);
    this._value6 = event.target.value;
  }

  change5Action(event) {
    // console.log('change5Action event', event);
    console.log('change5Action event.target', event.target);
    console.log('change5Action event.target.value', event.target.value, typeof event.target.value);
    this._value5 = event.target.value;
  }

  change4Action(event) {
    // console.log('change4Action event', event);
    // console.log('change4Action event.target', event.target);
    console.log('change4Action event.target.value', event.target.value);
    this._value4 = event.target.value;
  }

  change3Action(event) {
    console.log('change3Action event', event);
    console.log('change3Action event.target', event.target);
    console.log('change3Action event.target.checked', event.target.checked);
    this._value3 = event.target.checked;
  }

  input2Action(event) {
    // console.log('input2Action event', event);
    // console.log('input2Action event.target', event.target);
    this._value2 = parseFloat(event.target.value);
  }
  change2Action(event) {
    // console.log('change2Action event', event);
    // console.log('change2Action event.target', event.target);
    console.log('change2Action event.target.value', event.target.value, typeof event.target.value);
  }

  update1Action(event) {
    // console.log('update1Action event', event);
    console.log('update1Action event.target', event.target);
    this._counter += 1;
    this.input.value = 'counter=' + this._counter;
  }

  get input() {
    return this.renderRoot?.querySelector('#id_input1') ?? null;
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

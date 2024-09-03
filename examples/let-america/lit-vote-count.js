//

import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class LitVoteCount extends LitElement {
  static properties = {
    vote_count: { type: Number },
    citizen_id: {},
  };

  constructor() {
    super();
    this.vote_count = 0;
  }

  render() {
    return html`
      <button @click=${this.rewindClickEvent}>Rewind</button> <br />
      Welcome citizen id ${this.citizen_id}<br />
      Your vote count ${this.vote_count}<br />
      <button @click=${this.voteUpClickEvent}>Vote Up</button>
      <button @click=${this.voteDownClickEvent}>Vote Down</button> <br />
      <button @click=${this.resetClickEvent}>Reset</button> <br />
    `;
  }

  resetClickEvent() {
    this.resetAction();
  }

  rewindClickEvent(event) {
    // console.log('rewindEvent event', event);
    // console.log('rewindEvent rewindAction', this.rewindAction);
    // console.log('rewindEvent event.target', event.target);
    this.rewindAction();
  }

  voteUpClickEvent(event) {
    this.voteUpAction();
  }

  voteDownClickEvent(event) {
    this.voteDownAction();
  }
}
customElements.define('lit-vote-count', LitVoteCount);

// https://lit.dev/tutorials/intro-to-lit/#8
// https://editor.p5js.org/jht9629-nyu/sketches/HureJsyBs
// lit demo v3

/* --

vote_count will be update by buttons
citizen_num set once

*/

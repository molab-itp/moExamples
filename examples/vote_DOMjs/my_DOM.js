//
function test_DOMjs() {
  DOM.set({
    input: {
      id: 'myInput',
      placeholder: 'Type value here',
      onchange: (event) => alert(myInput.value),
      click: (event) => alert('It recognized event types to add listeners; as well as event methods.'),
    },
    button: {
      id: 'goBtn',
      innerText: 'Go',
      addEventListener: {
        type: 'click',
        // listerner: (event) => (myInput.value = 'Button pressed'),
        listerner: goBtnEvent,
      },
    },
    button: {
      id: 'id_goBtn',
      text: 'Go',
      // onclick: (event) => myBinder.value = "Go was clicked.",
      onclick: goBtnEvent,
    },
  });

  myInput.style.border = 'none';
  // goBtn.click();
}

// !!@ fails -- not triggered
function goBtnEvent(event) {
  console.log('goBtnEvent event', event);
  console.log('goBtnEvent myInput.value', myInput.value);
}

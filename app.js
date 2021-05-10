(() => {
  function Note(text, date, time) {
    this.text = text;
    this.date = date;
    this.time = time;
  }

  Note.prototype.renderNoteToDOM = function (el, classes, parentEl, data = "") {
    let el_DOM = document.createElement(el);
    el_DOM.innerText = data;
    el_DOM.classList.add(...classes);
    parentEl.append(el_DOM);
    return el_DOM;
  };

  function handleSubmitForm() {
    const submitBtn = document.querySelector(".btn-submit");
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      getFormData();
      clearForm();
    });
  }

  function getFormData() {
    const text = document.querySelector("#note-textarea").value;
    const date = document.querySelector("#note-date").value;
    const time = document.querySelector("#note-time").value;
    createNote(text, date, time);
  }

  function clearForm() {
    const allInputs = document.querySelectorAll(".form-control");
    allInputs.forEach((input) => {
      input.value = null;
      input.classList.remove("valid");
    });
    document.querySelector('.btn-submit').disabled = true;
  }

  function createNote(text, date, time) {
    const notesContainer = document.querySelector(".notes-container");

    const note = new Note(text, date, time);
    const note_div = note.renderNoteToDOM(
      "div",
      ["col-md-12", "note", "p-4"],
      notesContainer
    );
    note.renderNoteToDOM("p", ["mt-3"], note_div, text);
    note.renderNoteToDOM("p", [], note_div, date);
    note.renderNoteToDOM("p", [], note_div, time);
  }

  function addEventListenersToInputs() {
    const allInputs = document.querySelectorAll(".form-control");
    const submitButton = document.querySelector(".btn-submit");
    allInputs.forEach((input) =>
      input.addEventListener("input", () => {
        input.checkValidity()
          ? input.classList.add("valid")
          : input.classList.remove("valid");

        toggleSubmitButton(allInputs.length);
      })
    );
  }

  function toggleSubmitButton(totalInputs) {
    const validInputs = document.querySelectorAll(".form-control.valid").length;
    let submitButton = document.querySelector(".btn-submit");
    totalInputs === validInputs
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true);
  }
  addEventListenersToInputs();
  handleSubmitForm();
})();

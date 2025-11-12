const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const searchBox = document.getElementById("searchBox");
const themeToggle = document.querySelector(".theme-toggle");
const modal = document.querySelector(".modal");
const saveBtn = document.getElementById("saveNote");
const cancelBtn = document.getElementById("cancelNote");
const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function showNotes() {
  const notes = getNotes();
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");
    noteEl.innerHTML = `
      <h3 contenteditable="true">${note.title}</h3>
      <p contenteditable="true">${note.text}</p>
      <small>${note.date}</small>
      <img src="delete.png" data-index="${index}" alt="Delete">
    `;
    notesContainer.appendChild(noteEl);
  });
}

createBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  noteTitle.value = "";
  noteText.value = "";
  noteTitle.focus();
});

saveBtn.addEventListener("click", () => {
  const notes = getNotes();
  if (!noteText.value.trim()) {
    alert("Please write something before saving!");
    return;
  }
  const newNote = {
    title: noteTitle.value || "Untitled",
    text: noteText.value,
    date: new Date().toLocaleString()
  };
  notes.push(newNote);
  saveNotes(notes);
  showNotes();
  modal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

notesContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const index = e.target.dataset.index;
    const notes = getNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    showNotes();
  }
});

searchBox.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".note").forEach(note => {
    const text = note.innerText.toLowerCase();
    note.style.display = text.includes(term) ? "block" : "none";
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

showNotes();

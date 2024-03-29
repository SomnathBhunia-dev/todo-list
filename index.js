const addNoteButton = document.getElementById('add-note-btn');
const newNoteInput = document.getElementById('new-input-note');
const notesList = document.getElementById('notes-list');

let notes = []; 

// Function to load notes from local storage on page load
const storedNotes = localStorage.getItem('notes');
if (storedNotes) {
  notes = JSON.parse(storedNotes);
  renderNotes(); 
}

function renderNotes() {
  notesList.innerHTML = ''; 
  notes.forEach(note => {
    const noteItem = document.createElement('li');
    noteItem.classList.add('note');
    noteItem.innerHTML = 
    ` <p class="note-content">${note.content}</p>
      <button class="del-btn" data-id="${note.id}">X</button> `;
    notesList.appendChild(noteItem);
  });
}

function createNote(content) {
  const newNote = {
    id: Date.now(), // Generate unique ID for each note
    content,
  };
  notes.push(newNote); // Add new note to array
  renderNotes();
  saveNotes(); // Save updated notes to local storage
  newNoteInput.value = ''; // Clear the input field after adding a note
}

function deleteNote(id) {
  const noteIndex = notes.findIndex(note => note.id === id);
  
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1); // Remove note from array
    renderNotes();
    saveNotes();
  }
}
addNoteButton.addEventListener('click', function() {
  const content = newNoteInput.value.trim(); // Get the note content from the input field
  if (content) {
    createNote(content); // Create note with
  }
});

notesList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('del-btn')) {
        const noteId = target.dataset.id;
        deleteNote(parseInt(noteId));
    }
});


function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

renderNotes();

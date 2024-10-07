import React, { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = () => {
    if (!newNote) return;
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: newNote }),
    })
      .then((response) => response.json())
      .then((note) => {
        setNotes([...notes, note]);
        setNewNote("");
      });
  };

  const deleteNote = (id) => {
    fetch(`/api/notes/${id}`, {
      method: "DELETE",
    }).then(() => {
      setNotes(notes.filter((note) => note._id !== id));
    });
  };

  return (
    <div>
      <h1>Notatki z lekcji</h1>
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Dodaj nową notatkę"
        />
        <button onClick={addNote}>Dodaj notatkę</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            {note.content}{" "}
            <button onClick={() => deleteNote(note._id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;

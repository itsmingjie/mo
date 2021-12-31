import { useState, useEffect } from "react";
import Card from "./Card";
import { RingSpinner } from "react-spinners-kit";

import styles from "./NotesList.module.scss";

const NotesList = ({ notes, setNotes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async (page) => {
    const limit = 10;
    page = page || 0;

    const notesRes = await fetch(`/api/list?page=${page}&size=${limit}`);
    const notes = await notesRes.json();

    setNotes(notes.data);
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <div className={styles.spinner}>
          <RingSpinner size={25} color="#77BFA3" />
        </div>
      )}
      <div className={styles.list}>
        {notes.map((note) => (
          <Card key={note.id} content={note.content} time={note.time_created} />
        ))}
      </div>
    </>
  );
};

module.exports = NotesList;

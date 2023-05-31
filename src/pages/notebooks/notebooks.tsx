import React, { useEffect, useState } from "react";
import CreateNote from "@/components/createNotes";
import AddItems from "@/components/addItems";
import { notebookTable} from "@/database.config";

interface NoteProps {
  [key: string]: any;
}

const getId = () => {
  const storedItemId = localStorage.getItem("notebook");
  if (storedItemId) {
    const itemId = JSON.parse(storedItemId);
    return itemId;
  }
};

const Notebooks = () => {
  const [notebook, setNotebook] = useState<NoteProps>();
  const [noteBookId, setNotebookId] = useState(null);

  useEffect(() => {
    setNotebookId(getId());
    if (!noteBookId) {
      return;
    }
    try {
      const getNotebook = async () => {
        const notebook = await notebookTable.get(noteBookId);
        setNotebook(notebook);
      };
      getNotebook();
    } catch (err) {
      console.log(err);
    }
  }, [noteBookId,notebook]);

  return (
    <div>
      {notebook && notebook.name ? (
        <AddItems notebook={notebook} setNotebook={setNotebook} />
      ) : (
        <CreateNote setNotebook={setNotebook} />
      )}
    </div>
  );
};

export default Notebooks;

import React, { useEffect, useState } from "react";
import CreateNote from "@/components/createNotes";
import AddItems from "@/components/addItems";

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
    
    setNotebookId(getId())
    const request = indexedDB.open("notebookDB", 1);

    if (!noteBookId) {
      return;
    }
  
    request.onerror = (event: any) => {
      console.log("IndexedDB error:", event.target.error);
    };
  
    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
  
      // Create the "notebooks" object store if it doesn't exist
      if (!db.objectStoreNames.contains("notebooks")) {
        const objectStore = db.createObjectStore("notebooks", {
          keyPath: "id",
        });
        objectStore.createIndex("id", "id", { unique: true });
      }
    };
  
    request.onsuccess = (event: any) => {
      const db = event.target.result;
  
      const transaction = db
        .transaction("notebooks", "readwrite")
        .objectStore("notebooks");
      console.log("Notebook retrieved from IndexedDB", transaction);
  
      const getRequest = transaction.get(noteBookId);
      getRequest.onsuccess = (event: any) => {
        const storedNotebook = event.target.result;
        if (storedNotebook) {
          setNotebook(storedNotebook);
        }
      };
  
      getRequest.onerror = (event: any) => {
        console.log("IndexedDB get error:", event.target.error);
      };
    };
  }, [noteBookId]);
  

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

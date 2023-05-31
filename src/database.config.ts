import Dexie from "dexie";

const database = new Dexie("nootebookDB");
database.version(1).stores({
  notebooks: '++id, name',
});

export const notebookTable = database.table('notebooks');

export default database;
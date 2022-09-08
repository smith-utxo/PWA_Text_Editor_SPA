import { openDB } from 'idb';

//This async function opens a connection with the indexedDB API, configures it, and initializes an indexedDB database named 'jate' in this case. 
const initdb = async () =>
  openDB('jate', 1, { // this is the name and version of our database 
    upgrade(db) { // this adds our schema and the objectstorenames method checks if it already contains an objet store called 'jate'. 
      if (db.objectStoreNames.contains('jate')) { //Object stores = data rows, similar to collections in mongodb or tables in mysql 
        console.log('jate database already exists');
        return;
      } // the next line is telling the browser to pass 'id' to the keypath object and increment by 1 each time. 
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Add data to the database')

  // Explanations provided in getDB route below 
  const jateDB = await openDB('jate_db', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the databse');

  // create a connection to the Indexed DB database and the version we want to use
  const jateDB = await openDB('jate_db', 1);

  // Create a new transaction and specify the store and data privileges. 
  const tx = jateDB.transaction('jate', 'readonly');

  // Open the desired object store
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database
  const request = store.getAll();

  //Get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
}

initdb();

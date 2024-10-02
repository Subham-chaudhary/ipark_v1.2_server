import { openDB } from 'idb';

// Initialize or open the IndexedDB database
export const initDB = async () => {
    return openDB('mqtt-messages', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('messages')) {
                db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

// Save a message to IndexedDB
export const saveMessageToDB = async (message) => {
    const db = await initDB();
    const tx = db.transaction('messages', 'readwrite');
    const store = tx.objectStore('messages');
    await store.add(message);
    await tx.done;
};

// Retrieve all messages from IndexedDB
export const getMessagesFromDB = async () => {
    const db = await initDB();
    const tx = db.transaction('messages', 'readonly');
    const store = tx.objectStore('messages');
    return await store.getAll();
};

import * as SQLite from "expo-sqlite";

export async function init() {
  try {
    const database = await SQLite.openDatabaseAsync("places.db");
    const promise = await database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`);
    return promise;
  } catch (error) {
    console.log("sqlite error ", error);
  }
}

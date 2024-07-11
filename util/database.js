import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

export async function init() {
  try {
    const database = await SQLite.openDatabaseAsync("places.db");
    const result = await database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`);
    return result;
  } catch (error) {
    console.log("sqlite error ", error);
  }
}

export async function insertPlace(place) {
  const database = await SQLite.openDatabaseAsync("places.db");
  console.log("place data ", place);
  try {
    const result = await database.runAsync(
      `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)`,
      [
        place.title,
        place.imageUri,
        place.address,
        place.location.lat,
        place.location.lng,
      ]
    );
    console.log("result here ", result);
    return result;
  } catch (error) {
    console.log("error inserting place", error);
  }
}

export async function fetchPlaces() {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    const results = await database.getAllAsync(`SELECT * FROM places`, []);

    console.log("fetched results", results);
    const placesArray = [];
    for (const index in results) {
      console.log(index);
      placesArray.push(
        new Place(
          results[index].title,
          results[index].imageUri,
          {
            address: results[index].address,
            lat: results[index].lat,
            lng: results[index].lng,
          },
          results[index].id
        )
      );
    }
    console.log("places array in fetch ", placesArray);
    return placesArray;
  } catch (error) {
    console.log("fetch place error ", error);
  }
}

export async function fetchPlaceDetails(id) {
  const database = await SQLite.openDatabaseAsync("places.db");
  try {
    const results = await database.getAllAsync(
      `SELECT * FROM places WHERE id = ?`,
      [id]
    );
    const dbPlace = results[0];
    const place = new Place(
      dbPlace.title,
      dbPlace.imageUri,
      {
        address: dbPlace.address,
        lat: dbPlace.lat,
        lng: dbPlace.lng,
      },
      dbPlace.id
    );
    console.log("FETCH place DETAIL ", place);
    return place;
  } catch (error) {
    console.log("fetch placeDetails error ", error);
  }
}

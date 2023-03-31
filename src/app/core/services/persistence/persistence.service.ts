import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  constructor() {}

  saveDataToLocalStorage(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(
        'PersistenceService: Error while saving to local storage',
        error
      );
    }
  }

  getDataFromLocalStorage(key: string) {
    try {
      localStorage.getItem(key);
    } catch (error) {
      console.error(
        'PersistenceService: Error while getting data from local storage',
        error
      );
    }
  }

  removeDataFromLocalStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        'PersistenceService: Error while removing data from local storage',
        error
      );
    }
  }
}

// DogResults.js
import { makeObservable, observable, action } from 'mobx';

class DogResults {
  resultArray = [];

  breeds = [];

  total = 0;

  constructor() {
    makeObservable(this, {
      resultArray: observable,
      breeds: observable,
      total: observable,
      addItem: action,
      addBreeds: action,
      setBreeds: action,
      removeItem: action,
      clearArray: action,
      clearBreedsArray: action,
      setResultArray: action,
      getResultArray: action,
      setIsTrueFavorite: action,
      setAllFavoritesToFalse: action,
      setTotal: action,
      getSize: action,
    });
  }

  addItem(item) {
    const existingItem = this.resultArray.find(existing => existing.id === item.id);
    if (!existingItem) {
        this.resultArray.unshift(item);
    }
  }

  addBreeds(item) {
    const existingItem = this.breeds.find(existing => existing === item);
    if (!existingItem) {
        this.breeds.unshift(item);
    }
  }
  setBreeds(array) {
    this.breeds = array;
  }

  setResultArray(resultArray) {
    this.resultArray = resultArray;
  }

  setIsTrueFavorite(item) {
    const existingItem = this.resultArray.find(existing => existing.id === item.id);
    if (existingItem) {
      existingItem.isFavorite = true;
    }
   
  }

  setAllFavoritesToFalse() {
    this.resultArray.forEach (obj => {
      obj.isFavorite = false;
    });
    console.log(this.resultArray);
  }

  setTotal(number) {
    this.total = number;
  }

  getResultArray() {
    return this.resultArray;
  }

  removeItem(list) {
    console.log(list);
    const indexToRemove = this.resultArray.findIndex(item => item.id === list.id);
    if (indexToRemove !== -1) {
        // Remove the item if found
        this.resultArray.splice(indexToRemove, 1);
    }
  }

  getSize() {
    return this.resultArray.length;
  }

  getItem(item) {
    return this.resultArray.find(existing => existing.id === item.id);
  }

  clearArray() {
    this.resultArray = [];
  }

  clearBreedsArray() {
    this.breeds = [];
  }

}

const dogResults = new DogResults();
export default dogResults;

// FavoriteDogList.js
import { makeObservable, observable, action } from 'mobx';

class FavoriteDogList {
  sharedArray = [];

  matchedDog = [];

  constructor() {
    makeObservable(this, {
      sharedArray: observable,
      matchedDog: observable,
      addItem: action,
      removeItem: action,
      getItem: action,
      clearArray: action,
      getSize: action,
      setMatchedDog: action,
    });
  }

  addItem(item) {
    const existingItem = this.sharedArray.find(existing => existing.id === item.id);
    if (!existingItem) {
        this.sharedArray.unshift(item);
    }
  }

  removeItem(index) {
    this.sharedArray.splice(index, 1);
  }

  getItem(item) {
    const existingItem = this.sharedArray.find(existing => existing.id === item.id);

    if (existingItem) {
        return 1;
    }
    return 0;
  }

  getSize() {
    return this.sharedArray.length;
  }

  clearArray() {
    this.sharedArray = [];
  }

  setMatchedDog(matchedDog) {
    this.matchedDog = matchedDog;
  }

}

const favoriteDogList = new FavoriteDogList();
export default favoriteDogList;

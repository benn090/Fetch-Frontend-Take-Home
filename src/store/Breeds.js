// Breeds.js
import { makeObservable, observable} from 'mobx';

class Breeds {
  breedsArray = [];

  constructor() {
    makeObservable(this, {
      breedsArray: observable,
      
    });
  }



}

const breeds = new Breeds();
export default breeds;

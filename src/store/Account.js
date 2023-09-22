// Account.js
import { makeObservable, observable, action } from 'mobx';

class Account {
  displayName = "";
  
  email = "";

  constructor() {
    makeObservable(this, {
      displayName: observable,
      email: observable,
      setDisplayName: action,
      setEmail: action,
      getDisplayName: action,
      getEmail: action,
    });
  }

  setDisplayName(name) {
    this.displayName = name;
  }
  getDisplayName() {
    return this.displayName
  }

  setEmail(email) {
    this.email = email
  }

  getEmail() {
    return this.displayName
  }

}

const account = new Account();
export default account;

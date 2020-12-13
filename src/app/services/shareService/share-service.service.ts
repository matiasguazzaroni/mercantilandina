import { Injectable } from '@angular/core';
import { FormHandlerData } from 'src/app/models/formHandler/formHandlerData';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  setData(data: FormHandlerData) {
    window.sessionStorage.setItem(data.key, JSON.stringify(data.data));
    var keys = window.sessionStorage.getItem("keyformsstorage");
    var keysArr = [];
    if(keys)
      keysArr = keys.split(" ");
    keysArr.push(data.key)
    window.sessionStorage.setItem("keyformsstorage",keysArr.join(" "));
  }

  getData() {
    try {
      const keys = window.sessionStorage.getItem("keyformsstorage").split(" ");
      let data = {};
      for (let i = 0; i < keys.length; i++) {
        data[keys[i]] = JSON.parse(window.sessionStorage.getItem(keys[i]));
      }
      return data;
    } catch(e) {
      return null;
    }
  }

  getKeyData(key: string): any {
    try {
      return JSON.parse(window.sessionStorage.getItem(key));
    } catch(e) {
      return null;
    }
  }

  setCurrentStep(index: string) {
    window.sessionStorage.setItem("step", index);
  }

  clearData() {
    window.sessionStorage.clear();
  }
}

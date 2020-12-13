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
    const keys = window.sessionStorage.getItem("keyformsstorage").split(" ");
    let data = {};
    for (let i = 0; i < keys.length; i++) {
      data[keys[i]] = JSON.parse(window.sessionStorage.getItem(keys[i]));
    }
    return data;
  }

  clearData() {
    window.sessionStorage.clear();
  }
}

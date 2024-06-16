import axios from "axios";

export class ContactServer {
  static baseUrl = `http://localhost:3000`;

  static getAllDetails() {
    let dataURL = `${this.baseUrl}/contacts`;
    return axios.get(dataURL);
  }

  static getOne(contactId) {
    let dataURL = `${this.baseUrl}/contacts/${contactId}`;
    return axios.get(dataURL);
  }

  static createContact(contact){
    let dataURL = `${this.baseUrl}/contacts`;
    return axios.post(dataURL, contact);
  }

  static editContact(contactId, contact) {
    let dataURL = `${this.baseUrl}/contacts/${contactId}`;
    return axios.put(dataURL, contact);
  }
  
}



import { contactsService } from "../services/ContactsService.js";
import { STORE } from "../store.js";

function drawContacts() {
  let template = "";
  STORE.state.contacts.forEach(contact => {
    if (contact.projectId != STORE.state.activeProject.id) {
      return;
    }
    template += contact.ListTemplate;
  });

  document.getElementById("contactList").innerHTML = template;
}

export class ContactsController {
  constructor() {
    drawContacts();
  }
  createContact() {
    try {
      event.preventDefault();
      let form = event.target;
      let contact = {
        // @ts-ignore
        name: form.name.value
      };
      contactsService.createContact(contact);
      drawContacts();
      // @ts-ignore
      form.reset();
    } catch (e) {
      alert(e);
    }
  }
}

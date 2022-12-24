const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("../goit-nodejs-hw-01/db", "contacts.json");

async function listContacts() {
  const contactsListRaw = await fs.readFile(contactsPath);
  const contactList = JSON.parse(contactsListRaw);
  return contactList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const currentContact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  return currentContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
}

async function addContact(name, email, phone) {
  const id = nanoid();

  const contact = { id, name, email, phone };

  const contacts = await listContacts();
  contacts.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

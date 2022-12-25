const { nanoid } = require("nanoid");

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("../goit-nodejs-hw-01/db", "contacts.json");

async function listContacts() {
  try {
    const contactsListRaw = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contactsListRaw);
    return contactList;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const currentContact = contacts.find(
      (contact) => contact.id === contactId.toString()
    );
    return currentContact;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId.toString()
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const id = nanoid();

  const contact = { id, name, email, phone };
  try {
    const contacts = await listContacts();
    contacts.push(contact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

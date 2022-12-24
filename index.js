const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

async function getContactList() {
  const contactsList = await listContacts();
  return contactsList;
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.table(contactsList);
      break;
    case "get":
      const currentContact = await getContactById(id);
      console.log(currentContact);
      break;
    case "remove":
      await removeContact(id);
      const contactsListAfterRemove = await listContacts();
      console.table(contactsListAfterRemove);
      break;
    case "add":
      await addContact(name, email, phone);
      const contactsListAfterAdd = await listContacts();
      console.table(contactsListAfterAdd);
      break;
    default:
      throw new Error(`Unknown action, got: ${action}`);
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

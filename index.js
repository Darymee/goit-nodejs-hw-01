const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { program } = require("commander");

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
      const contactsListAfterRemoving = await listContacts();
      console.table(contactsListAfterRemoving);
      break;
    case "add":
      await addContact(name, email, phone);
      const contactsListAfterAdding = await listContacts();
      console.table(contactsListAfterAdding);
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

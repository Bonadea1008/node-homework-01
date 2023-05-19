const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  console.table(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const result = allContacts.find((el) => el.id === contactId);
  return console.table(result) || null;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const index = allContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(result);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return console.table(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

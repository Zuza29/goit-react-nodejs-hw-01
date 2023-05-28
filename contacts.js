const fs = require("fs").promises;

const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return console.table(JSON.parse(data));
  } catch (err) {
    return console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData.map((data) => {
      if (Number(data.id) === Number(contactId)) {
        return console.table(data);
      }
    });
  } catch (err) {
    return console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const filterContacts = JSON.parse(data).filter(
      (data) => Number(data.id) !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
    return listContacts();
  } catch (err) {
    return console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const dataParse = JSON.parse(data);
    const contactIndex = Number(dataParse[dataParse.length - 1].id) + 1;
    const addData = [
      ...dataParse,
      {
        id: `${contactIndex}`,
        name,
        email,
        phone,
      },
    ];
    await fs.writeFile(contactsPath, JSON.stringify(addData));
    console.table(addData);
  } catch (err) {
    return console.log(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };

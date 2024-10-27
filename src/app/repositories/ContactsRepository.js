const { v4: uuidv4 } = require('uuid');

let contacts = [
  {
    id: uuidv4(),
    name: 'João',
    email: 'j@j.com',
    phone: '123456789',
    category_id: uuidv4(),
  },
  {
    id: '1',
    name: 'Maria',
    email: 'm@m.com',
    phone: '123456789',
    category_id: uuidv4(),
  }
]



class ContactsRepository {

  create({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      console.log({ name, email, phone, category_id })
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
        category_id
      }
      resolve(newContact)
      contacts.push(newContact)
    }
    );
  }

  update(id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      console.log({ name, email, phone, category_id })
      const updatedContact = {
        id: id,
        name,
        email,
        phone,
        category_id
      }

      contacts = contacts.map(contact => contact.id === id ? updatedContact : contact)

      resolve(updatedContact)
    }
    );
  }

  findAll() {
    return new Promise((resolve) => {
      resolve(contacts)
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(contacts.find(contact => contact.id === id))
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      resolve(contacts.find(contact => contact.email === email))
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter(contacts => contacts.id !== id)
      resolve()
    });
  }




}

module.exports = new ContactsRepository();

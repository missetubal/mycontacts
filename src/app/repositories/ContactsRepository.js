const { v4: uuidv4 } = require('uuid');
const db = require('../../database');

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

    const [row] = db.query(`INSERT INTO contacts(name, email, phone, category_id) VALUES($1, $2, $3, $4) RETURNING *`, [name, email, phone, category_id])
    return row
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

  async findAll() {
    const rows = await db.query('SELECT * FROM contacts');
    return rows
  }

  async findById(id) {
    const row = await db.query(`SELECT * FROM contacts WHERE id = $1`, [id]);
    return row
  }

  async findByEmail(email) {
    const row = await db.query(`SELECT * FROM contacts WHERE email = $1`, [email]);
    return row
  }

  async delete(id) {
    const deleteOp = await db.query(`DELETE FROM contacts WHERE id = $1`, [id]);
    return deleteOp
  }




}

module.exports = new ContactsRepository();

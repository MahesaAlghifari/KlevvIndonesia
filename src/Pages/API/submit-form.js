// pages/api/submit-form.js
import { Client } from 'pg'

const client = new Client({
  connectionString: process.env.DATABASE_URL,
})

client.connect()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address } = req.body

    try {
      await client.query(
        'INSERT INTO your_table_name(name, gender, placeOfBirth, city, idCardNumber, headline, phone, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
        [name, gender, placeOfBirth, city, idCardNumber, headline, phone, address]
      )
      res.status(200).json({ message: 'Data saved successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to save data' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}

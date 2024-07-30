// pages/api/submit-form.js
import { Pool } from 'pg';

// Buat koneksi ke database PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Pastikan ini sesuai dengan variabel lingkungan di Vercel
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = req.body;

    try {
      const client = await pool.connect();
      await client.query(
        'INSERT INTO your_table_name (name, gender, place_of_birth, city, id_card_number, headline, phone, address, invoice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice]
      );
      client.release();
      res.status(200).json({ message: 'Form data saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save form data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

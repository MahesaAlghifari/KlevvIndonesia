import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = req.body;

    try {
      await sql`
        INSERT INTO FormData (name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice)
        VALUES (${name}, ${gender}, ${placeOfBirth}, ${city}, ${idCardNumber}, ${headline}, ${phone}, ${address}, ${invoice})
      `;
      return res.status(200).json({ message: 'Data successfully saved' });
    } catch (error) {
      console.error('Database insert error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

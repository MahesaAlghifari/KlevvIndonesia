// // pages/api/submit-form.js
// import { Pool } from 'pg';

// // Buat koneksi ke database PostgreSQL
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL, // Pastikan ini sesuai dengan variabel lingkungan di Vercel
// });

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice } = req.body;

//     try {
//       const client = await pool.connect();
//       await client.query(
//         'INSERT INTO users (name, gender, place_of_birth, city, id_card_number, headline, phone, address, invoice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
//         [name, gender, placeOfBirth, city, idCardNumber, headline, phone, address, invoice]
//       );
//       client.release();
//       res.status(200).json({ message: 'Form data saved successfully!' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to save form data' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// import { sql } from '@vercel/postgres';

// export default async function handler(request, response) {
//   if (request.method === 'POST') {
//     try {
//       const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address } = request.body;
//       const invoice = request.file; // Jika file diupload, ini mungkin berbeda

//       // Pastikan tabel sudah ada sebelum melakukan INSERT
//       await sql`
//         CREATE TABLE IF NOT EXISTS user (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(255),
//           gender VARCHAR(50),
//           place_of_birth VARCHAR(255),
//           city VARCHAR(255),
//           id_card_number VARCHAR(255),
//           headline VARCHAR(255),
//           phone VARCHAR(20),
//           address TEXT,
//           invoice BYTEA
//         )
//       `;

//       // Insert data ke tabel
//       await sql`
//         INSERT INTO user (name, gender, place_of_birth, city, id_card_number, headline, phone, address, invoice)
//         VALUES (${name}, ${gender}, ${placeOfBirth}, ${city}, ${idCardNumber}, ${headline}, ${phone}, ${address}, ${invoice})
//       `;

//       return response.status(200).json({ message: 'Data inserted successfully' });
//     } catch (error) {
//       console.error('Error:', error);
//       return response.status(500).json({ error: error.message });
//     }
//   } else {
//     return response.status(405).json({ message: 'Method Not Allowed' });
//   }
// }


import { sql } from '@vercel/postgres';
import multer from 'multer';
import nextConnect from 'next-connect';
import path from 'path';
import fs from 'fs';

const upload = multer({
  dest: path.join(process.cwd(), '/public/uploads'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const handler = nextConnect({
  onError(error, req, res) {
    res.status(500).end(`Sorry something went wrong! ${error.message}`);
  },
});

handler.use(upload.single('invoice'));

handler.post(async (req, res) => {
  try {
    const { name, gender, placeOfBirth, city, idCardNumber, headline, phone, address } = req.body;
    const invoicePath = req.file?.path;

    // Create table if not exists
    await sql`
      CREATE TABLE IF NOT EXISTS user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        gender VARCHAR(50),
        place_of_birth VARCHAR(255),
        city VARCHAR(255),
        id_card_number VARCHAR(255),
        headline VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        invoice TEXT
      )
    `;

    // Insert data
    await sql`
      INSERT INTO user (name, gender, place_of_birth, city, id_card_number, headline, phone, address, invoice)
      VALUES (${name}, ${gender}, ${placeOfBirth}, ${city}, ${idCardNumber}, ${headline}, ${phone}, ${address}, ${invoicePath})
    `;

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

export default handler;

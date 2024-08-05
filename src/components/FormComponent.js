import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://klevv-server.vercel.app/api/v1/form'; // Ganti dengan URL backend Anda

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const FormComponent = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [idCardNumber, setIdCardNumber] = useState('');
  const [headline, setHeadline] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'place_of_birth':
        setPlaceOfBirth(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'id_card_number':
        setIdCardNumber(value);
        break;
      case 'headline':
        setHeadline(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', name);
    form.append('gender', gender);
    form.append('place_of_birth', placeOfBirth);
    form.append('city', city);
    form.append('id_card_number', idCardNumber);
    form.append('headline', headline);
    form.append('phone', phone);
    form.append('address', address);
    if (file) form.append('invoice', file);

    try {
      await api.post('/', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Form submitted successfully!');
      setError('');
    } catch (err) {
      setError('Failed to submit form.');
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Submit Your Details</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Place of Birth</label>
          <input
            type="text"
            name="place_of_birth"
            value={placeOfBirth}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">ID Card Number</label>
          <input
            type="text"
            name="id_card_number"
            value={idCardNumber}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Headline</label>
          <input
            type="text"
            name="headline"
            value={headline}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Invoice (File Upload)</label>
          <input
            type="file"
            name="invoice"
            onChange={handleFileChange}
            className="mt-1 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;

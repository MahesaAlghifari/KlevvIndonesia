'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    placeOfBirth: '',
    city: '',
    idCardNumber: '',
    headline: '',
    phone: '',
    address: '',
    invoice: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      invoice: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi Formulir
    if (!formData.name || !formData.gender || !formData.placeOfBirth || !formData.city || !formData.idCardNumber || !formData.headline || !formData.phone || !formData.address) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.invoice) {
      setError('Please upload an invoice.');
      return;
    }

    // Reset Error and Success Messages
    setError('');
    setSuccess('');

    const formDataWithFile = new FormData();
    Object.keys(formData).forEach(key => {
      formDataWithFile.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataWithFile,
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message);
        setFormData({
          name: '',
          gender: '',
          placeOfBirth: '',
          city: '',
          idCardNumber: '',
          headline: '',
          phone: '',
          address: '',
          invoice: null,
        });
      } else {
        setError('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form');
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Input your Data</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Form fields */}
          <div className="sm:col-span-2">
            <label htmlFor="name" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="gender" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Gender
            </label>
            <div className="mt-2.5">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="placeOfBirth" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Place of Birth
            </label>
            <div className="mt-2.5">
              <input
                id="placeOfBirth"
                name="placeOfBirth"
                type="text"
                value={formData.placeOfBirth}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="city" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2.5">
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="idCardNumber" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              ID Card Number
            </label>
            <div className="mt-2.5">
              <input
                id="idCardNumber"
                name="idCardNumber"
                type="text"
                value={formData.idCardNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="headline" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Headline
            </label>
            <div className="mt-2.5">
              <input
                id="headline"
                name="headline"
                type="text"
                value={formData.headline}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Phone
            </label>
            <div className="mt-2.5">
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Address
            </label>
            <div className="mt-2.5">
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="invoice" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Invoice (File Upload)
            </label>
            <div className="mt-2.5">
              <input
                id="invoice"
                name="invoice"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formData.invoice && (
                <div className="mt-2">
                  <PhotoIcon className="h-6 w-6 text-gray-500" />
                  <p className="text-sm text-gray-600">{formData.invoice.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
          >
            Submit
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
      </form>
    </div>
  );
}

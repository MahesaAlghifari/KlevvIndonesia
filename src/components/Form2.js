import { useState } from 'react';

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
  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*|application/pdf')) {
      setError('Invalid file type. Please upload a PDF, JPG, JPEG, or PNG file.');
      return;
    }

    setFormData({
      ...formData,
      invoice: file,
    });

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate required fields
    if (!validateRequiredFields(formData)) {
      setError('Please fill in all required fields.');
      return;
    }

    // Prepare form data
    const formDataWithFile = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithFile.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataWithFile,
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        // Reset form data
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
        setPreviewUrl(''); // Clear preview URL
      } else {
        const result = await response.json();
        setError(result.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit form');
    }
  };

  // Helper functions for validation
  const validateRequiredFields = (data) => {
    const requiredFields = ['name', 'gender', 'placeOfBirth', 'city', 'idCardNumber', 'headline', 'phone', 'address'];
    return requiredFields.every((field) => data[field]);
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Input your Data</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Please fill out the form below to submit your data.
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
                placeholder="Enter your name"
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
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 bg-white text-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option value="" disabled selected hidden>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                placeholder="Enter your place of birth"
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
                placeholder="Enter your city"
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
                placeholder="Enter your ID card number"
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
                placeholder="Enter a headline"
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
                placeholder="Enter your phone number"
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
                placeholder="Enter your address"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="invoice" className="text-left block text-sm font-semibold leading-6 text-gray-900">
              Invoice
            </label>
            <div className="mt-2.5">
              <input
                id="invoice"
                name="invoice"
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
              {previewUrl && (
                <div className="mt-4">
                  <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-md" />
                </div>
              )}
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 text-green-500 text-sm">
            {success}
          </div>
        )}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

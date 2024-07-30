'use client'

import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

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
  })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      invoice: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi Formulir
    if (!formData.name || !formData.gender || !formData.placeOfBirth || !formData.city || !formData.idCardNumber || !formData.headline || !formData.phone || !formData.address) {
      setError('Please fill in all required fields.')
      return
    }

    if (!formData.invoice) {
      setError('Please upload an invoice.')
      return
    }

    // Reset Error and Success Messages
    setError('')
    setSuccess('')

    const formDataToSend = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'invoice') {
        formDataToSend.append(key, formData[key])
      } else {
        formDataToSend.append(key, formData[key])
      }
    })

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formDataToSend,
      })
      
      if (!response.ok) {
        throw new Error('Network response was not ok.')
      }

      setSuccess('Form submitted successfully!')
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
      })
    } catch (error) {
      setError(`Submission failed: ${error.message}`)
    }
  }

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
          {/* Other form fields remain the same */}
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
                <option value="">Select Gender</option>
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
                type="date"
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
                type="tel"
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
                rows={4}
                value={formData.address}
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label htmlFor="invoice" className="text-left block text-sm font-medium leading-6 text-gray-900">
              Invoice
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <PhotoIcon aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="invoice" type="file" onChange={handleFileChange} className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </div>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        {success && <p className="mt-4 text-center text-green-600">{success}</p>}
      </form>
    </div>
  )
}

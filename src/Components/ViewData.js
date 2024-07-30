import { useState, useEffect } from 'react';

export default function ViewData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Data dummy
  const dummyData = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      placeOfBirth: 'New York',
      city: 'New York',
      idCardNumber: '1234567890',
      headline: 'Software Engineer',
      phone: '123-456-7890',
      address: '123 Main St, New York, NY',
      invoice: 'https://example.com/invoice1.pdf',
    },
    {
      id: 2,
      name: 'Jane Smith',
      gender: 'Female',
      placeOfBirth: 'Los Angeles',
      city: 'Los Angeles',
      idCardNumber: '0987654321',
      headline: 'Product Manager',
      phone: '098-765-4321',
      address: '456 Elm St, Los Angeles, CA',
      invoice: 'https://example.com/invoice2.pdf',
    },
    // Tambahkan lebih banyak data dummy sesuai kebutuhan
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulasi fetching data dummy
        setTimeout(() => {
          setData(dummyData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uploaded Data</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Below is the list of data that has been uploaded.
        </p>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="mt-8">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No data available</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Gender</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Place of Birth</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">City</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">ID Card Number</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Headline</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Address</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((formdata) => (
                  <tr key={formdata.id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.gender}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.placeOfBirth}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.idCardNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.headline}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formdata.address}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formdata.invoice && (
                        <a href={formdata.invoice} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View Invoice
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

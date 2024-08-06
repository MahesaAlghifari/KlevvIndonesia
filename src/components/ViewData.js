import { useState, useEffect } from 'react';
import dummyData from './DummyData';

export default function ViewData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const correctPassword = 'klevvadmin#1234';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Log dummyData to check its content
        console.log(dummyData);
        
        setTimeout(() => {
          // Check if dummyData is an array
          if (Array.isArray(dummyData)) {
            setData(dummyData);
          } else {
            setError('Invalid data format');
          }
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

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get data for current page
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="isolate bg-white px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-sm text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Access Restricted</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">Please enter the password to access the data.</p>
          <form onSubmit={handleLogin} className="mt-8">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              placeholder="Enter password"
            />
            <button
              type="submit"
              className="mt-4 rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="isolate bg-white px-6 py-20 sm:py-32 lg:px-8">
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
        <div className="mt-8 overflow-x-auto">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No data available</p>
          ) : (
            <>
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
                  {currentData.map((formdata) => (
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
            </>
          )}
        </div>
      )}
      {/* Pagination */}
      <div className="mt-12 text-end">
        <div className="inline-flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center mt-24">
        <p className="text-lg font-medium text-gray-900">Total Data: {data.length}</p>
      </div>
    </div>
  );
}

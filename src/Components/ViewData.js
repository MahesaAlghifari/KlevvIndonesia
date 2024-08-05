import { useState, useEffect } from 'react';

export default function ViewData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Data dummy dengan ID unik
  const dummyData = [
    { id: 1, name: 'John Doe', gender: 'Male', placeOfBirth: 'New York', city: 'New York', idCardNumber: '1234567890', headline: 'Software Engineer', phone: '123-456-7890', address: '123 Main St, New York, NY', invoice: 'https://example.com/invoice1.pdf' },
    { id: 2, name: 'Jane Smith', gender: 'Female', placeOfBirth: 'Los Angeles', city: 'Los Angeles', idCardNumber: '0987654321', headline: 'Product Manager', phone: '098-765-4321', address: '456 Elm St, Los Angeles, CA', invoice: 'https://example.com/invoice2.pdf' },
    { id: 3, name: 'Alice Johnson', gender: 'Female', placeOfBirth: 'San Francisco', city: 'San Francisco', idCardNumber: '1112131415', headline: 'Data Scientist', phone: '111-213-1415', address: '789 Market St, San Francisco, CA', invoice: 'https://example.com/invoice3.pdf' },
    { id: 4, name: 'Bob Brown', gender: 'Male', placeOfBirth: 'Chicago', city: 'Chicago', idCardNumber: '1617181920', headline: 'UX Designer', phone: '161-718-1920', address: '101 State St, Chicago, IL', invoice: 'https://example.com/invoice4.pdf' },
    { id: 5, name: 'Carol White', gender: 'Female', placeOfBirth: 'Houston', city: 'Houston', idCardNumber: '2122232425', headline: 'Marketing Specialist', phone: '212-223-2425', address: '202 Main St, Houston, TX', invoice: 'https://example.com/invoice5.pdf' },
    { id: 6, name: 'David Black', gender: 'Male', placeOfBirth: 'Philadelphia', city: 'Philadelphia', idCardNumber: '2627282930', headline: 'Product Designer', phone: '262-728-2930', address: '303 Broad St, Philadelphia, PA', invoice: 'https://example.com/invoice6.pdf' },
    { id: 7, name: 'Emily Clark', gender: 'Female', placeOfBirth: 'Boston', city: 'Boston', idCardNumber: '3132333435', headline: 'HR Manager', phone: '313-233-3435', address: '404 Beacon St, Boston, MA', invoice: 'https://example.com/invoice7.pdf' },
    { id: 8, name: 'Frank Martinez', gender: 'Male', placeOfBirth: 'Seattle', city: 'Seattle', idCardNumber: '3637383940', headline: 'Sales Executive', phone: '363-738-3940', address: '505 Pike St, Seattle, WA', invoice: 'https://example.com/invoice8.pdf' },
    { id: 9, name: 'Grace Wilson', gender: 'Female', placeOfBirth: 'San Diego', city: 'San Diego', idCardNumber: '4142434445', headline: 'Content Writer', phone: '414-243-4445', address: '606 Harbor Dr, San Diego, CA', invoice: 'https://example.com/invoice9.pdf' },
    { id: 10, name: 'Henry King', gender: 'Male', placeOfBirth: 'Dallas', city: 'Dallas', idCardNumber: '4647484950', headline: 'IT Specialist', phone: '464-748-4950', address: '707 Elm St, Dallas, TX', invoice: 'https://example.com/invoice10.pdf' },
    { id: 11, name: 'Ivy Evans', gender: 'Female', placeOfBirth: 'Miami', city: 'Miami', idCardNumber: '5152535455', headline: 'Finance Analyst', phone: '515-253-5455', address: '808 Collins Ave, Miami, FL', invoice: 'https://example.com/invoice11.pdf' },
    { id: 12, name: 'Jack Lewis', gender: 'Male', placeOfBirth: 'Denver', city: 'Denver', idCardNumber: '5657585950', headline: 'Operations Manager', phone: '565-758-5950', address: '909 16th St, Denver, CO', invoice: 'https://example.com/invoice12.pdf' },
    { id: 13, name: 'Katherine Scott', gender: 'Female', placeOfBirth: 'Phoenix', city: 'Phoenix', idCardNumber: '6162636465', headline: 'Legal Advisor', phone: '616-263-6465', address: '1010 Camelback Rd, Phoenix, AZ', invoice: 'https://example.com/invoice13.pdf' },
    { id: 14, name: 'Liam Young', gender: 'Male', placeOfBirth: 'San Antonio', city: 'San Antonio', idCardNumber: '6667686970', headline: 'Supply Chain Coordinator', phone: '666-768-6970', address: '1111 Broadway St, San Antonio, TX', invoice: 'https://example.com/invoice14.pdf' },
    { id: 15, name: 'Mia Harris', gender: 'Female', placeOfBirth: 'Austin', city: 'Austin', idCardNumber: '7172737475', headline: 'Research Scientist', phone: '717-273-7475', address: '1212 Guadalupe St, Austin, TX', invoice: 'https://example.com/invoice15.pdf' },
    { id: 16, name: 'Nathan Adams', gender: 'Male', placeOfBirth: 'Jacksonville', city: 'Jacksonville', idCardNumber: '7677787980', headline: 'Customer Support Manager', phone: '767-778-7980', address: '1313 San Marco Blvd, Jacksonville, FL', invoice: 'https://example.com/invoice16.pdf' },
    { id: 17, name: 'Olivia Baker', gender: 'Female', placeOfBirth: 'Columbus', city: 'Columbus', idCardNumber: '8182838485', headline: 'Graphic Designer', phone: '818-283-8485', address: '1414 High St, Columbus, OH', invoice: 'https://example.com/invoice17.pdf' },
    { id: 18, name: 'Paul Turner', gender: 'Male', placeOfBirth: 'Indianapolis', city: 'Indianapolis', idCardNumber: '8687888990', headline: 'Web Developer', phone: '868-788-8990', address: '1515 Meridian St, Indianapolis, IN', invoice: 'https://example.com/invoice18.pdf' },
    { id: 19, name: 'Quinn Rivera', gender: 'Female', placeOfBirth: 'Charlotte', city: 'Charlotte', idCardNumber: '9192939495', headline: 'Business Analyst', phone: '919-293-9495', address: '1616 Trade St, Charlotte, NC', invoice: 'https://example.com/invoice19.pdf' },
    { id: 20, name: 'Ryan Cooper', gender: 'Male', placeOfBirth: 'San Francisco', city: 'San Francisco', idCardNumber: '9697989990', headline: 'Systems Administrator', phone: '969-798-9990', address: '1717 Market St, San Francisco, CA', invoice: 'https://example.com/invoice20.pdf' },
  ];



  useEffect(() => {
    const fetchData = async () => {
      try {
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

  // Hitung total halaman
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

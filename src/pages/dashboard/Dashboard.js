import Cookies from "js-cookie";
import React, { useContext } from "react";
import { json, Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import WelcomeBanner from "./WelcomeBanner";
import { useEffect } from "react";

const Dashboard = () => {
  const user = JSON.parse(Cookies.get("user"));

  const { state, handleFunction } = useContext(GlobalContext);

  const { data, fetchStatus, setFetchStatus } = state;

  const { fetchData, moveAdd } = handleFunction;

  const handleText = (e) => {
    if (e === null) {
      return "";
    } else {
      return e.slice(0, 18) + " ...";
    }
  };

  useEffect(() => {
    if (fetchStatus === true) {
      fetchData();
    }
  }, [fetchStatus, setFetchStatus]);

  
  return (
    <>
      <WelcomeBanner>{user.name}</WelcomeBanner>
      <div className="mb-8">
        <button onClick={moveAdd} className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Data
        </button>
        <div className="rounded-md bg-sky-200 w-52 py-3 px-4">
          <h5 className="font-bold text-md mb-2">Jumlah Lowongan</h5>
          <p className="text-center text-xl"> 
          { data === null && 0} 
          {data !== null && data.length}
          </p>
        </div>
      </div>
      <h5 className="font-bold text-md mb-2">Data Lowongan</h5>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Perusahaan
              </th>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Tipe
              </th>
              <th scope="col" className="px-6 py-3">
                Waktu Kerja
              </th>
              <th scope="col" className="px-6 py-3">
                Lokasi
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((value, index) => {
                if (index < 5) {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </th>
                    <td className="px-4 py-4">
                      <img src={value.company_image_url} width="25px" />
                      <span>{value.company_name}</span>
                    </td>
                    <td className="px-4 py-4">
                      {value.title.length > 18 && handleText(value.title)}
                      {value.title.length < 18 && value.title}
                    </td>
                    <td className="px-4 py-4">{value.job_type}</td>
                    <td className="px-4 py-4">{value.job_tenure}</td>
                    <td className="px-4 py-4">{value.company_city}</td>
                  </tr>
                )};
              })}
          </tbody>
          <tr>
            <td colSpan={6} className='text-center font-bold text-md py-3 text-blue-800'>
              <Link to={'/dashboard/list-job-vacancy'}>
              Lihat Semua Data
              </Link>
            </td>
          </tr>
        </table>
        {data === null && (
          <div className="text-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;

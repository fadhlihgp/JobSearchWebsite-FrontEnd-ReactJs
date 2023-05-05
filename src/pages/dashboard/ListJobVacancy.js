import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";

const ListJobVacancy = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const { data, setData, fetchStatus, setFetchStatus } = state;
  const { fetchData, handleDelete, handleEdit, moveAdd } = handleFunction;
  
  const [showModal, setShowModal] = React.useState(false);
  const [id, setId] = useState("");

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

  // search
  const [search, setSearch] = useState("");

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    let fetchDataSearch = async () => {
      let { data } = await axios.get("https://dev-example.sanbercloud.com/api/job-vacancy");
      let dataJob = data.data;

      console.log(dataJob);

      let searchData = dataJob.filter((res) => {
        return Object.values(res).join(" ").toLowerCase().includes(search.toLowerCase());
      });

      setData([...searchData]);
    };

    fetchDataSearch();
    setSearch("");
  };

  // Filter
  const [filter, setFilter] = useState({
    job_type: "",
    job_tenure: "",
    company_city: "",
  });

  const resetFilter = (event) => {
    event.preventDefault();
    setFilter({
      job_type: "",
      job_tenure: "",
      company_city: "",
    });
    fetchData();
  };

  const handleChangeFilter = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleFilter = (event) => {
    event.preventDefault();
    let fetchDataSearch = async () => {
      let { data } = await axios.get("https://dev-example.sanbercloud.com/api/job-vacancy");
      let dataJob = data.data;

      console.log(dataJob);

      let filterData = dataJob.filter((res) => {
        return (
          res.job_type.toLowerCase() === filter.job_type.toLowerCase() &&
          res.job_tenure.toLowerCase() === filter.job_tenure.toLowerCase() &&
          res.company_city.toLowerCase() === filter.company_city.toLowerCase()
        );
      });

      console.log(filterData);

      setData([...filterData]);
    };

    fetchDataSearch();
    //setSearch("");
  };

  const ConfirmDelete = () => {
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div class="p-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>

                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Konfirmasi untuk menghapus data lowongan pekerjaan ?
                </h3>
                <button
                  value={id}
                  onClick={() => {
                    handleDelete(id)
                    setShowModal(false)
                    setId("")
                  }}
                  type="button"
                  class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                  Konfirmasi
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  return (
    <>
      {showModal ? <>{ConfirmDelete()}</> : null}
      <div className=" w-full flex m-auto gap-5 items-center">
        <form className="w-full" onSubmit={handleSearch}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={handleChangeSearch}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cari pekerjaan ..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>
      </div>
      <form onSubmit={handleFilter}>
        <div className="flex w-full py-3 mb-3 bg-gray-50 flex-wrap justify-center items-center m-auto gap-3 mt-5 rounded-lg border-2">
          <div className="w-3/12 ">
            <select
              value={filter.job_type}
              name="job_type"
              onChange={handleChangeFilter}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Pilih Tipe Pekerjaan</option>
              <option defaultValue="Onsite">Onsite</option>
              <option defaultValue="Work From Home">Work From Home</option>
              <option defaultValue="Hybrid">Hybrid</option>
              <option defaultValue="Remote">Remote</option>
            </select>
          </div>
          <div className="w-3/12">
            <select
              value={filter.job_tenure}
              name="job_tenure"
              onChange={handleChangeFilter}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Jenis Waktu</option>
              <option defaultValue={"Internship"}>Internship</option>
              <option defaultValue={"Freelance"}>Freelance</option>
              <option defaultValue="Parttime">Parttime</option>
              <option defaultValue="Fulltime">Fulltime</option>
              <option defaultValue="Contract">Contract</option>
            </select>
          </div>
          <div className=" w-3/12">
            <input
              type="text"
              name="company_city"
              placeholder="Lokasi"
              value={filter.company_city}
              onChange={handleChangeFilter}
              className=" w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Filter Data
            </button>
            <button
              onClick={resetFilter}
              className="text-white right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Reset
            </button>
          </div>
        </div>
      </form>

      <button
        onClick={moveAdd}
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
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

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
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
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data !== null &&
              data.map((value, index) => {
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
                    <td className="px-4 py-4">
                      <button
                        value={value.id}
                        onClick={handleEdit}
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-5 py-2 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Edit
                      </button>
                      <button
                        value={value.id}
                        onClick={() => {
                          setId(value.id);
                          setShowModal(true);
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
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

export default ListJobVacancy;

import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import axios from "axios";

const JobVacancy = () => {
  let { state, handleFunction } = useContext(GlobalContext);
  let { data, setData } = state;
  let { fetchData, moneyFormat } = handleFunction;

  useState(() => {
    fetchData();
  }, []);

  const handleText = (e) => {
    if (e === null) {
      return "";
    } else {
      return e.slice(0, 300) + " ...";
    }
  };

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

  return (
    <>
      <div className=" w-10/12 flex m-auto gap-5 items-center">
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
        <div className="flex w-10/12 py-3 flex-wrap justify-center items-center m-auto gap-3 mt-5 rounded-lg border-2">
          <div className="w-3/12 ">
            {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipe Pekerjaan</label>
                  <input
                    type="text"
                    name="job_type"
                    onChange={handleChangeFilter}
                    value={filter.job_type}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  /> */}

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

      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {/* Card */}
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
        {data !== null &&
          data.map((value, index) => {
            return (
              <Link
                to={`/detail/${value.id}`}
                key={index}
                className="w-full max-w-xs p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700 mr-5 mb-7 h-96">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="relative p-2 ">
                      <img src={value.company_image_url} width="45px" alt="company logo" />
                    </span>
                    <div className="flex flex-col">
                      <span className="ml-2 font-bold text-black text-md dark:text-white">{value.title}</span>
                      <span className="ml-2 text-sm text-gray-500 dark:text-white">{value.company_name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-4 space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                    {value.job_tenure}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {value.job_type}
                  </span>
                </div>
                <div className="w-full block mb-7">
                  <div className="w-full h-2 mt-2 mb-3 ">
                    <div className="flex items-center mb-4 space-x-1 text-xs text-slate-600">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                      </span>
                      <span>{value.company_city}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 mt-2 mb-3 ">
                    <div className="flex items-center mb-4 space-x-1 text-xs text-slate-600">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </span>
                      <span>
                        Rp {moneyFormat(value.salary_min + "")} - Rp {moneyFormat(value.salary_max + "")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-slate-800 justify-start my-4 space-x-4 text-sm">
                  <p>{handleText(value.job_description)}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};
export default JobVacancy;

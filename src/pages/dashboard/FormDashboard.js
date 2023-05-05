import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const FormDashboard = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const { state, handleFunction } = useContext(GlobalContext);
  const { inputJob, setInputJob, currentId, setCurrentId } = state;
  const { handleSubmit, handleInputJob, fetchDataDetail } = handleFunction;

  useEffect(() => {
    if (id !== undefined) {
      fetchDataDetail();
    }
  }, []);

  const handleCancel = (event) => {
    event.preventDefault();

    setCurrentId(-1);
    setInputJob({
      title: "",
      job_description: "",
      job_qualification: "",
      job_type: "",
      job_tenure: "",
      job_status: "",
      company_name: "",
      company_image_url: "",
      company_city: "",
      salary_min: "",
      salary_max: "",
    });
    navigate("/dashboard/list-job-vacancy");
  };

  // Confirm
  const titleForm = currentId === -1 ? "Tambah Lowongan Baru" : "Mengubah Data Lowongan";

  return (
    <>
      <>
        <section className="max-w-5xl p-6 mx-auto bg-blue-600 rounded-md shadow-md dark:bg-gray-800 mt-5 mb-5">
          <h1 className="text-xl font-bold text-white capitalize dark:text-white">{titleForm}</h1>
          <form
            onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="username">
                  Judul Lowongan
                </label>
                <input
                  name="title"
                  type="text"
                  value={inputJob.title}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="emailAddress">
                  Nama Perusahaan
                </label>
                <input
                  name="company_name"
                  type="text"
                  value={inputJob.company_name}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Jenis Waktu
                </label>
                <select
                  name="job_tenure"
                  value={inputJob.job_tenure}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option>Pilih jenis Waktu</option>
                  <option defaultValue={"Internship"}>Internship</option>
                  <option defaultValue={"Freelance"}>Freelance</option>
                  <option defaultValue="PartTime">Parttime</option>
                  <option defaultValue="Fulltime">Fulltime</option>
                  <option defaultValue="Contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Lokasi
                </label>
                <input
                  name="company_city"
                  type="text"
                  value={inputJob.company_city}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Tipe Pekerjaan
                </label>
                <select
                  name="job_type"
                  value={inputJob.job_type}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option>Pilih Tipe Pekerjaan</option>
                  <option defaultValue="Onsite">OnSite</option>
                  <option defaultValue="Work From Home">Work From Home</option>
                  <option defaultValue="Hybrid">Hybrid</option>
                  <option defaultValue="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Image Url
                </label>
                <input
                  name="company_image_url"
                  type="text"
                  value={inputJob.company_image_url}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Gaji Minimum
                </label>
                <input
                  name="salary_min"
                  type="number"
                  value={inputJob.salary_min}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>

              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Gaji Maksimal
                </label>
                <input
                  name="salary_max"
                  type="number"
                  value={inputJob.salary_max}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Kualifikasi
                </label>
                <textarea
                  name="job_qualification"
                  type="textarea"
                  value={inputJob.job_qualification}
                  onChange={handleInputJob}
                  required
                  rows={"8"}
                  className="block w-full text-xs font-semibold px-2 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Status
                </label>
                <select
                  name="job_status"
                  value={inputJob.job_status}
                  onChange={handleInputJob}
                  required
                  className="block w-full px-2 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                  <option>Pilih Status</option>
                  <option value={1}>Buka</option>
                  <option value={0}>Tutup</option>
                </select>
              </div>
              <div>
                <label className="text-white dark:text-gray-200" htmlFor="passwordConfirmation">
                  Deskripsi
                </label>
                <textarea
                  name="job_description"
                  type="textarea"
                  value={inputJob.job_description}
                  onChange={handleInputJob}
                  required
                  rows={"8"}
                  className="block w-full px-2 py-2 mt-2 text-black font-semibold text-xs bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="w-full mt-6 ">
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Save
              </button>
              <button
                onClick={handleCancel}
                className="w-full font-bold  text-sm px-5 py-2.5 text-center mr-2 mb-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Batal
              </button>
            </div>
          </form>
        </section>
      </>
    </>
  );
};

export default FormDashboard;

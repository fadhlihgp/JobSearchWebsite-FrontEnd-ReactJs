import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [data, setData] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${id}`).then((res) => {
        setData(res.data);
      });
    }
  }, [data]);

  function moneyFormat(number, prefix) {
    var number_string = number.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      rest = split[0].length % 3,
      rupiah = split[0].substr(0, rest),
      thousand = split[0].substr(rest).match(/\d{3}/gi);

    if (thousand) {
      let sparator = rest ? "." : "";
      rupiah += sparator + thousand.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? "Rp." + rupiah : "";
  }

  return (
    <>
      {data === null && (
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {data !== null && (
        <div className="w-full flex flex-col p-5  mt-6 bg-slate-100 ">
          <div className="w-full bg-white p-5 rounded-xl mb-6">
            <h1 className="font-bold text-3xl mb-4">{data.title}</h1>
            <div className="w-full flex flex-wrap gap-7">
              <div className="flex items-center mb-4 ">
                <img src={data.company_image_url} width="40px" alt="company logo" />
              </div>
              <div className="flex items-center mb-4 space-x-1 text-xl text-blue-600">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </span>
                <span>{data.company_name}</span>
              </div>
              <div className="flex items-center mb-4 space-x-1 text-xl text-blue-600">
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
                <span>{data.company_city}</span>
              </div>
            </div>
            <hr className="w-full mb-4" />
            <div className="w-full flex flex-wrap gap-8">
              <div>
                <h4 className="font-bold text-slate-700">Gaji: </h4>
                <h4 className="font-bold text-blue-700">
                  Rp {moneyFormat(data.salary_min + "")} - Rp {moneyFormat(data.salary_max + "")}{" "}
                </h4>
              </div>
              <div>
                <h4 className="font-bold text-slate-700">Tipe Pekerjaan: </h4>
                <h4 className="font-bold text-blue-700">{data.job_type}</h4>
              </div>
              <div>
                <h4 className="font-bold text-slate-700">Waktu Kerja: </h4>
                <h4 className="font-bold text-blue-700">{data.job_tenure}</h4>
              </div>
            </div>
          </div>
          <div className="w-full bg-white p-5 rounded-xl">
            <div className="w-full flex flex-col flex-wrap gap-8">
              <div>
                <h4 className="font-bold text-slate-900">Deskripsi Pekerjaan: </h4> <br />
                <p className=" text-slate-900">{data.job_description}</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Kualifikasi: </h4> <br />
                <p className=" text-slate-900">{data.job_qualification} </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Detail;

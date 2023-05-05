import { Navbar } from "flowbite-react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import React from "react";

const Navigation = () => {
  const { handleFunction } = useContext(GlobalContext);
  const { handleLogout } = handleFunction;
  const [showModal, setShowModal] = React.useState(false);

  const ConfirmLogout = () => {
    return (
      <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div class="p-6 text-center">
                  <svg
                    aria-hidden="true"
                    class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Anda yakin ingin logout sebagai admin ?
                  </h3>
                  <button
                    onClick={() => {
                      handleLogout()
                      setShowModal(false)
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
    )
  }

  return (
    <>
      {showModal ? (
        <>
          {ConfirmLogout()}
        </>
      ) : null}
      <Navbar fluid={true} rounded={true}>
        <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <Link to={"/"} style={{ color: "blue", fontSize: "35px" }}>
              Job<b>Search</b>
            </Link>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
              <li>
                <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/job-vacancy" className="text-gray-900 dark:text-white hover:underline">
                  Job Vacancy
                </Link>
              </li>
              {!Cookies.get("token") && (
                <li>
                  <Link to="/login" className="text-gray-900 dark:text-white hover:underline">
                    Login
                  </Link>
                </li>
              )}
              {Cookies.get("token") && (
                <>
                  <li>
                    <Link to="/dashboard" className="text-gray-900 dark:text-white hover:underline">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1 mr-1 mb-1 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};
export default Navigation;

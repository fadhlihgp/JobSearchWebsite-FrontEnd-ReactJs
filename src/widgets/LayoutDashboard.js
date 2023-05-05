import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const LayoutDashboard = (props) => {
  const user = JSON.parse(Cookies.get("user"));
  return (
    <>
      <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <div className="flex items-start justify-between">
          <Sidebar />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <header className="z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-700 rounded-2xl">
              <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
                <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
                  <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                    <div className="relative flex items-center w-full h-full lg:w-64 group"></div>
                  </div>
                  <div className="relative flex items-center justify-end w-1/4 p-1 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <Link to="/dashboard/profile" className="relative block">
                      <img alt="profil" src={user.image_url} className="mx-auto object-cover rounded-full h-10 w-10 " />
                    </Link>
                  </div>
                </div>
              </div>
            </header>
            <div className="h-screen pt-2 pb-24 pl-2 pr-2 overflow-auto md:pt-0 md:pr-0 md:pl-0">{props.children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
export default LayoutDashboard;

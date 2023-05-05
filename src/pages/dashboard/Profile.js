import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Profile = () => {
  const user = JSON.parse(Cookies.get("user"));

  return (
    <>
      <div class="bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800 m-auto mt-24">
        <img
          alt="profil"
          src="https://t3.ftcdn.net/jpg/04/12/82/16/360_F_412821610_95RpjzPXCE2LiWGVShIUCGJSktkJQh6P.jpg"
          class="w-full mb-4 rounded-t-lg h-28"
        />
        <div class="flex flex-col items-center justify-center p-4 -mt-16">
          <Link to={'/dashboard/profile'} class="relative block">
            <img
              alt="profil"
              src={user.image_url}
              class="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
            />
          </Link>
          <p class="mt-2 text-xl font-medium text-gray-800 dark:text-white">{user.name}</p>
          <p class="mb-4 text-xs text-gray-400">{user.email}</p>
          <Link to={"/dashboard/change-password"} class="p-2 px-4 text-xs text-white bg-blue-600 rounded-full">
            Ganti Password
          </Link>
          <div class="w-full p-2 mt-4 rounded-lg">
            {/* <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
              <p class="flex flex-col">
                Articles
                <span class="font-bold text-black dark:text-white">34</span>
              </p>
              <p class="flex flex-col">
                Followers
                <span class="font-bold text-black dark:text-white">455</span>
              </p>
              <p class="flex flex-col">
                Rating
                <span class="font-bold text-black dark:text-white">9.3</span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

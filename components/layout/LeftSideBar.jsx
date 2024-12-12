"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";

const LeftSideBar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="h-screen sticky top-0 overflow-auto px-8 py-6 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-xl flex flex-col gap-8 max-md:hidden 2xl:w-[350px] pr-16 custom-scrollbar">
      {/* Logo */}
      <Link href="/" className="flex justify-center">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={180}
          height={180}
          className="hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* User Info */}
      <div className="flex flex-col items-center gap-4">
        <Link
          href={`/profile/${userData?._id}/posts`}
          className="hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={userData?.profilePhoto}
            alt="profile photo"
            width={60}
            height={60}
            className="rounded-full border-4 border-gray-700"
          />
        </Link>
        <p className="text-lg font-semibold">{`${userData?.firstName || ""} ${userData?.lastName || ""
          }`}</p>
        <div className="flex justify-between w-full text-center text-gray-300 mt-2 gap-5">
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">{userData?.posts?.length || 0}</p>
            <p className="text-sm">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">{userData?.followers?.length || 0}</p>
            <p className="text-sm">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">{userData?.following?.length || 0}</p>
            <p className="text-sm">Following</p>
          </div>
        </div>
      </div>

      <hr className="border-gray-600" />

      {/* Menu */}
      <Menu />

      <hr className="border-gray-600" />

      {/* Manage Account */}
      <div className="flex items-center gap-4">
        <UserButton
          appearance={{ baseTheme: dark }}
          afterSignOutUrl="/sign-in"
        />
        <p className="text-lg font-medium hover:text-gray-300 cursor-pointer">
          Manage Account
        </p>
      </div>
    </div>
  );
};

export default LeftSideBar;

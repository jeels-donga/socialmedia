"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserCard = ({ userData, update }) => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUserInfo(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const isFollowing = userInfo?.following?.find(
    (item) => item._id === userData._id
  );

  const handleFollow = async () => {
    const response = await fetch(
      `/api/user/${user.id}/follow/${userData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setUserInfo(data);
    update();
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow">
      <Link
        className="flex gap-4 items-center hover:no-underline"
        href={`/profile/${userData._id}/posts`}
      >
        <Image
          src={userData.profilePhoto}
          alt="profile photo"
          width={50}
          height={50}
          className="rounded-full border border-gray-300"
        />
        <div className="flex flex-col">
          <p className="text-base font-semibold text-gray-800">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-sm text-gray-500">@{userData.username}</p>
        </div>
      </Link>

      {user.id !== userData.clerkId &&
        (isFollowing ? (
          <button
            className="flex items-center gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-md transition-colors"
            onClick={() => handleFollow()}
          >
            <PersonRemove className="w-5 h-5" />
            <span className="text-sm font-medium">Unfollow</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md transition-colors"
            onClick={() => handleFollow()}
          >
            <PersonAddAlt className="w-5 h-5" />
            <span className="text-sm font-medium">Follow</span>
          </button>
        ))}
    </div>
  );
};

export default UserCard;

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { tabs } from "@constants";
import Link from "next/link";

const ProfileCard = ({ userData, activeTab }) => {
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
  };

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-6 p-6 bg-gradient-to-r from-purple-700 to-purple-900 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-start">
          <Image
            src={userData.profilePhoto}
            alt="profile photo"
            width={100}
            height={100}
            className="rounded-full border-4 border-purple-300 shadow-md"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-bold">{`${userData.firstName} ${userData.lastName}`}</p>
            <p className="text-sm text-purple-200">@{userData.username}</p>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold text-purple-200">{userData.posts.length}</p>
                <p className="text-sm">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold text-purple-200">{userData.followers.length}</p>
                <p className="text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-xl font-semibold text-purple-200">{userData.following.length}</p>
                <p className="text-sm">Following</p>
              </div>
            </div>
          </div>
        </div>

        {user.id !== userData.clerkId &&
          (isFollowing ? (
            <PersonRemove
              className="text-purple-400 hover:text-purple-100 cursor-pointer text-4xl transition-transform transform hover:scale-110"
              onClick={handleFollow}
            />
          ) : (
            <PersonAddAlt
              className="text-purple-400 hover:text-purple-100 cursor-pointer text-4xl transition-transform transform hover:scale-110"
              onClick={handleFollow}
            />
          ))}
      </div>

      <div className="flex gap-4 mt-4">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === tab.name
              ? "bg-purple-600 text-white shadow-md"
              : "bg-purple-800 text-purple-300 hover:bg-purple-700 hover:text-white"
              }`}
            href={`/profile/${userData._id}/${tab.link}`}
          >
            {tab.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;

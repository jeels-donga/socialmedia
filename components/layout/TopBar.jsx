"use client";

import { useEffect, useState } from "react";
import { Add, Logout, Person, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Loader from "@components/Loader";

const TopBar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const router = useRouter();

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

  return !isLoaded || loading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-between bg-gradient-to-r p-4 rounded-lg gap-5">
      {/* Search Input */}
      <div className="relative flex-grow max-w-md">
        <input
          type="text"
          className="w-full pl-12 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-indigo-500"
          onClick={() => router.push(`/search/posts/${search}`)}
        />
      </div>

      {/* Create Post Button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-purple-900 0 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-all"
        onClick={() => router.push("/create-post")}
      >
        <Add /> <span>Create A Post</span>
      </button>

      {/* User Actions */}
      <div className="flex gap-4 items-center">
        <Link href={`/profile/${userData?._id}/posts`}>
          <Person
            sx={{ fontSize: "35px" }}
            className="text-white cursor-pointer hover:text-yellow-400 transition-all"
          />
        </Link>
        <UserButton
          appearance={{
            baseTheme: {
              fontSize: "16px",
              fontWeight: "bold",
              color: "white",
              borderRadius: "0.375rem",
              hoverBackgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
          afterSignOutUrl="/sign-in"
        />
      </div>
    </div>
  );
};

export default TopBar;

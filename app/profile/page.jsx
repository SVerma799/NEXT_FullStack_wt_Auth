"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = () => {
    console.log("delete");
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(session);
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();

        console.log("data", data);
        setPosts(data);
      }
    };
    fetchData();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

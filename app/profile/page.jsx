"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const handleEdit = (post) => {
    console.log("edit reached here");
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = (post) => {
    if (!confirm("Are you sure you want to delete this prompt?")) return;
    try {
      const res = fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });

      const filteredPost = posts.filter((p) => p._id !== post._id);
      setPosts(filteredPost);

      if (res.ok) {
        alert("Prompt Deleted");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();
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

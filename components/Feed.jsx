"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, idx) => (
        <div key={idx}>
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
        </div> // this is the prompt card
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (session?.user?.id) fetchData();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          className="search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;

import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span>{name}</span> profile{" "}
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.length > 0 &&
          data.map((post, idx) => (
            <div key={idx}>
              <PromptCard
                key={post.id}
                post={post}
                handleEdit={() => handleEdit(post)}
                handleDelete={() => handleDelete(post)}
              />
            </div> // this is the prompt card
          ))}
      </div>
    </section>
  );
};

export default Profile;

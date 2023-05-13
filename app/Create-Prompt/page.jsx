"use client";

import Form from "@components/Form";
import { useState } from "react";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    // setSubmitting(true);
    // const res = await fetch("/api/create-prompt", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(post),
    // });
    // setSubmitting(false);
    // const json = await res.json();
    // if (!res.ok) throw Error(json.message);
    // alert("Prompt Created");
    // router.push("/");
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    ></Form>
  );
};

export default CreatePrompt;

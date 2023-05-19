// GET
// PATCH
// DELETE

import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt: promptText, tag } = await req.json();

  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id);

    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    prompt.prompt = promptText;
    prompt.tag = tag;

    await prompt.save();

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    console.log(params.id);

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

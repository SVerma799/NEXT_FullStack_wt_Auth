import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
  try {
    connectDB();

    const { id } = params;
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    console.log(prompts);
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

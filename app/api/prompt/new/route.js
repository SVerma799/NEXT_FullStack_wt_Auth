import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDB();

    // create a new prompt
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    // saving the prompts
    newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {}
};

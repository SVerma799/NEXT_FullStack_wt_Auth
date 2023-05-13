import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

/// this is the old way of doing this using the express server which is constanly running.
// const User = model("User", userSchema");
// export default User;

// this is the new way of doing this using the serverless function.
// basically we are checking if the model is already created or not.
// if it is created then we are using that model.
// if not then we are creating a new model.
const User = models.User || model("User", userSchema);

export default User;

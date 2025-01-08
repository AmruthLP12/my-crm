import mongoose from "mongoose";
import { IUser } from "../types/user";
import { Model } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const User : Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

"use server";

import { redirect } from "next/navigation";
import User from "@/app/models/User";
import clientPromise from "@/lib/mongodb";
import { auth, signIn } from "@/auth";
import { signOut as nextAuthSignOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login" };
  }
}

export async function signUp(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(name, email, password);

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    await clientPromise;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    const user = new User({ name, email, password });
    await user.save();

    return { success: true };
  } catch (error) {
    console.error("Sign-up error:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An error occurred during sign-up" };
  }
}

export async function signOut() {
  await nextAuthSignOut();
}

export async function getAllUsers() {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  try {
    const users = await User.find({}, "name email").lean();
    return users.map((user) => ({
      id: user._id as string,
      name: user.name,
      email: user.email,
    }));
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function updateUser(
  userId: string,
  userData: { name: string; email: string }
  
) {

  console.log(userData);
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  try {
    await User.findByIdAndUpdate(userId, userData);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  try {
    await User.findByIdAndDelete(userId);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

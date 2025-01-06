import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { UpdateUserForm } from "@/components/update-user-form";
import User from "@/app/models/User";
import { UserWithoutPassword } from "@/app/types/user";

export default async function UpdateUserPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = await User.findById(params.id).lean();

  if (!user) {
    return <div>User not found</div>;
  }

  const userData :UserWithoutPassword = ( {
    id: user._id as string,
    name: user.name as string,
    email: user.email as string,
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Update User</h1>
      <UpdateUserForm user={userData} />
    </div>
  );
}

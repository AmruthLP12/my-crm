import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { deleteUser, updateUser } from "../../../../actions/authActions";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { name, email, role } = await request.json(); 
  const result = await updateUser(params.id, { name, email , role});

  if (result.success) {
    return NextResponse.json({ message: "User updated successfully" });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const result = await deleteUser(params.id);

  if (result.success) {
    return NextResponse.json({ message: "User deleted successfully" });
  } else {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
}

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface UserDetails {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add any other fields you want to fetch from the backend
}

async function fetchUserDetails(): Promise<UserDetails> {
  const response = await fetch("/api/user");
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
}

export function useUserDetails() {
  const { data: session } = useSession();

  return useQuery<UserDetails, Error>({
    queryKey: ["userDetails", session?.user?.id],
    queryFn: fetchUserDetails,
    enabled: !!session?.user,
  });
}

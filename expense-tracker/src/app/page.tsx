import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Redirect based on authentication status
  if (!session) {
    redirect("/auth/login");
  }
  
  redirect("/dashboard");
} 
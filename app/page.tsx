import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if(!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      {JSON.stringify(session)}
    </div>
  )
}

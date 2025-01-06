import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { signOut } from '@/actions/authActions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold">Dashboard</Link>
          <div>
            <span className="mr-4">Welcome, {session.user.name}</span>
            <form action={signOut} method="post">
              <Button type="submit" variant="outline">Sign out</Button>
            </form>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}


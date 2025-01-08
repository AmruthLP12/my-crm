import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getAllUsers } from '@/actions/authActions'
import { UserList } from '@/components/user-list'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/login')
  }

  const users = await getAllUsers()
  console.log(users)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <p className="mb-4">Welcome, {session.user.name}!</p>
      <UserList initialUsers={users} />
    </div>
  )
}


'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type User = {
  id: string
  name: string
  email: string
}

export function UpdateUserForm({ user }: { user: User }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })

    if (response.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      alert('Failed to update user')
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Update User</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Update User</Button>
        </CardFooter>
      </form>
    </Card>
  )
}


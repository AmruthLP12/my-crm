import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  role: string
  password: string
}

export type UserWithoutPassword =  {
  id: string
  name: string
  email: string
  role: string
}


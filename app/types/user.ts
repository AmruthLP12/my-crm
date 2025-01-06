import { Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

export type UserWithoutPassword =  {
  id: string
  name: string
  email: string
}


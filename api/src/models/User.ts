import { model, Schema, Document } from 'mongoose';
import { hash, compare } from 'bcryptjs';
import { BCRYPT_WORK_FACTOR } from '../config';

interface UserDocument extends Document {
  email: string
  name: string
  password: string
  macthesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
  email: String,
  name: String,
  password: String
}, {
  timestamps: true
})

// Hashing the password
userSchema.pre<UserDocument>('save', async function () {

  // Checking if the password got modified
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
})

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
}

// This is a new methode we can use it to hide fields in our responses
userSchema.set('toJSON', {
  transform: (doc: any, { __V, password, ...rest }, options) => {
    return rest;
  }
})

export const User = model<UserDocument>('User', userSchema);
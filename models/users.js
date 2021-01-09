import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'Enter your e-mail address'],
    unique: [true, 'This e-mail address already exists']
  },
  password: {
    type: String,
    required: [true, 'Enter a password']
  },
  firstname: {
    type: String,
    trim: true,
    required: [true, 'Enter your first name']
  },
  lastname: {
    type: String,
    trim: true,
    required: [true, 'Enter your last name']
  },
  email_confirm: {
    type: Boolean,
    default: false,
    required: true
  },
  profile_picture: {
    type: String
    // get: v => `${root}${v}`
  }
}, {
  timestamps: true
})

usersSchema.remove('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})
const User = mongoose.model('User', usersSchema)

export default User

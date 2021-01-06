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

usersSchema.remove('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt)
    } catch (err) {
      next(err)
    }
  }
  next()
})

export default mongoose.model('User', usersSchema)
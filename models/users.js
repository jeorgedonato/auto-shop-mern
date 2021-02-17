import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    trim: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.`
    }
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

usersSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
})

usersSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

usersSchema.methods.matchesPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', usersSchema)

export default User

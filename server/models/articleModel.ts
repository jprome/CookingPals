import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
  title: {
    type: String,
    require: true,
    trim: true,
    minLength: 10,
    maxLength: 50
  },
  description: {
    type: String,
    require: true,
    trim: true,
    minLength: 50,
    maxLength: 200
  },
  }, {
  timestamps: true
})


export default mongoose.model('article', articleSchema)
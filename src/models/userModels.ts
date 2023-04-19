import mongoose from 'mongoose';

interface User {
  username: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePictureUrl: {
    type: String,
    required: false
  },
});

const User = mongoose.model('User', userSchema);

export default User;
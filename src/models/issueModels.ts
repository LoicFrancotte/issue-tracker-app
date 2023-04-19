import mongoose from 'mongoose';

interface Issue {
  number: number;
  title: string;
  status: string;
  dueDate: Date;
  createdDate: Date;
  createdBy: string;
  completedDate: Date;
  assignee: string;
  labels: string[];
  comments: {
    _id: mongoose.Types.ObjectId;
    comment: string;
    createdBy: string;
    createdDate: Date;
  }[];
  commentCount: number;
}

const issueSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['backlog', 'todo', 'inProgress', 'done', 'cancelled'],
    default: 'inProgress',
    required: true,
  },
  dueDate: Date,
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ref user
    required: true,
  },
  completedDate: Date,
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ref user
  },
  labels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label', // ref label
    },
  ],
  comments: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    comment: String,
    createdBy: String,
    createdDate: {
      type: Date,
      default: Date.now,
    },
  }],
  commentCount: {
    type: Number,
    default: 0,
  },
});

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;

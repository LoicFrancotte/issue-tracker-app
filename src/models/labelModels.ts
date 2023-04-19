import mongoose from 'mongoose';

interface Label {
  name: string;
  color: string;
}

const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Label = mongoose.model('Label', labelSchema);

export default Label
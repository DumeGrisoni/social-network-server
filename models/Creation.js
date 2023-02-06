const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatorSchema = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: false,
      unique: false,
      max: 800,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'Creator',
    },

    image: {
      type: String,
      required: false,
      unique: false,
    },
    likes: {
      type: Array,
      default: [],
      required: false,
      unique: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Creation', CreatorSchema);

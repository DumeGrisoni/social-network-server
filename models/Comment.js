const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
      unique: true,
    },
    creationId: {
      type: String,
      required: true,
      unique: true,
    },
    commentBody: {
      type: String,
      required: true,
      unique: false,
      max: 800,
    },
    creator: [{ type: Schema.Types.ObjectId, ref: 'Creator' }],
    creation: [{ type: Schema.Types.ObjectId, ref: 'Creation' }],
  },
  { timestamps: true }
);

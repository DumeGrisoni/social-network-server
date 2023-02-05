const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    surname: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    avatar: {
      type: String,
      default: '',
      required: false,
      unique: false,
    },
    friends: {
      type: Array,
      default: [],
      required: false,
      unique: false,
    },
    isAministrator: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Creator', CreatorSchema);

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
    followers: {
      type: Array,
      default: [],
      required: false,
      unique: false,
    },
    followings: {
      type: Array,
      default: [],
      required: false,
      unique: false,
    },
    isAministrator: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: '',
      required: false,
      unique: false,
      max: 150,
    },
    city: {
      type: String,
      default: '',
      required: false,
      unique: false,
      max: 50,
    },
    country: {
      type: String,
      default: '',
      required: false,
      unique: false,
      max: 50,
    },
    birthday: {
      type: Date,
      default: '',
      required: false,
      unique: false,
    },
    job: {
      type: String,
      enum: ['Etudiant', 'Salarié', 'Indépendant', 'Autre'],
      default: 'Etudiant',
    },
    creations: [{ type: Schema.Types.ObjectId, ref: 'Creation' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Creator', CreatorSchema);

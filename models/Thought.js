const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: String,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: string,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date)=> date.toLocaleDateString("sp-MX"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: string,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date)=> date.toLocaleDateString("sp-MX"),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

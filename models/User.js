const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: Number,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendList").get(function() {
  return this.friends.length;
});

const User = model("User", userSchema)

module.exports = User;

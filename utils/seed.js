const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersData, thoughtsData, reactionsData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  try {
  // Drop existing users
  await User.deleteMany({});

  // Drop existing thought
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  await User.create(usersData);

  // Loop 20 times -- add users to the user array
  const createThoughts = await Thought.create(thoughtsData);

    // Seed reactions data
    for (let i = 0; i < reactionsData.length; i++) {
      const { _id: thoughtId } = createThoughts[i % createThoughts.length];
      const reaction = reactionsData[i];

      await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: reaction } },
        { new: true }
      );
    }

    console.log("Database seeded successfully");
    console.info("Seeding complete! 🌱");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  }
})

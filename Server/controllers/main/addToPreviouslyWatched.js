const User = require("../../models/User");

const addToPreviouslyWatched = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.userId;
    console.log("userId", userId);

    const movie = await User.findOne({
      previouslyWatched: { $in: [movieId] },
    });

    if (movie) {
      await User.updateOne(
        { _id: userId },
        {
          $pull: { previouslyWatched: movieId },
        }
      );
    }
    await User.updateOne(
      { _id: userId },
      {
        $push: { previouslyWatched: movieId },
      }
    );

    const user = await User.findById(userId);
    console.log("user", user);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error Occured. Please try again");
  }
};

module.exports = addToPreviouslyWatched;

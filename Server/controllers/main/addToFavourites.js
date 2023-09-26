const User = require("../../models/User");

const addToFavourites = async (req, res) => {
  try {
    const { isFavourite, movieId } = req.body;
    const userId = req.user.userId;
    console.log("userId", userId);
    console.log("isFavourite", isFavourite, movieId);
    if (isFavourite) {
      await User.updateOne(
        { _id: userId },
        {
          $push: { likedMoviesId: movieId },
        }
      );
    } else {
      await User.updateOne(
        { _id: userId },
        {
          $pull: { likedMoviesId: movieId },
        }
      );
    }
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

module.exports = addToFavourites;

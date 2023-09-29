const User = require("../../models/User");

const isFavourite = async (req, res) => {
  try {
    const { movieId } = req.body;
    console.log("req.body", req.body);
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    console.log("user", user, movieId);
    const isMovieLiked = user.likedMoviesId.includes(movieId);
    console.log("isMovieLiked", isMovieLiked);
    res.status(200).json({
      success: true,
      isFavourite: isMovieLiked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error Occured. Please try again");
  }
};

module.exports = isFavourite;

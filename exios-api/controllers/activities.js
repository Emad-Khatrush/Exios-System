const Activities = require("../models/activities");
const ErrorHandler = require('../utils/errorHandler');

module.exports.getActivities = async (req, res, next) => {
  try {
    const activities = await Activities.find({}).populate('user');
    res.status(200).json(activities);
  } catch (error) {
    return next(new ErrorHandler(404, error.message));
  }
}

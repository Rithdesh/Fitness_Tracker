const workout = require('../Models/WorkoutModel');
const User = require('../Models/UserModel');


// Create a new workout
const createWorkout = async (req, res) => {
  try {
    const { title, description, duration, date } = req.body;
    const userId = req.user.id; // Get user ID from JWT token

    const newWorkout = new workout({
      title,
      description,
      duration,
      date,
      user: userId
    });

    await newWorkout.save();
    res.status(201).json({ message: 'Workout created successfully', workout: newWorkout });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workout', error: err.message });
  }
};
// Get all workouts for a user
const getWorkouts = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from JWT token
    const workouts = await workout.find({ user: userId }).populate('user', 'name email');

    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workouts', error: err.message });
  }
};
// Get a single workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from JWT token

    const workoutItem = await workout.findOne({ _id: id, user: userId }).populate('user', 'name email');
    
    if (!workoutItem) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json(workoutItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch workout', error: err.message });
  }
};
// Update a workout by ID
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from JWT token
    const { title, description, duration, date } = req.body;

    const updatedWorkout = await workout.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, duration, date },
      { new: true }
    ).populate('user', 'name email');

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found or not authorized' });
    }

    res.status(200).json({ message: 'Workout updated successfully', workout: updatedWorkout });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update workout', error: err.message });
  }
};
// Delete a workout by ID
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get user ID from JWT token

    const deletedWorkout = await workout.findOneAndDelete({ _id: id, user: userId });

    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found or not authorized' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete workout', error: err.message });
  }
};
// Export the controller functions
module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout
};

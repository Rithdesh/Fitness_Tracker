const Goal = require('../Models/GoalModel');

// ✅ Create a new goal
const setGoal = async (req, res) => {
  try {
    const { type, goal, currentProgress, dueDate } = req.body;
    const userId = req.user.id;

    if (!type || !goal || !dueDate) {
      return res.status(400).json({ message: "Type, goal, and due date are required." });
    }

    const newGoal = new Goal({
      user: userId,
      type,
      goal,
      currentProgress: currentProgress || 0,
      dueDate,
      achieved: false
    });

    await newGoal.save();
    res.status(201).json({ message: 'Goal created successfully', goal: newGoal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create goal', error: err.message });
  }
};

// ✅ Get all goals by user
const getGoalsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await Goal.find({ user: userId }).sort({ dueDate: 1 });
    res.status(200).json(goals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch goals', error: err.message });
  }
};

// ✅ Update goal
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { type, goal, currentProgress, dueDate, achieved } = req.body;

    const goalDoc = await Goal.findOne({ _id: id, user: userId });

    if (!goalDoc) {
      return res.status(404).json({ message: 'Goal not found or not authorized' });
    }

    if (type) goalDoc.type = type;
    if (goal) goalDoc.goal = goal;
    if (dueDate) goalDoc.dueDate = dueDate;
    if (typeof currentProgress === 'number') goalDoc.currentProgress = currentProgress;
    if (typeof achieved === 'boolean') goalDoc.achieved = achieved;

    await goalDoc.save();
    res.status(200).json({ message: 'Goal updated successfully', goal: goalDoc });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update goal', error: err.message });
  }
};

// ✅ Delete goal
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedGoal = await Goal.findOneAndDelete({ _id: id, user: userId });

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found or not authorized' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete goal', error: err.message });
  }
};

module.exports = {
  setGoal,
  getGoalsByUser,
  updateGoal,
  deleteGoal
};

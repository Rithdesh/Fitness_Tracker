const Meal = require('../Models/MealModel');


const addMeal = async (req, res) => {
  try {
    const { name, calories, protein, carbs, fats, date } = req.body;
    const userId = req.user.id;

    if (!name || !calories || !date) {
      return res.status(400).json({ message: 'Meal name, calories, and date are required.' });
    }

    const newMeal = new Meal({
      name,
      calories,
      protein,
      carbs,
      fats,
      date,
      user: userId
    });

    await newMeal.save();

    res.status(201).json({ message: 'Meal added successfully', meal: newMeal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add meal', error: err.message });
  }
};

// ✅ Get all meals for a user
const getMealsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const meals = await Meal.find({ user: userId }).sort({ date: -1 });

    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch meals', error: err.message });
  }
};

// ✅ Update a meal
const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const updatedMeal = await Meal.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true }
    );

    if (!updatedMeal) {
      return res.status(404).json({ message: 'Meal not found or not authorized' });
    }

    res.status(200).json({ message: 'Meal updated successfully', meal: updatedMeal });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update meal', error: err.message });
  }
};

// ✅ Delete a meal
const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedMeal = await Meal.findOneAndDelete({ _id: id, user: userId });

    if (!deletedMeal) {
      return res.status(404).json({ message: 'Meal not found or not authorized' });
    }

    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete meal', error: err.message });
  }
};

// ✅ Get total calories for a specific date
const getDailyCalorieTotal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date query is required (YYYY-MM-DD)' });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      user: userId,
      date: { $gte: start, $lte: end }
    });

    const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);

    res.status(200).json({ date, totalCalories, mealCount: meals.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to calculate daily calories', error: err.message });
  }
};

module.exports = {
  addMeal,
  getMealsByUser,
  updateMeal,
  deleteMeal,
  getDailyCalorieTotal
};

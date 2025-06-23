const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//routes
const UserRoutes = require('./Routes/UserRoutes');
const WorkoutRoutes = require('./Routes/WorkoutRoutes');
const GoalRoutes = require('./Routes/goalRoutes');
const MealRoutes = require('./Routes/mealRoutes');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

//cors
const allowedOrigins = [
  "http://localhost:3000",
  "https://service-connect-rithdeshs-projects.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully");
    console.log("📂 Using DB:", mongoose.connection.name);
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.use('/User', UserRoutes);
app.use('/Workout', WorkoutRoutes);
app.use('/Goal', GoalRoutes);
app.use('/Meal', MealRoutes);
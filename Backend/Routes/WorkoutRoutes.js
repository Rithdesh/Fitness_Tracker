const express = require('express');
const router = express.Router();
const { 
  createWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout 
} = require('../Controllers/workoutController');
const  {authenticateJWT}= require('../Middleware/AuthMiddleware');

router.use(authenticateJWT); // Apply to all routes

router.post('/createworkout', createWorkout);
router.get('/allworkouts', getWorkouts);
router.get('/getworkout/:id', getWorkoutById);
router.put('/updateworkout/:id', updateWorkout);
router.delete('/deleteworkout/:id', deleteWorkout);

module.exports = router;

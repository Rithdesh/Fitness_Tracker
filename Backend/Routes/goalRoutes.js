const express = require('express');
const router = express.Router();
const {authenticateJWT} = require('../Middleware/AuthMiddleware')
const {
  setGoal,
  getGoalsByUser,
  updateGoal,
  deleteGoal
} = require('../Controllers/goalController');

router.use(authenticateJWT);



router.post('/creategoal', setGoal);
router.get('/getgoal', getGoalsByUser);
router.put('/updategoal/:id', updateGoal);
router.delete('/deletegoal/:id', deleteGoal);

module.exports = router;

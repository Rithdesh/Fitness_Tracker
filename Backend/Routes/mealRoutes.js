const express = require("express");
const router = express.Router();

const{
    addMeal,
    getMealsByUser,
    updateMeal,
    deleteMeal
}=require('../Controllers/mealController');

const { authenticateJWT } = require('../Middleware/AuthMiddleware');

router.use(authenticateJWT); // Apply to all routes
router.post('/addmeal', addMeal);
router.get('/allmeals', getMealsByUser);    
router.put('/updatemeal/:id', updateMeal);
router.delete('/deletemeal/:id', deleteMeal);

module.exports = router;
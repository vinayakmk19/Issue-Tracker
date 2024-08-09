const express = require('express');
const projectController = require('../controllers/projectController');

// Create a new router instance
const router = express.Router();

// Route for adding a project
router.post('/addProject', projectController.addProject);
// Route for deleting a project
router.get('/deleteProject', projectController.deleteProject);

module.exports = router;

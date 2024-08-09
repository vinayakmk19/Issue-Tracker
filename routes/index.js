const express = require('express');
const issueRouter = require('./issueRoutes');
const projectRouter = require('./projectRoutes');
const homeController = require('../controllers/homeController');

// Create a new router instance
const router = express.Router();

router.get('/', homeController.home);

// Mount the issueRouter under the '/issues' path
router.use('/issues', issueRouter);
// Mount the projectRouter under the '/projects' path
router.use('/projects', projectRouter);

module.exports = router;

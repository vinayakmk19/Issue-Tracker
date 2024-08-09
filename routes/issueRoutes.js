const express = require('express');
const issueController = require('../controllers/issueController');

// Create a new router instance
const router = express.Router();

// Route to get all project issues
router.get('/projectIssues', issueController.projectIssues);

// Route to add a new issue
router.post('/addIssue', issueController.addIssue);
// Route to search for issues
router.post('/searchIssues', issueController.searchIssues);
// Route to filter issues
router.post('/filterIssues', issueController.filterIssues);
// Route to delete an issue
router.get('/deleteIssue', issueController.deleteIssue);

module.exports = router;

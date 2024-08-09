const Project = require('../models/projectModel');

// Home controller to display projects
exports.home = async (req, res) => {
  try {
    // Retrieve all projects from database
    const projects = await Project.find();

    // Render the 'home' template with the title and projects
    res.render('home', {
      title: 'IssueTracker | Home',
      projects,
    });
  } catch (error) {
    console.log('error retrieving projects', error);
  }
};

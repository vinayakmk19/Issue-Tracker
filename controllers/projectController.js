const Project = require('../models/projectModel');
const Issue = require('../models/issueModel');

// controller for adding the project through form submission
exports.addProject = async (req, res) => {
  try {
    const { name, description, author } = req.body;

    await Project.create({
      projectName: name,
      projectDescription: description,
      projectAuthor: author,
    });

    res.redirect('back');
  } catch (error) {
    console.log('error while adding project', error);
    res.redirect('back');
  }
};

// controller for deleting the project from database
exports.deleteProject = async (req, res) => {
  try {
    const projectId = req.query.project_id;

    // Find the project with the given ID and populate its 'issues' field with the corresponding issues.
    const project = await Project.findById(projectId).populate('issues');

    // Extract the IDs of all the issues associated with the project.
    const issueIds = project.issues.map((issue) => issue._id);
    // Delete all the issues with the extracted IDs.
    await Issue.deleteMany({ _id: { $in: issueIds } });
    // Delete the project with the given ID.
    await Project.findByIdAndDelete(projectId);

    res.redirect('back');
  } catch (error) {
    console.log('error deleting project', error);
    res.redirect('back');
  }
};

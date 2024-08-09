const Project = require('../models/projectModel');
const Issue = require('../models/issueModel');

// function for getting unique authors name to show in the filter form
const getAuthors = async (projectId) => {
  try {
    // Find the project by its ID and populate the 'issues' field
    const globalProject = await Project.findById(projectId).populate({
      path: 'issues',
    });

    // Create a new Set to store unique author names
    const authorSet = new Set(
      globalProject.issues.map((issue) => issue.issueAuthor),
    );

    // Convert the Set to an array of author names
    const authorNames = Array.from(authorSet);

    return authorNames;
  } catch (error) {
    console.log('error in getting authors', error);
  }
};

// controller for showing project issues on issue page
exports.projectIssues = async (req, res) => {
  try {
    // Find the project by its ID and populate the 'issues' field with the issues associated with the project.
    const project = await Project.findById(req.query.project_id).populate(
      'issues',
    );

    // Create a Set to store unique authors of the project's issues.
    const authorSet = new Set(project.issues.map((issue) => issue.issueAuthor));

    // Convert the Set to an array of author names.
    const authorNames = Array.from(authorSet);

    res.render('issue', {
      title: 'IssueTracker | ProjectIssue',
      project,
      authorNames,
    });
  } catch (error) {
    console.log('error showing project issues', error);
  }
};

// controller for adding the issue to the database
exports.addIssue = async (req, res) => {
  try {
    const { name, author, description, lables } = req.body;

    // Creating a new issue in the database with the extracted data
    const issue = await Issue.create({
      issueName: name,
      issueAuthor: author,
      issueDescription: description,
      issueLabels: lables,
    });

    const project = await Project.findById(req.query.project_id);

    // Adding the newly created issue to the issues array of the project
    project.issues.push(issue);
    await project.save();

    // Redirecting the user to the page displaying the issues of project
    res.redirect(`/issues/projectIssues?project_id=${req.query.project_id}`);
  } catch (error) {
    console.log('error in adding issue', error);
  }
};

// controller for searching the issue based on issue title or issue description
exports.searchIssues = async (req, res) => {
  try {
    const searchText = req.body.search__text;

    // Find the project by its ID and populate the 'issues' field
    const project = await Project.findById(req.query.project_id).populate({
      path: 'issues',
      match: {
        $or: [{ issueName: searchText }, { issueDescription: searchText }],
      },
    });

    // Get the names of the authors for the project
    const authorNames = await getAuthors(req.query.project_id);

    res.render('issue', {
      title: 'IssueTracker | ProjectIssue',
      project,
      authorNames,
    });
  } catch (error) {
    console.log('error in searching issue', error);
  }
};

// controller for filtering the issues based on labels
exports.filterIssues = async (req, res) => {
  try {
    const project = await Project.findById(req.query.project_id).populate({
      path: 'issues',
      match: {
        // Filter the issues based on the following conditions:
        $or: [
          // Filter by issue labels: check if any of the labels in 'req.body.f_lables' array is present in the 'issueLabels' field of the issue
          { issueLabels: { $in: req.body.f_lables } },
          // Filter by issue authors: check if any of the authors in the 'req.body.authors' array is present in the 'issueAuthor' field of the issue
          { issueAuthor: { $in: req.body.authors } },
        ],
      },
    });

    const authorNames = await getAuthors(req.query.project_id);

    res.render('issue', {
      title: 'IssueTracker | ProjectIssue',
      project,
      authorNames,
    });
  } catch (error) {
    console.log('error in filtering issue', error);
  }
};

// controller for deleting the issue from database
exports.deleteIssue = async (req, res) => {
  try {
    const projectId = req.query.project_id;
    const issueId = req.query.issue_id;

    // Update the project by removing the issue from the "issues" array
    await Project.findByIdAndUpdate(projectId, {
      $pull: { issues: issueId },
    });

    // Delete the issue from the "Issue" collection based on its ID
    await Issue.deleteOne({ _id: issueId });

    // Redirect the user to the project issues page, passing the project ID as a query parameter
    res.redirect(`/issues/projectIssues?project_id=${projectId}`);
  } catch (error) {
    console.log('error deleting issue', error);
  }
};

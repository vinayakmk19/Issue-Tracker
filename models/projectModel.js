const mongoose = require('mongoose');

// Define the schema for the project model
const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    projectAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);

// Create the Project model using the schema
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

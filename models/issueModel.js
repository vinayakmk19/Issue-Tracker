const mongoose = require('mongoose');

// Define the schema for the issue model
const issueSchema = new mongoose.Schema(
  {
    issueName: {
      type: String,
      required: true,
      trim: true,
    },
    issueDescription: {
      type: String,
      required: true,
      trim: true,
    },
    issueLabels: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    issueAuthor: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);

// Create the Issue model using the schema
const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

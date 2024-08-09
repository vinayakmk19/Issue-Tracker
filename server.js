const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(
    'Uncaught Exception! 💥 Shutting down...\n',
    err.name,
    err.message,
  );
  process.exit(1);
});

// Load environment variables from config.env file
dotenv.config({ path: './config.env' });

// Import the Express app
const app = require('./app');

// Replace password in DATABASE connection string
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

// Set the port to listen on
const port = process.env.PORT || 3000;

// Create the server
const server = http.createServer(app);

// Connect to the database and start the server
const connectAndStartServer = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Database connection successful');
  } catch (err) {
    return console.error(err.name, err.message, '\nExiting...💥');
  }

  server.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
};

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error(
    'Unhandled Rejection! 💥 Shutting down...\n',
    err.name,
    err.message,
  );
  server.close(() => process.exit(1));
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated 💥');
  });
});

// Connect to the database and start the server
connectAndStartServer();

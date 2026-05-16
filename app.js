const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Main route
app.get("/", (req, res) => {
  res.json({ message: "Hello World! 6799" });
});

// Health check route (useful for CI pipelines)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("READY"); // CI script can watch for this line
});

// Graceful shutdown on SIGTERM (e.g. Docker, cloud platforms)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

// Graceful shutdown on SIGINT (e.g. Ctrl+C)
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

module.exports = app;
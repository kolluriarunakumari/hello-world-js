const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// FIX 1: Only one res.json() per request
app.get("/", (req, res) => {
  res.json({ message: "Hello World! 6799" });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// FIX 2: Graceful shutdown so CI pipeline can exit cleanly
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

module.exports = app;
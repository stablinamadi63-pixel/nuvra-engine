const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Nuvra backend is running 🚀");
});

// Build endpoint
app.post("/build", (req, res) => {
  const { prompt, userId } = req.body;

  if (!prompt) {
    return res.status(400).json({
      error: "Prompt is required",
    });
  }

  const appData = {
    id: Date.now(),
    prompt,
    owner: userId || "unknown",
    status: "built",
  };

  res.json({
    success: true,
    app: appData,
  });
});

// IMPORTANT: Use Railway port
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

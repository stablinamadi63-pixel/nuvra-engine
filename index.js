const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nuvra backend is running 🚀");
});

app.post("/build", (req, res) => {
  const { prompt, userId } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  res.json({
    success: true,
    app: {
      id: Date.now(),
      prompt,
      owner: userId || "unknown",
      status: "built",
    },
  });
});

// ✅ safest version for Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

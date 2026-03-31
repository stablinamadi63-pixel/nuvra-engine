const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Nuvra backend is running 🚀");
});

// 🚀 BUILD ENDPOINT (THIS IS THE ENGINE START)
app.post("/build", async (req, res) => {
  try {
    const { prompt, userId } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt is required"
      });
    }

    // 🔥 Simulate AI build (we’ll upgrade this later)
    const generatedApp = {
      id: Date.now(),
      name: "Generated App",
      prompt,
      owner: userId || "unknown",
      status: "built",
      previewUrl: `https://nuvrahq.com/preview/${Date.now()}`
    };

    return res.json({
      success: true,
      app: generatedApp
    });

  } catch (error) {
    return res.status(500).json({
      error: "Build failed"
    });
  }
});

// 🚀 PROJECT LIST
app.get("/projects", (req, res) => {
  res.json({
    projects: []
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

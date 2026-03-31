const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Nuvra backend is running 🚀");
});

app.post("/build-preview", (req, res) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" });
  }

  res.json({
    previewUrl: `https://${projectId}.nuvrahq.com`
  });
});

// ✅ This is the critical Railway fix
const PORT = process.env.PORT || 8080;   // Railway always gives you PORT

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

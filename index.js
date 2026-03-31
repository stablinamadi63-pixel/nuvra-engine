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

  res.json({
    previewUrl: `https://${projectId}.nuvrahq.com`
  });
});

// ✅ Railway-safe port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

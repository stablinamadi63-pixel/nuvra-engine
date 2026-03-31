import express from "express";
import cors from "cors";

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

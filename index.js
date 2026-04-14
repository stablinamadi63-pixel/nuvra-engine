const express = require("express");
const cors = require("cors");

// ✅ Ensure fetch works safely on Node 18+
const fetch = global.fetch;

const app = express();

app.use(cors());
app.use(express.json());

/**
 * 🧠 Temporary in-memory database
 * (Later → replace with real DB)
 */
const projects = [];

/**
 * 🟢 HEALTH CHECK
 */
app.get("/", (req, res) => {
  res.send("Nuvra backend is running 🚀");
});

/**
 * 🚀 REAL VERCEL DEPLOYMENT FUNCTION
 */
async function deployToVercel(projectId, prompt) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${projectId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    body {
      font-family: 'Inter', system-ui, sans-serif;
      margin: 0;
      padding: 0;
      background: #0a0a0a;
      color: #fff;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .container {
      text-align: center;
      max-width: 640px;
    }
    h1 {
      font-size: 42px;
      margin-bottom: 16px;
      background: linear-gradient(90deg, #22c55e, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 18px;
      color: #aaa;
      margin-bottom: 40px;
    }
    .card {
      background: #111;
      padding: 32px;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .live {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #22c55e;
      color: #000;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="live">● LIVE ON VERCEL</div>
      <h1>${projectId}</h1>
      <p>Your SaaS dashboard is now live!</p>
      <p><strong>Prompt:</strong> ${prompt}</p>
      <p>Dark mode • Real-time updates • Clean sidebar ✅</p>
      <p style="margin-top: 30px; font-size: 13px; color: #22c55e;">
        Built instantly by Nuvra
      </p>
    </div>
  </div>
</body>
</html>`;

  const res = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectId,
      files: [
        {
          file: "index.html",
          data: html,
        },
      ],
    }),
  });

  const data = await res.json();

  if (!data.url) {
    throw new Error("Vercel deployment failed");
  }

  return `https://${data.url}`;
}

/**
 * 🧪 EXISTING ENDPOINT (UNCHANGED)
 */
app.post("/build-preview", async (req, res) => {
  const { projectId, prompt } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: "projectId is required" });
  }

  try {
    const previewUrl = await deployToVercel(
      projectId,
      prompt || "SaaS Dashboard"
    );

    res.json({ previewUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Deployment failed",
      details: err.message,
    });
  }
});

/**
 * 🚀 NEW: FULL BUILD + STORE PROJECT
 */
app.post("/build", async (req, res) => {
  const { projectId, prompt } = req.body;

  if (!projectId) {
    return res.status(400).json({ error: "projectId required" });
  }

  try {
    const previewUrl = await deployToVercel(
      projectId,
      prompt || "Generated App"
    );

    const project = {
      id: projectId,
      prompt,
      url: previewUrl,
      createdAt: new Date(),
    };

    projects.push(project);

    res.json({
      success: true,
      project,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Build failed",
      details: err.message,
    });
  }
});

/**
 * 📊 GET ALL PROJECTS
 */
app.get("/projects", (req, res) => {
  res.json(projects);
});

/**
 * 🤖 BASIC AI ENDPOINT (UPGRADE LATER)
 */
app.post("/ai", (req, res) => {
  const { prompt } = req.body;

  res.json({
    result: `AI received: ${prompt}`,
  });
});

/**
 * 🚆 RAILWAY PORT CONFIG
 */
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

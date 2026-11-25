
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Sample job data
const jobs = [
  {
    id: 1,
    title: "Python Developer",
    company: "Tech Solutions",
    skills: ["Python", "SQL", "Git"]
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Web Works",
    skills: ["React", "JavaScript", "CSS"]
  },
  {
    id: 3,
    title: "Machine Learning Intern",
    company: "AI Labs",
    skills: ["Python", "Machine Learning", "SQL"]
  }
];

// Test the backend
app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Matcher backend is running!"
  });
});

// Get all jobs
app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

// Register a demo user
app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      message: "Please fill in all required fields."
    });
  }

  res.status(201).json({
    message: "Demo registration successful",
    user: { name, email, role: "jobseeker" }
  });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

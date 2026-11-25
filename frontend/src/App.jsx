import { useState } from "react";
import { matchJobs } from "./api";
import Login from "./Login";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("Python, SQL");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findJobs() {
    setLoading(true);
    setError("");
    setJobs([]);

    try {
      const skillList = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const results = await matchJobs(skillList);
      setJobs(results);
    } catch (err) {
      setError(
        "Could not connect to the AI service. Please check that it is running."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadResume() {
    window.print();
  }
  if (!isLoggedIn) {
  return <Login onLogin={() => setIsLoggedIn(true)} />;
}

  return (
    <main className="container">
      <header className="header">
        <div className="brand">CareerCraft AI</div>
        <p>Build your resume. Discover your opportunities.</p>
      </header>

      <section className="card">
        <h1>Build Your Resume</h1>
        <p>Enter your details to create a simple resume preview.</p>

        <label>Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label>Education</label>
        <input
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="e.g. B.Tech Computer Science"
        />

        <label>Skills (separate with commas)</label>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, SQL, React"
          rows="3"
        />

        <button onClick={downloadResume}>Print / Save Resume as PDF</button>
      </section>

      <section className="card resume">
        <h2>Resume Preview</h2>
        <h3>{name || "Your Name"}</h3>
        <p>{email || "Your email address"}</p>
        <hr />
        <h3>Education</h3>
        <p>{education || "Your education details"}</p>
        <h3>Skills</h3>
        <p>{skills || "Your skills"}</p>
      </section>

      <section className="card">
        <h2>AI Job Matcher</h2>
        <p>Find jobs that match your skills.</p>

        <button onClick={findJobs} disabled={loading}>
          {loading ? "Finding Matches..." : "Find Matching Jobs"}
        </button>

        {error && <p className="error">{error}</p>}

        {jobs.map((job) => (
          <article className="job" key={job.id}>
            <h3>{job.title}</h3>
            <p>Match Score: {job.matchScore}%</p>
            <p>
              Matching skills:{" "}
              {job.matchedSkills.length
                ? job.matchedSkills.join(", ")
                : "No matching skills yet"}
            </p>
            <p>Required skills: {job.requiredSkills.join(", ")}</p>
          </article>
        ))}
      </section>

      <footer>CareerCraft AI · Resume Builder & Job Matcher</footer>
    </main>
  );
}

export default App;

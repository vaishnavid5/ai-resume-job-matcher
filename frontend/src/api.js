const BACKEND_URL = "http://localhost:5000";
const AI_URL = "http://localhost:5001";

export async function checkBackend() {
  const response = await fetch(BACKEND_URL);
  return response.json();
}

export async function matchJobs(skills) {
  const response = await fetch(`${AI_URL}/match`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ skills })
  });

  if (!response.ok) {
    throw new Error("Job matching failed");
  }

  return response.json();
}

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/")
def home():
    return jsonify({
        "message": "Python AI API is running!"
    })


@app.post("/match")
def match_jobs():
    data = request.get_json(silent=True) or {}
    user_skills = data.get("skills", [])

    if not isinstance(user_skills, list):
        return jsonify({"error": "Skills must be a list"}), 400

    user_skills = {
        skill.strip().lower()
        for skill in user_skills
        if isinstance(skill, str) and skill.strip()
    }

    jobs = [
        {"id": 1, "title": "Python Developer",
         "skills": ["Python", "SQL", "Git"]},
        {"id": 2, "title": "Frontend Developer",
         "skills": ["React", "JavaScript", "CSS"]},
        {"id": 3, "title": "Machine Learning Intern",
         "skills": ["Python", "Machine Learning", "SQL"]}
    ]

    results = []

    for job in jobs:
        required = {skill.lower() for skill in job["skills"]}
        matched = user_skills.intersection(required)
        score = round(len(matched) / len(required) * 100)

        results.append({
            "id": job["id"],
            "title": job["title"],
            "requiredSkills": job["skills"],
            "matchedSkills": sorted(matched),
            "matchScore": score
        })

    results.sort(
        key=lambda item: item["matchScore"],
        reverse=True
    )

    return jsonify(results)


if __name__ == "__main__":
    app.run(port=5001, debug=True)

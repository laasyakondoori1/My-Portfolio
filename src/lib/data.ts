import type { Project } from "@/components/ProjectCard";

export const personalInfo = {
  name: "Kondoori Laasya Priya",
  title: "AI & Full-Stack Developer",
  role: "STUDENT",
  email: "laasyakondoori@gmail.com",
  phone: "+917981173765",
  location: "Hyderabad, Telangana",
  coords: "17.3850° N, 78.4867° E",
  timezone: "GMT+5:30",
  university: "Anurag University",
  degree: "B.Tech in Artificial Intelligence",
  eduYears: "2024 — 2028",
  bio: "An aspiring software engineer pursuing a B.Tech in Artificial Intelligence, equipped with strong programming fundamentals and hands-on experience developing AI-based solutions. Passionate about building impactful technology products that solve real-world problems.",
  tagline:
    "Building intelligent systems at the intersection of AI, machine learning, and full-stack development.",
};

export const skills = {
  "Programming & Core CS": ["Python", "Java", "C"],
  "AI / ML & GenAI": [
    "Prompt Engineering",
    "N8N",
    "TensorFlow",
    "Scikit-learn",
    "NLP",
    "ML",
    "Deep Learning",
  ],
  "Data & Analytics": ["Data Warehousing", "Pandas", "NumPy", "Matplotlib"],
  Tools: ["Git", "OpenCV", "CI/CD", "Big Data"],
};

export const projects: Project[] = [
  {
    title: "SwarmX",
    description:
      "Interactive AI system simulating digital micro-swarms controlled through real-time hand gestures and spatial interaction.",
    tech: ["CV", "MediaPipe", "Three.js", "Gesture Recognition", "Python"],
    year: "2024 — 2025",
    scope: "Real-time gesture tracking, swarm simulation, spatial computing interface",
  },
  {
    title: "Mudraverse",
    description:
      "AI-based system translating classical dance mudras into digital representations, exploring real-time interaction between performing arts and AI.",
    tech: ["Pose Estimation", "OpenCV", "MediaPipe", "AR/VR", "Python"],
    year: "2024 — 2025",
    scope: "Mudra recognition, pose estimation pipeline, AR overlay, cultural-tech fusion",
  },
  {
    title: "Janmitra",
    description:
      "Offline, voice-first AI system designed for grievance assistance and civic guidance in low-connectivity regions.",
    tech: ["Python", "NLP", "JavaScript", "FAISS"],
    year: "2025 — 2026",
    scope: "Voice interface, offline NLP, vector search, civic grievance resolution",
  },
  {
    title: "AnomalyDetector",
    description:
      "Anomaly detection pipeline to identify suspicious financial transactions using statistical pattern analysis.",
    tech: ["Python", "Apache Kafka", "AWS", "Scikit-learn", "Pandas"],
    year: "2025",
    scope: "Real-time streaming, fraud detection, statistical anomaly analysis",
  },
];

export const achievements = [
  {
    title: "Runner-Up",
    event: "AUNSF 3.0 National Student Forum Hackathon",
    color: "primary",
  },
  {
    title: "2nd Runner-Up",
    event: "Inceptia Ideathon",
    color: "chart-4",
  },
  {
    title: "Finalist",
    event: "AgentX AI Hackathon (in collaboration with Salesforce)",
    color: "chart-2",
  },
  {
    title: "Qualified",
    event: "SIH (Smart India Hackathon) — College-Level Screening",
    color: "chart-1",
  },
];

export const activities = [
  "IEEE CIS Student Chapter — Member",
  "Leo Club International — Member",
  "NSS — Volunteer",
  "Club Enigma — Organizing Team",
  "Kriya Event Management — Member",
  "Independent Artist & Entrepreneur",
  "SPECDAM — Classical Team Coordinator",
];

export const roles = ["STUDENT", "AI DEVELOPER", "ARTIST", "BUILDER"];

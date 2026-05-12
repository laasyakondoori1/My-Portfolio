# Portfolio Website for Kondoori Laasya Priya

A dark-themed developer portfolio inspired by the reference site's design language — dark background (#0a0a0a), cyan/teal accents, floating tech icons, smooth animations, and a modern developer aesthetic — fully customized with your details.

## Pages & Sections

### 1. Home Page (`/`)

- **Navbar**: "laasyapriya.dev" branding, links to Projects, Credentials, About, dark mode toggle
- **Hero Section**: Floating tech icons (Python, TensorFlow, Java, OpenCV, NLP, Git, etc.) orbiting around your name
  - "Hello! I'm" intro text
  - **Kondoori Laasya Priya** in large display font
  - "A passionate AI & Full-Stack Developer"
  - "STUDENT" rotating keyword badge
  - Tagline: "Building intelligent systems at the intersection of AI and real-world problem solving"
  - CTA buttons: Resume & CV, Contact
- **Featured Projects** (3 cards): SwarmX, Mudraverse, Janmitra
- **About Me Preview**: Location card (Hyderabad, India — 17.3850°N, 78.4867°E, GMT+5:30), brief bio, traits (Growth, Focus, Craft)
- **Experience Section**: Education at Anurag University (B.Tech AI, 2024-2028)
- **Reach Out / Contact**: Workflow visualization + contact links (email, LinkedIn, GitHub)

### 2. Projects Page (`/projects`)

- Grid of project cards with hover effects, each showing title, description, tech tags, and scope/tech toggles
- **SwarmX** — Gesture-Controlled Digital Swarm System (CV, MediaPipe, Three.js, Python)
- **Mudraverse** — AI-Driven Dance Interpretation System (Pose Estimation, OpenCV, MediaPipe, AR/VR, Python)
- **Janmitra** — Voice-First Civic Assistant (Python, NLP, JavaScript, FAISS)
- **AnomalyDetector** — Fintech Fraud Monitoring (Python, Apache Kafka, AWS, Scikit-learn, Pandas)

### 3. Credentials Page (`/credentials`)

- Timeline of achievements with colored dots and tags
- **Achievements**: Runner-Up AUNSF 3.0, 2nd Runner-Up Inceptia Ideathon, Finalist AgentX AI Hackathon (Salesforce), SIH Qualifier
- **Leadership**: IEEE CIS, Leo Club, NSS, Club Enigma, Kriya Event Management, SPECDAM Classical Team Coordinator

### 4. About / Persona Page (`/about`)

- Full bio, education details (Anurag University, B.Tech AI)
- Stats cards: Projects Built (4+), activities/clubs, etc.
- Skills grid organized by category (Programming, AI/ML, Data, Tools)
- Social links: LinkedIn, GitHub, Email
- Location: Hyderabad, Telangana

## Design Details

- **Dark theme**: Near-black background with subtle particle/dot effects
- **Accent color**: Cyan/teal (#00e5ff style) for links, highlights, and active states
- **Typography**: Monospace for labels/tags, clean sans-serif for body
- **Animations**: Framer Motion for page transitions, hover effects on cards, floating icon orbits on hero
- **Responsive**: Mobile-first with hamburger nav

## Technical Implementation

- 5 route files: `index.tsx`, `projects.tsx`, `credentials.tsx`, `about.tsx`
- Shared components: `Header.tsx`, `Footer.tsx`, `ProjectCard.tsx`, `TimelineItem.tsx`, `FloatingIcons.tsx`
- Framer Motion for animations (`bun add framer-motion`)
- Lucide React icons + custom SVG tech icons
- Each route gets unique `head()` metadata for SEO

# 🚀 Prem Sai Chithaluri — Modern Software Engineer Portfolio

A sleek, responsive, and performance-optimized developer portfolio crafted specifically for **Prem Sai Chithaluri** — Computer Science Graduate (B.Tech), Python Developer, Django Specialist, and Full Stack Web Engineer.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Highlights & Features

1. **Cyber-Luxe & Clean Aesthetic**:
   - Modern dark/light mode toggle with persistent state in `localStorage`.
   - Subtle interactive mesh/particle canvas in the hero section reacting to cursor movement.
   - Glassmorphism UI components (`backdrop-blur-md`), ambient glowing gradients, and custom scrollbar.
2. **Interactive Developer CLI ("Prem's CLI")**:
   - A real-time terminal emulator with interactive command execution (`about`, `skills`, `projects`, `experience`, `education`, `contact`, `resume`, `clear`).
   - One-click command chips for rapid mobile and desktop exploration.
3. **Showcase of Real-World Projects**:
   - **Blockchain-Based Forensic Evidence Management System** (Flagship capstone project with SHA-256 immutability and 3-tier RBAC for Admin, Police, and Forensics).
   - **Real-Time Collaborative Document Editor** (Multi-user sync engine built during internship).
   - **Real-Time Chat Application** (Synchronous messaging application).
   - **Dynamic Weather Report Application** (REST API telemetry and dynamic atmospheric styling).
   - Interactive modal popups displaying deep architecture breakdowns and deliverables.
4. **Interactive Skill Matrix**:
   - Categorized by Programming Languages, Web & Backend, Databases, Tools & DevOps, System Security, and Professional Strengths with proficiency meters.
5. **Academics & Certifications**:
   - B.Tech in CSE (Malla Reddy College of Engineering - CGPA 7.7)
   - Intermediate MPC (Narayana Junior College - 95.0%)
   - SSC (Sri Chaitanya Techno School - CGPA 10/10)
   - Infosys Springboard AI Credential & TCS iON Career Edge.
6. **Printable ATS Resume Viewer**:
   - Integrated resume modal + standalone `resume.html` with automated `@media print` styling for 1-click PDF download.
7. **Direct Outreach & Connectivity**:
   - Direct copy-to-clipboard buttons for Email and Phone with instant visual toast notifications.
   - Pre-formatted mailto inquiry form.

---

## 📂 Project Structure

```text
prem-sai-portfolio/
│
├── index.html        # Main single-page portfolio application
├── style.css         # Custom design tokens, glassmorphism, animations, theme variables
├── script.js        # Interactive CLI, canvas particles, typing effect, modal handlers, filters
├── resume.html       # Standalone ATS-friendly printable resume with Print-to-PDF
└── README.md         # Deployment & customization documentation
```

---

## ⚡ How to Run Locally

You don't need any complex dependencies or `npm install`. It is 100% vanilla HTML5/CSS3/JS with Tailwind & Lucide CDN.

### Option 1: Double-click to open
Simply double-click `index.html` in Windows File Explorer to open it directly in Google Chrome, Microsoft Edge, or any modern browser.

### Option 2: Run with Python's Built-in Server
Open PowerShell in this folder and run:
```powershell
python -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 🌐 How to Deploy for Free

### Method A: Deploy to GitHub Pages (Recommended)
Because Prem Sai's GitHub username is **`Premsai19`**, you can deploy this portfolio to **`https://premsai19.github.io`** in just 3 steps:

1. Create a new repository on your GitHub account named:
   ```text
   premsai19.github.io
   ```
2. Push this folder's code to the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: launch modern portfolio website"
   git branch -M main
   git remote add origin https://github.com/Premsai19/premsai19.github.io.git
   git push -u origin main
   ```
3. Your site will automatically go live at **`https://premsai19.github.io`** within 60 seconds!

### Method B: Deploy to Netlify / Vercel
1. Go to [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Drag and drop the `prem-sai-portfolio` folder directly into the Netlify dashboard.
3. Your custom URL is live immediately with HTTPS!

---

## 🛠️ Personalization & Customization

- **Contact Form Backend**:
  The form is pre-configured with a direct `mailto:` fallback. To receive emails directly in your inbox without opening an email client, connect a free [Formspree](https://formspree.io) endpoint by updating the form's `action` attribute in `index.html`.
- **Add New Projects**:
  Duplicate any project card in `index.html` and add its corresponding data entry in `projectDetails` inside `script.js`.

---

© 2026 Prem Sai Chithaluri. Built for engineering excellence.

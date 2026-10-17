/**
 * Prem Sai Chithaluri - Interactive Portfolio JavaScript
 * Features: Dynamic Typing, Interactive Terminal, Mesh Canvas, Project Filters,
 * Modals, Copy Toast, Theme Switcher, Mobile Navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initHeroCanvas();
  initTerminal();
  initProjectFilters();
  initModals();
  initCopyButtons();
  initContactForm();
  initMobileNav();
  initScrollSpy();
  lucide.createIcons();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('prem_portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('prem_portfolio_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const iconContainer = document.getElementById('theme-icon-container');
  if (!iconContainer) return;

  if (theme === 'dark') {
    iconContainer.innerHTML = '<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>';
  } else {
    iconContainer.innerHTML = '<i data-lucide="moon" class="w-5 h-5 text-indigo-600"></i>';
  }
  lucide.createIcons();
}

/* ==========================================================================
   2. Dynamic Hero Typing Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('dynamic-typing-text');
  if (!typingElement) return;

  const roles = [
    'Python & Django Developer',
    'Software Engineer',
    'Full Stack Web Developer',
    'B.Tech CSE Graduate',
    'Blockchain & Real-Time Systems Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, pauseDuration);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
  }

  type();
}

/* ==========================================================================
   3. Subtle Hero Particle Mesh Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 22), 45);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 1,
    });
  }

  let mouse = { x: null, y: null };
  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.fill();

      // Connect to mouse
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.4 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect to neighboring particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. Interactive Terminal ("Prem's CLI")
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const chipButtons = document.querySelectorAll('.terminal-chip');
  if (!terminalInput || !terminalOutput) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: `
<span class="text-sky-400 font-semibold">Available Commands:</span>
  • <span class="text-amber-400">about</span>      - Quick bio and career objective
  • <span class="text-amber-400">skills</span>     - Technical competencies & frameworks
  • <span class="text-amber-400">projects</span>   - Flagship projects overview
  • <span class="text-amber-400">experience</span> - Internship at CODTECH IT Solutions
  • <span class="text-amber-400">education</span>  - B.Tech CSE, Intermediate, Schooling
  • <span class="text-amber-400">contact</span>    - Email, phone, socials
  • <span class="text-amber-400">resume</span>     - Open resume viewer & download
  • <span class="text-amber-400">hire</span>       - Jump straight to contact form
  • <span class="text-amber-400">clear</span>      - Clear terminal screen
`,
    about: `
<span class="text-emerald-400 font-semibold">👤 Prem Sai Chithaluri</span>
Computer Science Graduate (B.Tech) passionate about Software Engineering & Python Development.
Built secure blockchain-backed evidence systems, real-time sync engines, and REST APIs.
<span class="text-sky-300">Target Role:</span> Software Engineer / Python Developer / Full Stack Web Developer.
<span class="text-sky-300">Status:</span> 🟢 Graduated • Actively interviewing for immediate full-time software engineering roles.
`,
    skills: `
<span class="text-sky-400 font-semibold">🛠️ Technical Skill Matrix:</span>
  • <span class="text-slate-300">Languages:</span>      Python, Java, SQL, JavaScript (ES6+)
  • <span class="text-slate-300">Web & Backend:</span>  Django, REST APIs, HTML5, CSS3, WebSockets
  • <span class="text-slate-300">Databases:</span>      MySQL (schema design, complex queries, joins)
  • <span class="text-slate-300">Tools:</span>          Git, GitHub, VS Code, Linux basics, Debugging
  • <span class="text-slate-300">Core Concepts:</span>  RBAC, Blockchain Immutability, Real-Time Sync, MVC/MVT
`,
    projects: `
<span class="text-indigo-400 font-semibold">🚀 Highlight Projects:</span>
  1. <span class="text-white font-medium">Blockchain Forensic Evidence Management System</span>
     [Django, Python, MySQL, Blockchain]
     Tamper-proof chain-of-custody tracking with 3-tier Role-Based Access (Admin/Police/Forensics).
  2. <span class="text-white font-medium">Real-Time Collaborative Document Editor</span>
     [JavaScript, Real-Time Sync, CSS3]
     Multi-user synchronized text editor with dynamic updates.
  3. <span class="text-white font-medium">Real-Time Chat Application</span>
     [JavaScript, Live Messaging, Responsive UI]
     Real-time chat with clean modern interface.
  4. <span class="text-white font-medium">Dynamic Weather Report Application</span>
     [REST APIs, JavaScript, Geolocation]
     Real-time atmospheric telemetry and dynamic condition rendering.
`,
    experience: `
<span class="text-sky-400 font-semibold">💼 Professional Experience:</span>
  • <span class="text-white font-medium">Full Stack Web Development Intern</span>
    <span class="text-slate-400">CODTECH IT Solutions Pvt. Ltd. | Jun 2025 – Jul 2025</span>
    - Engineered responsive web apps using HTML5, CSS3, and JavaScript.
    - Built a live Weather Report app utilizing RESTful APIs.
    - Implemented real-time chat application with synchronous user interface.
    - Developed collaborative document editor with multi-client real-time synchronization.
`,
    education: `
<span class="text-amber-400 font-semibold">🎓 Academic Qualifications:</span>
  • <span class="text-white font-medium">B.Tech in Computer Science and Engineering</span> (2022 – 2026 | Graduated)
    Malla Reddy College of Engineering | <span class="text-emerald-400 font-semibold">CGPA: 7.7 / 10</span>
  • <span class="text-white font-medium">Intermediate (MPC)</span> (2020 – 2022)
    Narayana Junior College | <span class="text-emerald-400 font-semibold">95.0%</span>
  • <span class="text-white font-medium">Secondary School Certificate (SSC)</span> (2020)
    Sri Chaitanya Techno School | <span class="text-emerald-400 font-semibold">CGPA: 10 / 10</span>
`,
    contact: `
<span class="text-sky-400 font-semibold">📬 Get In Touch:</span>
  • <span class="text-slate-300">Email:</span>    <a href="mailto:premsaichithaluri@gmail.com" class="text-sky-400 underline">premsaichithaluri@gmail.com</a>
  • <span class="text-slate-300">Phone:</span>    <a href="tel:+917731077905" class="text-sky-400">+91 7731077905</a>
  • <span class="text-slate-300">LinkedIn:</span> <a href="https://linkedin.com/in/premsai-chithaluri" target="_blank" class="text-sky-400 underline">linkedin.com/in/premsai-chithaluri</a>
  • <span class="text-slate-300">GitHub:</span>   <a href="https://github.com/Premsai19" target="_blank" class="text-sky-400 underline">github.com/Premsai19</a>
`,
    resume: `Opening resume preview...`,
    hire: `Redirecting to contact section...`,
    whoami: `<span class="text-slate-400">visitor@recruiter-workstation ~ Welcome to Prem's portfolio!</span>`,
    sudo: `<span class="text-rose-400 font-semibold">Permission denied: Prem Sai Chithaluri maintains root privileges on this portfolio.</span>`
  };

  function executeCommand(cmdText) {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    history.push(cmdText);
    historyIndex = history.length;

    // Add command echo
    const commandEntry = document.createElement('div');
    commandEntry.className = 'mt-2 text-slate-300';
    commandEntry.innerHTML = `<span class="text-emerald-400">guest@premsai:~$</span> ${cmdText}`;
    terminalOutput.appendChild(commandEntry);

    // Process output
    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (cleanCmd === 'resume') {
      const outputElem = document.createElement('div');
      outputElem.className = 'mt-1 text-sky-400';
      outputElem.innerHTML = commands.resume;
      terminalOutput.appendChild(outputElem);
      setTimeout(() => openResumeModal(), 500);
    } else if (cleanCmd === 'hire') {
      const outputElem = document.createElement('div');
      outputElem.className = 'mt-1 text-emerald-400';
      outputElem.innerHTML = commands.hire;
      terminalOutput.appendChild(outputElem);
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else if (commands[cleanCmd]) {
      const outputElem = document.createElement('div');
      outputElem.className = 'mt-1 text-slate-300 leading-relaxed';
      outputElem.innerHTML = commands[cleanCmd];
      terminalOutput.appendChild(outputElem);
    } else {
      const outputElem = document.createElement('div');
      outputElem.className = 'mt-1 text-rose-400';
      outputElem.innerHTML = `command not found: <span class="underline">${cleanCmd}</span>. Type <span class="text-amber-300 cursor-pointer" onclick="document.getElementById('terminal-input').value='help'; document.getElementById('terminal-input').focus();">'help'</span> for a list of commands.`;
      terminalOutput.appendChild(outputElem);
    }

    // Scroll to bottom
    const terminalContainer = document.getElementById('terminal-container');
    if (terminalContainer) {
      terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(terminalInput.value);
      terminalInput.value = '';
    } else if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        terminalInput.value = '';
      }
    }
  });

  // Chip clicks
  chipButtons.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        terminalInput.value = cmd;
        executeCommand(cmd);
        terminalInput.value = '';
      }
    });
  });
}

/* ==========================================================================
   5. Project Filtering Logic
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Modals (Project Case Studies & Printable Resume)
   ========================================================================== */
const projectDetails = {
  forensic: {
    title: 'Blockchain-Based Forensic Evidence Management System',
    subtitle: 'Major Capstone Project • Django, Python, MySQL, Blockchain',
    badge: 'Flagship Project',
    overview: 'In criminal justice and forensic workflows, maintaining a tamper-evident, indisputable chain of custody is essential to legal admissibility. This enterprise-grade platform leverages cryptographic hash chaining and role-based permissions to guarantee that forensic evidence records cannot be altered, forged, or deleted without immediate detection.',
    architecture: [
      'Engineered an SHA-256 cryptographic hash-linking engine simulating blockchain immutability across evidence transfer logs.',
      'Designed 3 granular role-based authorization modules: <strong>Admin</strong> (system configuration & user management), <strong>Police Officer</strong> (evidence intake, tagging, transfer request), and <strong>Forensic Scientist</strong> (laboratory analysis, chemical report attachment, custody sign-off).',
      'Implemented automated audit trails generating verifiable digital certificates for court presentation.',
      'Developed with Django (MVT architecture) and a normalized MySQL relational database schema ensuring ACID compliance.'
    ],
    tech: ['Django', 'Python', 'MySQL', 'Blockchain Concepts', 'SHA-256', 'HTML5/CSS3', 'RBAC Security'],
    github: 'https://github.com/Premsai19',
    demo: '#'
  },
  editor: {
    title: 'Real-Time Collaborative Document Editor',
    subtitle: 'CODTECH IT Solutions Internship Project • Real-Time Web',
    badge: 'Real-Time Synchronous System',
    overview: 'A high-concurrency browser-based rich text editor enabling multiple distributed users to simultaneously draft, format, and review documentation with synchronized live updates.',
    architecture: [
      'Engineered bi-directional event-driven synchronization to broadcast keystrokes and caret positions across connected client instances.',
      'Mitigated text state conflicts through operational debounce, state checksum validation, and atomic delta updates.',
      'Designed a sleek, distraction-free writing interface with full formatting toolbar (bold, italics, headers, lists, code blocks).',
      'Integrated active user presence markers showing currently collaborating peers in the document session.'
    ],
    tech: ['JavaScript (ES6+)', 'WebSockets / Real-Time Sync', 'HTML5 ContentEditable', 'CSS3 Glassmorphism'],
    github: 'https://github.com/Premsai19',
    demo: '#'
  },
  chat: {
    title: 'Real-Time Instant Messaging Application',
    subtitle: 'CODTECH IT Solutions Internship Project • Interactive Web Application',
    badge: 'Communication Platform',
    overview: 'A responsive live chat application engineered with instant message transmission, live status indicators, channel rooms, and a mobile-optimized chat UI.',
    architecture: [
      'Built reactive message listener pipelines rendering new incoming chats with zero page reloads.',
      'Created intuitive conversation channels with participant lists, time-stamped chat bubbles, and auto-scroll behavior.',
      'Integrated client-side message caching and state preservation for a seamless chat browsing experience.',
      'Styled with a modern dark theme inspired by Discord and Slack, ensuring responsive layout across smartphones and desktops.'
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Real-Time Messaging'],
    github: 'https://github.com/Premsai19',
    demo: '#'
  },
  weather: {
    title: 'Dynamic Weather Intelligence & Forecasting App',
    subtitle: 'CODTECH IT Solutions Internship Project • API Integration',
    badge: 'REST API & Geolocation',
    overview: 'An interactive meteorological dashboard delivering real-time atmospheric data, multi-metric telemetry, and dynamic weather-reactive interfaces for cities worldwide.',
    architecture: [
      'Integrated external REST APIs to fetch live weather telemetry: current temperature, real-feel, humidity index, wind velocity, and barometric pressure.',
      'Incorporated browser Geolocation API with smart city search fallback and automated error boundary handling.',
      'Engineered dynamic visual state transitions: background gradients and weather iconography adapt synchronously to sunny, cloudy, rainy, or night conditions.',
      'Designed responsive metric metric cards optimized for touch gestures and fast initial load speeds.'
    ],
    tech: ['JavaScript', 'REST APIs', 'JSON Parsing', 'Geolocation API', 'CSS Grid/Flexbox'],
    github: 'https://github.com/Premsai19',
    demo: '#'
  }
};

function initModals() {
  const projectModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');

  // Trigger buttons
  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      openProjectModal(projKey);
    });
  });

  document.querySelectorAll('.open-resume-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });

  // Close buttons
  document.querySelectorAll('.close-modal-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  [projectModal, resumeModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });
}

function openProjectModal(key) {
  const data = projectDetails[key];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  content.innerHTML = `
    <div class="flex items-start justify-between border-b border-slate-700/60 pb-4">
      <div>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
          ${data.badge}
        </span>
        <h3 class="text-xl md:text-2xl font-bold font-display text-white">${data.title}</h3>
        <p class="text-sm text-sky-400/80 font-mono mt-1">${data.subtitle}</p>
      </div>
      <button class="close-modal-btn text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition" onclick="closeAllModals()">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <div class="py-5 space-y-5">
      <div>
        <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Executive Summary</h4>
        <p class="text-slate-300 leading-relaxed text-sm md:text-base">${data.overview}</p>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Key Engineering Deliverables</h4>
        <ul class="space-y-2.5 text-sm md:text-base text-slate-300">
          ${data.architecture.map((item) => `<li class="flex items-start gap-2.5"><span class="text-sky-400 mt-1">▹</span><span>${item}</span></li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Technologies & Architecture</h4>
        <div class="flex flex-wrap gap-2">
          ${data.tech.map((t) => `<span class="px-2.5 py-1 text-xs font-mono rounded bg-slate-800/90 text-sky-300 border border-slate-700">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-700/60">
      <div class="flex items-center gap-3">
        <a href="${data.github}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-600 transition">
          <i data-lucide="github" class="w-4 h-4"></i> View Repository
        </a>
      </div>
      <button onclick="closeAllModals()" class="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white transition">
        Close Preview
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  lucide.createIcons();
}

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeAllModals() {
  const projectModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');
  if (projectModal) {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
  }
  if (resumeModal) {
    resumeModal.classList.add('hidden');
    resumeModal.classList.remove('flex');
  }
}

// Expose closeAllModals to window for inline onclick handlers
window.closeAllModals = closeAllModals;

/* ==========================================================================
   7. Copy to Clipboard with Toast Notification
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: ${text}`);
      }).catch(() => {
        showToast(`Copied: ${text}`);
      });
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.innerHTML = `<div class="flex items-center gap-2.5"><i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400"></i><span>${message}</span></div>`;
  lucide.createIcons();

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   8. Contact Form Handling
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim();
    const email = document.getElementById('form-email')?.value.trim();
    const subject = document.getElementById('form-subject')?.value.trim() || 'Software Engineer Opportunity';
    const message = document.getElementById('form-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields');
      return;
    }

    // Direct mailto trigger fallback
    const mailtoUri = `mailto:premsaichithaluri@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast('Launching email client...');
    window.location.href = mailtoUri;
    form.reset();
  });
}

/* ==========================================================================
   9. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-menu');
  const closeBtn = document.getElementById('close-mobile-nav-btn');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileNav) return;

  function toggleMenu() {
    mobileNav.classList.toggle('hidden');
  }

  menuBtn.addEventListener('click', toggleMenu);
  if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   10. Scroll Spy for Active Nav Item
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-sky-400', 'font-semibold');
      link.classList.add('text-slate-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-400', 'font-semibold');
        link.classList.remove('text-slate-300');
      }
    });
  });
}

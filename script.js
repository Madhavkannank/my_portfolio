// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Deep link / URL param scroll handler
const checkInitialScroll = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('scroll') || (window.location.hash ? window.location.hash.substring(1) : null);
    if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView();
        }
    }
};
checkInitialScroll();
window.addEventListener('DOMContentLoaded', checkInitialScroll);

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Update theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a subtle animation to the toggle button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// Lightweight scroll reveals for headings and cards
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.flagship-card, .secondary-card, .os-card, .ledger-row, .credential-featured-card, .domains-overview-card, .skill-category, .section-editorial-header');
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const inView = rect.top < windowHeight - 40 && rect.bottom > 40;
        if (inView) {
            element.classList.add('in-view');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll, { passive: true });

// Notification function
function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    // Set background color based on type
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Copy to clipboard for contact items (global handler)
document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn');
    if (!btn) return;

    const value = btn.getAttribute('data-copy');
    if (!value) return;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(value);
        } else {
            const ta = document.createElement('textarea');
            ta.value = value;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            ta.remove();
        }
        showNotification('Copied to clipboard', 'success');

        // Temporary visual feedback
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
        }, 1200);
    } catch (err) {
        console.error('Copy failed', err);
        showNotification('Copy failed', 'error');
    }
});

// Skills scroll listener removed (using clean categorized chips)

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const headerEl = document.querySelector('header');

window.addEventListener('scroll', () => {
    let current = '';
    
    if (headerEl) {
        headerEl.classList.toggle('scrolled', window.scrollY > 40);
    }

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            link.classList.toggle('active', link.getAttribute('href') === current);
        }
    });
});

// Projects section uses fluid editorial showcase (no rigid horizontal track)

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Interactive 3D Depth Parallax for Hero Landing Page
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const bgLayer = document.getElementById('hero-bg-layer');
    const personLayer = document.getElementById('hero-person-layer');

    if (heroSection && bgLayer && personLayer) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xOffset = (clientX / innerWidth - 0.5) * 2;
            const yOffset = (clientY / innerHeight - 0.5) * 2;

            // Background moves subtly without zoom
            bgLayer.style.transform = `translate3d(${xOffset * 10}px, ${yOffset * 10}px, 0)`;
            
            // Foreground person layer moves in opposite direction for 3D pop effect without zoom
            personLayer.style.transform = `translate3d(${xOffset * -20}px, ${yOffset * -20}px, 0)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            bgLayer.style.transform = 'translate3d(0, 0, 0)';
            personLayer.style.transform = 'translate3d(0, 0, 0)';
        });
    }
});

// Interactive Project Details Modal
const projectDetails = {
    'Jarvis Jr': {
        title: 'Jarvis Jr — Personal AI Assistant & OS Automation Runtime',
        subtitle: 'Layered Local-First AI Runtime with Supervisor-Worker Architecture',
        stack: ['Python', 'AsyncIO', 'Multi-Agent', 'POSIX/Win32', 'Vector Memory', 'Sandboxing'],
        highlights: [
            'Layered modular architecture decoupling core orchestration (app/jarvis.py), semantic routing (core/router.py), and planning (agents/supervisor.py).',
            'Dynamic task decomposition graph executing independent I/O workflows concurrently while maintaining strict serialized model inference.',
            'Deterministic tool execution sandbox with strict privilege separation, argument validation, and structured error propagation.',
            'Hardware-aware local execution engineered for 6GB VRAM bounds (RTX 3050) with cross-platform Linux & Windows runtimes.'
        ],
        github: 'https://github.com/Madhavkannank/juniorjarvis'
    },
    'KCI': {
        title: 'KCI (Kandhari Construction Intelligence)',
        subtitle: 'Infrastructure Defect Detection & Severity Assessment System',
        stack: ['Python', 'PyTorch', 'FastAPI', 'React', 'EfficientNet-B4', 'FPN', 'OpenCV'],
        highlights: [
            'End-to-end computer vision pipeline segmenting structural defects (Crack, Rust, Spalling, Exposed Rebars).',
            'FPN + EfficientNet-B4 primary semantic segmentation baseline built for RTX 3050 GPU optimization.',
            'Deterministic, explainable risk scoring engine prioritizing urgent infrastructure repairs.',
            'FastAPI REST microservice serving structured JSON outputs and generating PDF inspection reports.'
        ],
        github: 'https://github.com/Madhavkannank/KCI'
    },
    'GUIDO': {
        title: 'GUIDO — Multi-Omics Disease Risk Profiling',
        subtitle: 'Predictive Classifier & Interactive Audit Dashboard',
        stack: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'React', 'Docker'],
        highlights: [
            'XGBoost predictive classifiers analyzing genomic and clinical multi-omics datasets.',
            'SHAP explanation scoring delivering patient-level feature attribution and transparent risk metrics.',
            'FastAPI backend service layer powering a responsive React data visualization dashboard.'
        ],
        github: 'https://github.com/Madhavkannank/guido'
    },
    'AXEL': {
        title: 'AXEL — Intelligent Document Processing',
        subtitle: 'Metadata Extraction & Sub-Second Vector Search',
        stack: ['Python', 'NLP', 'Sentence-Transformers', 'Vector Embeddings', 'OCR'],
        highlights: [
            'Multi-format parser extracting structured metadata from PDFs, scanned images, and DOCX documents.',
            'Semantic vector search using sentence-transformers for sub-second query retrieval.',
            'Desktop integration enabling local document indexing and instant semantic lookup.'
        ],
        github: 'https://github.com/Madhavkannank/Axel'
    },
    'Audit-QP': {
        title: 'Audit-QP — Syllabus & Question Paper Analyzer',
        subtitle: 'Academic Exam Coverage & Gap Analysis Engine',
        stack: ['Python', 'spaCy', 'FastAPI', 'PDF Parsing', 'NLP'],
        highlights: [
            'Automated syllabus-to-exam coverage analysis engine built for academic institution quality audits.',
            'Custom spaCy NLP pipeline parsing question difficulty, Bloom taxonomy levels, and topic distribution.',
            'FastAPI endpoints returning instant compliance reports and curriculum gap notifications.'
        ],
        github: 'https://github.com/Madhavkannank/audit.qp'
    },
    'Aura-ECE': {
        title: 'Aura-ECE — Early Childhood Educational Intelligence',
        subtitle: 'Multimodal Teacher Observation & Parent Reporting',
        stack: ['Python', 'FastAPI', 'MongoDB', 'Streamlit', 'NLP'],
        highlights: [
            'Privacy-first educational assessment system processing teacher observation narratives.',
            'MongoDB database backend storing longitudinal student growth metrics and observation logs.',
            'Streamlit dashboard generating automated, readable progress reports for parents.'
        ],
        github: 'https://github.com/Madhavkannank/AURA_ECE'
    },
    'Color App': {
        title: 'Color App — Theme & Palette Suggester',
        subtitle: 'Java Desktop Application with MySQL Storage',
        stack: ['Java', 'Swing', 'FlatLaf', 'MySQL', 'JDBC'],
        highlights: [
            'Desktop application generating visual color schemes and complementary hex palettes.',
            'FlatLaf modern look-and-feel framework integration for crisp UI styling.',
            'MySQL relational storage persisting user-saved themes and custom color collections.'
        ],
        github: 'https://github.com/Madhavkannank/Colorsuggestion_app_inJAVA'
    }
};

// Modal Trigger Event Handlers
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-modal-btn');
    if (trigger) {
        const key = trigger.getAttribute('data-project');
        const info = projectDetails[key];
        if (info) {
            openProjectModal(info);
        }
        return;
    }
    const card = e.target.closest('.flagship-card, .secondary-card');
    if (card && !e.target.closest('a') && !e.target.closest('button')) {
        const titleEl = card.querySelector('.project-title, .sec-title');
        if (!titleEl) return;
        const text = titleEl.textContent.trim();
        const key = Object.keys(projectDetails).find(k => text.includes(k));
        if (key && projectDetails[key]) {
            openProjectModal(projectDetails[key]);
        }
    }
});

const modalOverlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');

function openProjectModal(info) {
    if (!modalOverlay || !modalContent) return;
    
    modalContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--primary-color); font-weight: 700; letter-spacing: 0.1em;">// ARCHITECTURAL DOSSIER</span>
        </div>
        <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight: 800; color: var(--text-color); margin-bottom: 0.35rem; letter-spacing: -0.02em;">${info.title}</h2>
        <p style="color: var(--secondary-color); font-weight: 600; font-size: 0.98rem; margin-bottom: 1.5rem;">${info.subtitle}</p>
        
        <div style="display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 1.75rem;">
            ${info.stack.map(s => `<span style="background: var(--light-bg); border: 1px solid var(--border-color); color: var(--text-color); font-family: var(--font-mono); font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.78rem;">${s}</span>`).join('')}
        </div>
        
        <h4 style="font-family: var(--font-mono); font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--primary-color); margin-bottom: 0.85rem;">Key Architecture &amp; Engineering Decisions</h4>
        <ul style="list-style: square; padding-left: 1.25rem; color: var(--light-text); font-size: 0.95rem; line-height: 1.75; margin-bottom: 2rem;">
            ${info.highlights.map(h => `<li style="margin-bottom: 0.5rem;"><span style="color: var(--text-color);">${h}</span></li>`).join('')}
        </ul>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; padding-top: 1.25rem; border-top: 1px solid var(--border-color);">
            <a href="${info.github}" target="_blank" rel="noreferrer" class="editorial-cta-btn primary"><i class="fab fa-github"></i> View GitHub Repository</a>
            <button class="editorial-cta-btn secondary" onclick="document.getElementById('modal-close').click()"><i class="fas fa-times"></i> Close Dossier</button>
        </div>
    `;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Skills Bento Matrix HUD Filter & Dynamic Keyword Search
document.addEventListener('DOMContentLoaded', () => {
    const hudPills = document.querySelectorAll('.hud-pill');
    const searchInput = document.getElementById('skills-search');
    const searchCounter = document.getElementById('search-counter');
    const bentoCards = document.querySelectorAll('.tech-bento-card');
    const techItems = document.querySelectorAll('.tech-item');

    let currentFilter = 'all';

    function applyFilterAndSearch() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let visibleCount = 0;

        bentoCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const matchesCategory = (currentFilter === 'all' || cardCat === currentFilter);

            let cardVisibleItems = 0;
            const items = card.querySelectorAll('.tech-item');

            items.forEach(item => {
                const text = (item.textContent + ' ' + (item.getAttribute('data-keywords') || '')).toLowerCase();
                const matchesQuery = !query || text.includes(query);

                if (matchesCategory && matchesQuery) {
                    item.style.display = 'flex';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    cardVisibleItems++;
                    visibleCount++;
                } else if (!matchesCategory) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'none';
                }
            });

            if (matchesCategory && (cardVisibleItems > 0 || !query)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });

        if (searchCounter) {
            searchCounter.textContent = `${visibleCount} match${visibleCount === 1 ? '' : 'es'}`;
            searchCounter.style.color = visibleCount > 0 ? 'var(--primary-color)' : '#ef4444';
        }
    }

    hudPills.forEach(pill => {
        pill.addEventListener('click', () => {
            hudPills.forEach(p => {
                p.classList.remove('active');
                p.setAttribute('aria-selected', 'false');
            });
            pill.classList.add('active');
            pill.setAttribute('aria-selected', 'true');
            
            currentFilter = pill.getAttribute('data-filter') || 'all';
            applyFilterAndSearch();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyFilterAndSearch);
    }
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
    });
}
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

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
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

// Add scroll animation (re-triggerable with enhanced animations)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .timeline-item, .achievement-card, .section-title, .hero-content, .about-img, .about-text');
    const windowHeight = window.innerHeight;

    elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const inView = rect.top < windowHeight - 50 && rect.bottom > 50;

        if (inView && !element.classList.contains('animated')) {
            // Remove any existing transforms before animating
            element.style.transform = '';
            
            // Add different animation classes based on element type
            if (element.classList.contains('section-title')) {
                element.classList.add('slide-in-down', 'animated');
            } else if (element.classList.contains('hero-content')) {
                element.classList.add('fade-in-up', 'animated');
            } else if (element.classList.contains('about-img')) {
                element.classList.add('fade-in-left', 'animated');
            } else if (element.classList.contains('about-text')) {
                element.classList.add('fade-in-right', 'animated');
            } else if (element.classList.contains('timeline-item')) {
                // Alternate timeline items
                if (index % 2 === 0) {
                    element.classList.add('fade-in-left', 'animated');
                } else {
                    element.classList.add('fade-in-right', 'animated');
                }
            } else if (element.classList.contains('achievement-card')) {
                element.classList.add('bounce-in', 'animated');
            } else {
                element.classList.add('fade-in-up', 'animated');
            }
            
            // Add minimal staggered delay
            element.style.animationDelay = `${(index % 5) * 0.05}s`;
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for all animated elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .timeline-item, .achievement-card, .section-title, .hero-content, .about-img, .about-text');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
    });

    // Add special animations for navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            link.style.transition = 'all 0.3s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 50 + 300);
    });

    // Animate logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        setTimeout(() => {
            logo.style.transition = 'all 0.4s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, 100);
    }

    // Initial check for elements in viewport
    setTimeout(animateOnScroll, 100);
});

// Check for elements in viewport on scroll
window.addEventListener('scroll', animateOnScroll);

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

// Horizontal scroll for projects section
let _hScrollHandler = null;

function setupProjectsHScroll() {
    const section = document.querySelector('#projects');
    const track = document.querySelector('.projects-track');
    if (!section || !track) return;

    if (_hScrollHandler) {
        window.removeEventListener('scroll', _hScrollHandler);
        _hScrollHandler = null;
    }

    if (window.innerWidth < 768) {
        section.style.height = '';
        track.style.transform = '';
        return;
    }

    const vh = window.innerHeight;
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    section.style.height = `${vh + maxTranslate}px`;

    // Ensure cards are visible (bypass the fade-in opacity:0 from scroll animations)
    section.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = '1';
        card.style.animationDelay = '';
        card.classList.add('animated');
    });

    _hScrollHandler = () => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(0, Math.min(-rect.top, maxTranslate));
        track.style.transform = `translateX(-${progress}px)`;
    };

    window.addEventListener('scroll', _hScrollHandler, { passive: true });
    _hScrollHandler();
}

document.addEventListener('DOMContentLoaded', setupProjectsHScroll);
window.addEventListener('resize', setupProjectsHScroll);

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
    'CampusKaboom': {
        title: 'CampusKaboom — Student Mentorship Platform',
        subtitle: 'Peer-to-Peer Learning & Session Scheduling',
        stack: ['React', 'Vite', 'Firebase', 'Tailwind CSS', 'WebSockets'],
        highlights: [
            'Peer-to-peer student mentor matching space featuring dual Student/Mentor mode switching.',
            'Calendar booking engine for 1-on-1 sessions and real-time socket chat rooms.',
            'Firebase Firestore database with granular security rules and authentication.'
        ],
        github: 'https://github.com/Madhavkannank/Campus-Kaboom'
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
    const card = e.target.closest('.project-card');
    if (card) {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const key = titleEl.textContent.trim();
        const info = projectDetails[key];
        if (info) {
            openProjectModal(info);
        }
    }
});

const modalOverlay = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalContent = document.getElementById('modal-content');

function openProjectModal(info) {
    if (!modalOverlay || !modalContent) return;
    
    modalContent.innerHTML = `
        <h2 style="font-family: var(--font-heading); font-size: 1.75rem; color: var(--text-color); margin-bottom: 0.25rem;">${info.title}</h2>
        <p style="color: var(--primary-color); font-weight: 600; font-size: 0.95rem; margin-bottom: 1.25rem;">${info.subtitle}</p>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
            ${info.stack.map(s => `<span style="background: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-color); font-weight: 600; padding: 0.35rem 0.85rem; border-radius: 20px; font-size: 0.8rem;">${s}</span>`).join('')}
        </div>
        
        <h4 style="color: var(--text-color); font-size: 1rem; margin-bottom: 0.75rem;">Key Architecture &amp; Highlights</h4>
        <ul style="list-style: disc; padding-left: 1.25rem; color: var(--light-text); font-size: 0.92rem; line-height: 1.7; margin-bottom: 2rem;">
            ${info.highlights.map(h => `<li style="margin-bottom: 0.5rem;">${h}</li>`).join('')}
        </ul>
        
        <a href="${info.github}" target="_blank" rel="noreferrer" class="cta-button" style="display: inline-flex; text-decoration: none;"><i class="fab fa-github" style="margin-right: 0.5rem;"></i> View Source Code</a>
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

// Skills Filter & Keyword Search
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const searchInput = document.getElementById('skills-search');
    const categories = document.querySelectorAll('.skill-category');
    const chips = document.querySelectorAll('.skill-chip');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            categories.forEach(cat => {
                if (filter === 'all' || cat.getAttribute('data-category') === filter) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            chips.forEach(chip => {
                const text = chip.textContent.toLowerCase();
                if (text.includes(query)) {
                    chip.style.opacity = '1';
                    chip.style.transform = 'scale(1)';
                } else {
                    chip.style.opacity = '0.3';
                    chip.style.transform = 'scale(0.95)';
                }
            });
        });
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
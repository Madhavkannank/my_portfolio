// ==========================================================================
// Madhav Kannan K — Portfolio JavaScript
// Pure Vanilla JS · Zero Dependencies · High Performance
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('active');
            navLinks.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
            hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Smooth Scrolling for Anchor Links with Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
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

    // 3. Theme Toggle Functionality (Light Paper by Default, respects prefers-color-scheme on first visit)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon') || (themeToggle ? themeToggle.querySelector('i') : null);

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    const moonSvg = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    const sunSvg = `<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        if (theme === 'dark') {
            themeToggle.innerHTML = sunSvg;
            themeToggle.setAttribute('aria-label', 'Switch to light paper theme');
        } else {
            themeToggle.innerHTML = moonSvg;
            themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }

    updateThemeIcon(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);

            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 250);
        });
    }

    // 4. Hero Parallax Layering (Disabled under prefers-reduced-motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroSection = document.getElementById('home');
    const bgLayer = document.getElementById('hero-bg-layer');
    const personLayer = document.getElementById('hero-person-layer');

    if (!prefersReducedMotion && heroSection && bgLayer && personLayer) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xOffset = (clientX / innerWidth - 0.5) * 2;
            const yOffset = (clientY / innerHeight - 0.5) * 2;

            bgLayer.style.transform = `translate3d(${xOffset * 6}px, ${yOffset * 6}px, 0)`;
            personLayer.style.transform = `translate3d(${xOffset * -10}px, ${yOffset * -10}px, 0)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            bgLayer.style.transform = 'translate3d(0, 0, 0)';
            personLayer.style.transform = 'translate3d(0, 0, 0)';
        });
    }

    // 5. Reading Scroll Progress Bar & Scroll-Spy Active Section Tracking
    const progressBar = document.getElementById('progressBar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        // Active link tracking (Scroll-spy)
        let currentSectionId = '';
        if (winScroll + window.innerHeight >= document.documentElement.scrollHeight - 60) {
            currentSectionId = '#contact';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;
                if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                    currentSectionId = '#' + section.getAttribute('id');
                }
            });
        }

        navLinksItems.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === currentSectionId);
        });
    }, { passive: true });

    // 6. Copy Email to Clipboard with Toast Notification
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'madhavkannank2903@gmail.com';
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = email;
                    ta.style.position = 'fixed';
                    ta.style.left = '-9999px';
                    document.body.appendChild(ta);
                    ta.focus();
                    ta.select();
                    document.execCommand('copy');
                    ta.remove();
                }
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                showToast('Email copied to clipboard!');
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="fas fa-copy"></i> <span>Copy</span>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy', err);
                showToast('Could not copy email');
            }
        });
    }

    // 7. Update Copyright Year dynamically
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
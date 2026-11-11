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
                const headerOffset = 96;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Theme Toggle is handled by ink/main.js (WebGL2 ink-bleed transition + CSS fallback)

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
    const contactEmail = document.querySelector('.contact-giant-email');
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

    function playCopyAnimation(element) {
        element.classList.remove('animate__animated', 'animate__hinge');
        void element.offsetWidth;
        element.classList.add('animate__animated', 'animate__hinge');
        element.addEventListener('animationend', () => {
            element.classList.remove('animate__animated', 'animate__hinge');
        }, { once: true });
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = copyEmailBtn.getAttribute('data-email') || 'hello@madhavkannank.me';
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
                playCopyAnimation(copyEmailBtn);
                if (contactEmail) playCopyAnimation(contactEmail);
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

    // 7. Architecture Accordion aria-expanded sync
    document.querySelectorAll('.arch-accordion').forEach(details => {
        const summary = details.querySelector('.arch-accordion-summary');
        if (!summary) return;
        summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
        details.addEventListener('toggle', () => {
            summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
        });
    });
});
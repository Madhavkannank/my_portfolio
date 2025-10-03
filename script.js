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
    const elements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .timeline-item, .achievement-card, .section-title, .hero-content, .about-img, .about-text');
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
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .timeline-item, .achievement-card, .section-title, .hero-content, .about-img, .about-text');
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

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            }
        };
        setTimeout(typeWriter, 500);
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

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barPosition < windowHeight - 50) {
            // The width is already set in the HTML, just add a class to trigger the animation
            bar.style.opacity = '1';
            bar.style.width = bar.style.width; // This will trigger the CSS transition
        }
    });
};

// Initial check for skill bars in viewport
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
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

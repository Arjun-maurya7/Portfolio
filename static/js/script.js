// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// Smooth Scroll for Navigation Links
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in sections
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// Typewriter Animation
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter-text');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '2px solid';
    
    let i = 0;
    const typeSpeed = 50; // milliseconds per character
    
    function typeChar() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, typeSpeed);
        } else {
            // Start blinking cursor after typing is complete
            setTimeout(() => {
                typewriterElement.style.animation = 'blink 1s infinite';
            }, 1000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeChar, 1000);
}

// Navbar Background on Scroll
function initNavbarScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-white/95', 'dark:bg-gray-900/95');
            header.classList.remove('bg-white/90', 'dark:bg-gray-900/90');
        } else {
            header.classList.add('bg-white/90', 'dark:bg-gray-900/90');
            header.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Simple validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const heroSection = document.querySelector('#home');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

// Active Navigation Link Highlighting
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-gray-900', 'dark:text-white');
            link.classList.add('text-gray-600', 'dark:text-gray-300');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-600', 'dark:text-gray-300');
                link.classList.add('text-gray-900', 'dark:text-white');
            }
        });
    });
}

// Hover Effects for Cards
function initHoverEffects() {
    const cards = document.querySelectorAll('.hover-lift');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Loading Animation
function initLoadingAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
}

// Initialize all functionality
function init() {
    // Initialize theme
    initTheme();
    
    // Add event listeners
    themeToggle.addEventListener('click', toggleTheme);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only prevent default for hash links (internal navigation)
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                smoothScroll(targetId);
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
            // For external links (like /contact), allow normal navigation
        });
    });
    
    // Initialize all features
    initScrollAnimations();
    initTypewriter();
    initNavbarScroll();
    initContactForm();
    initActiveNavLink();
    initHoverEffects();
    initLoadingAnimation();
    
    // Initialize parallax only on desktop
    if (window.innerWidth > 768) {
        initParallax();
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize parallax based on screen size
    if (window.innerWidth > 768) {
        initParallax();
    }
});

// Add some additional polish - smooth transitions for theme changes
document.addEventListener('DOMContentLoaded', () => {
    // Add transition classes to elements that should animate on theme change
    const elementsToTransition = document.querySelectorAll('body, header, main, section, div, p, h1, h2, h3, h4, h5, h6, a, button, input, textarea');
    elementsToTransition.forEach(element => {
        element.style.transition = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Toggle theme with Ctrl/Cmd + T
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/dist/smoothscroll.min.js';
    document.head.appendChild(script);
}

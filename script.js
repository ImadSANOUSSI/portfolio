// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = document.body.classList.contains('dark-theme');
    
    if (window.scrollY > 100) {
        if (isDark) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (isDark) {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting - DISABLED per user request
// window.addEventListener('scroll', () => {
//     let current = '';
//     const sections = document.querySelectorAll('section');
    
//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;
//         if (scrollY >= (sectionTop - 200)) {
//             current = section.getAttribute('id');
//         }
//     });

//     document.querySelectorAll('.nav-link').forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href').slice(1) === current) {
//             link.classList.add('active');
//         }
//     });
// });

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .education-item, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Typing effect for hero title
function typeWriter(element, text, delay = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 50);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotateX(5deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #fbbf24);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
createScrollProgress();

// Add particle background to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Add loading screen
function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Hide loader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading screen
createLoadingScreen();

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        // Create theme toggle button
        this.createToggleButton();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
    }

    createToggleButton() {
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = this.currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Toggle theme');
        themeToggle.setAttribute('title', this.currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        
        themeToggle.addEventListener('click', () => this.toggleTheme());
        
        document.body.appendChild(themeToggle);
        this.toggleButton = themeToggle;
    }

    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            this.setTheme('light');
        } else {
            this.setTheme('dark');
        }
    }

    setTheme(theme) {
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            this.toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            this.toggleButton.setAttribute('title', 'Switch to light mode');
        } else {
            document.body.classList.remove('dark-theme');
            this.toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            this.toggleButton.setAttribute('title', 'Switch to dark mode');
        }
        
        // Save theme preference
        localStorage.setItem('theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor();
        
        // Update navbar styling immediately
        this.updateNavbarForTheme();
    }
    
    updateNavbarForTheme() {
        const navbar = document.querySelector('.navbar');
        const isDark = document.body.classList.contains('dark-theme');
        
        if (window.scrollY > 100) {
            if (isDark) {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            }
        } else {
            if (isDark) {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }

    updateMetaThemeColor() {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = this.currentTheme === 'dark' ? '#111827' : '#2563eb';
    }

    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                this.setTheme(mediaQuery.matches ? 'dark' : 'light');
            }
            
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Console welcome message
console.log(`
🚀 Welcome to Imad SANOUSSI's Portfolio!
📧 Contact: imadsanoussi7@gmail.com
🔗 GitHub: https://github.com/ImadSanoussi
💼 AI Developer & Data Scientist

This portfolio was built with modern web technologies:
- HTML5 & CSS3
- Vanilla JavaScript
- Responsive Design
- Interactive Animations
`);

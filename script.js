// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and X
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking a nav link on mobile
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset based on navbar height
                const navHeight = document.querySelector('.top-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                bar.style.width = progress + '%';
            }
        });
    }
    
    // Fade in sections when scrolling
    const sections = document.querySelectorAll('.content-section');
    
    function fadeInSections() {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('visible');
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add color-changing effect to profile image on hover
    const profileImage = document.querySelector('.image-container');
    if (profileImage) {
        profileImage.addEventListener('mouseover', function() {
            this.style.boxShadow = '0 10px 30px rgba(233, 30, 99, 0.3)';
        });
        
        profileImage.addEventListener('mouseout', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
    
    // Add typing animation to profile title
    const profileTitle = document.querySelector('.profile-title');
    if (profileTitle && profileTitle.classList.contains('animate-text')) {
        // Already has animation from CSS
    }
    
    // Add random color effects to about cards on hover
    const aboutCards = document.querySelectorAll('.about-card');
    const colors = ['#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#4caf50', '#ff9800'];
    
    aboutCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.color = randomColor;
            }
        });
        
        card.addEventListener('mouseout', function() {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // Run these functions on load and scroll
    window.addEventListener('scroll', function() {
        animateSkillBars();
        fadeInSections();
        toggleBackToTopButton();
    });
    
    // Run once on page load
    animateSkillBars();
    fadeInSections();
    toggleBackToTopButton();
});

// Add some fun interactive elements
function addParticleEffect(event) {
    const colors = ['#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#ff9800'];
    const container = document.querySelector('.container');
    
    // Create particle
    const particle = document.createElement('span');
    particle.className = 'particle';
    
    // Random size between 5-15px
    const size = Math.random() * 10 + 5;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Style the particle
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.position = 'absolute';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.8';
    
    // Position at mouse/touch location
    particle.style.left = `${event.clientX || event.touches[0].clientX}px`;
    particle.style.top = `${event.clientY || event.touches[0].clientY}px`;
    
    // Add to DOM
    document.body.appendChild(particle);
    
    // Animate and remove
    const animation = particle.animate([
        { transform: 'translate(0, 0)', opacity: 0.8 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0,0,0.2,1)'
    });
    
    animation.onfinish = () => {
        particle.remove();
    };
}

// Add particle effect on click/touch
document.addEventListener('click', addParticleEffect);
document.addEventListener('touchstart', addParticleEffect, { passive: true });

// Add CSS for particles
const style = document.createElement('style');
style.textContent = `
    .particle {
        pointer-events: none;
        position: fixed;
        border-radius: 50%;
        animation: float 1s ease-out forwards;
    }
    
    @keyframes float {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translate(var(--x, 0), var(--y, 0)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    // Login Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.getElementById('closeModal');
    const emailLoginForm = document.getElementById('emailLoginForm');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const appleLoginBtn = document.getElementById('appleLoginBtn');

    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    loginModal?.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Google Login Handler
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            console.log('Google login initiated');
            // In production, this would trigger Google OAuth flow
            // Example implementation:
            /*
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID',
                callback: handleGoogleCallback
            });
            google.accounts.id.prompt();
            */
            alert('Google login would be initiated here.\n\nIn production, this requires:\n1. Google OAuth Client ID\n2. Proper OAuth configuration\n3. Backend authentication endpoint');
        });
    }

    // Apple Login Handler
    if (appleLoginBtn) {
        appleLoginBtn.addEventListener('click', function() {
            console.log('Apple login initiated');
            // In production, this would trigger Apple Sign-In flow
            // Example implementation:
            /*
            AppleID.auth.init({
                clientId: 'YOUR_APPLE_CLIENT_ID',
                scope: 'name email',
                redirectURI: 'YOUR_REDIRECT_URI',
                usePopup: true
            });
            AppleID.auth.signIn();
            */
            alert('Apple login would be initiated here.\n\nIn production, this requires:\n1. Apple Developer Account\n2. Service ID configuration\n3. Backend authentication endpoint');
        });
    }

    // Email/Password Login Handler
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            console.log('Email login:', { email, remember });
            
            // In production, this would send credentials to your backend
            // Example:
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, remember })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Store token, redirect, etc.
                    localStorage.setItem('authToken', data.token);
                    window.location.href = '/dashboard';
                }
            });
            */
            
            alert(`Demo: Login attempt with email: ${email}\n\nIn production, this would authenticate with your backend server.`);
            
            // Close modal after "login"
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            emailLoginForm.reset();
        });
    }

    // Sign up link handler
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Sign up functionality would be implemented here.\n\nThis could be:\n1. A separate sign-up modal\n2. A redirect to a sign-up page\n3. Converting the current modal to sign-up mode');
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.feature-card, .example-card, .pricing-card, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Button click handlers
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-large');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-large, .btn-secondary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

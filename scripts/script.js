// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    // Initialize auth state listener
    initAuthStateListener();
    
    // Login Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.getElementById('closeModal');
    const emailLoginForm = document.getElementById('emailLoginForm');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const appleLoginBtn = document.getElementById('appleLoginBtn');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const emailStep = document.getElementById('emailStep');
    const codeStep = document.getElementById('codeStep');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const backToEmail = document.getElementById('backToEmail');
    const authMessage = document.getElementById('authMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    
    let currentEmail = '';
    let isCodeStep = false;

    // Initialize auth state
    function initAuthStateListener() {
        if (typeof Auth !== 'undefined' && Auth.onAuthStateChanged) {
            Auth.onAuthStateChanged((user) => {
                updateUIForAuthState(user);
            });
        }
    }

    // Update UI based on auth state
    function updateUIForAuthState(user) {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        
        if (user) {
            // User is logged in
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            userMenu.style.alignItems = 'center';
            userMenu.style.gap = '1rem';
            userName.textContent = user.email?.split('@')[0] || 'User';
        } else {
            // User is logged out
            authButtons.style.display = 'flex';
            authButtons.style.alignItems = 'center';
            authButtons.style.gap = '1rem';
            userMenu.style.display = 'none';
        }
    }

    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            try {
                await Auth.signOut();
                showAuthMessage('Logged out successfully', 'success');
            } catch (error) {
                console.error('Logout error:', error);
                showAuthMessage('Error logging out', 'error');
            }
        });
    }

    function showAuthMessage(message, type = 'info') {
        if (!authMessage) return;
        authMessage.textContent = message;
        authMessage.style.color = type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : var(--text-primary);
    }

    function resetAuthForm() {
        isCodeStep = false;
        currentEmail = '';
        emailInput.value = '';
        if (codeInput) codeInput.value = '';
        emailStep.style.display = 'block';
        codeStep.style.display = 'none';
        authSubmitBtn.textContent = 'Send Magic Code';
        backToEmail.style.display = 'none';
        authMessage.textContent = '';
    }

    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetAuthForm();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetAuthForm();
        });
    }

    // Close modal when clicking outside
    loginModal?.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetAuthForm();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
            resetAuthForm();
        }
    });

    // Back to email
    if (backToEmail) {
        backToEmail.addEventListener('click', function(e) {
            e.preventDefault();
            resetAuthForm();
        });
    }

    // Google Login Handler
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async function() {
            console.log('Google login initiated');
            showAuthMessage('Google OAuth needs to be configured in InstantDB dashboard', 'info');
            
            // In production with configured OAuth:
            // google.accounts.id.initialize({
            //     client_id: 'YOUR_GOOGLE_CLIENT_ID',
            //     callback: async (response) => {
            //         const result = await Auth.signInWithGoogle(response.credential);
            //         if (result.success) {
            //             loginModal.classList.remove('active');
            //             document.body.style.overflow = 'auto';
            //         } else {
            //             showAuthMessage(result.error, 'error');
            //         }
            //     }
            // });
            // google.accounts.id.prompt();
        });
    }

    // Apple Login Handler
    if (appleLoginBtn) {
        appleLoginBtn.addEventListener('click', async function() {
            console.log('Apple login initiated');
            showAuthMessage('Apple Sign-In needs to be configured in InstantDB dashboard', 'info');
            
            // In production with configured OAuth:
            // AppleID.auth.init({
            //     clientId: 'YOUR_APPLE_CLIENT_ID',
            //     scope: 'name email',
            //     redirectURI: window.location.origin,
            //     usePopup: true
            // });
            // const response = await AppleID.auth.signIn();
            // const result = await Auth.signInWithApple(response.authorization.id_token);
            // if (result.success) {
            //     loginModal.classList.remove('active');
            //     document.body.style.overflow = 'auto';
            // }
        });
    }

    // Email/Magic Code Login Handler
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!isCodeStep) {
                // Step 1: Send magic code
                const email = emailInput.value.trim();
                if (!email) {
                    showAuthMessage('Please enter your email', 'error');
                    return;
                }
                
                authSubmitBtn.disabled = true;
                authSubmitBtn.textContent = 'Sending...';
                showAuthMessage('Sending magic code...', 'info');
                
                const result = await Auth.signInWithEmail(email);
                
                authSubmitBtn.disabled = false;
                
                if (result.success) {
                    currentEmail = email;
                    isCodeStep = true;
                    emailStep.style.display = 'none';
                    codeStep.style.display = 'block';
                    authSubmitBtn.textContent = 'Verify Code';
                    backToEmail.style.display = 'inline';
                    showAuthMessage(result.message, 'success');
                    setTimeout(() => codeInput.focus(), 100);
                } else {
                    showAuthMessage(result.error || 'Failed to send magic code', 'error');
                    authSubmitBtn.textContent = 'Send Magic Code';
                }
            } else {
                // Step 2: Verify code
                const code = codeInput.value.trim();
                if (!code) {
                    showAuthMessage('Please enter the verification code', 'error');
                    return;
                }
                
                authSubmitBtn.disabled = true;
                authSubmitBtn.textContent = 'Verifying...';
                showAuthMessage('Verifying code...', 'info');
                
                const result = await Auth.verifyMagicCode(currentEmail, code);
                
                authSubmitBtn.disabled = false;
                
                if (result.success) {
                    showAuthMessage('Login successful!', 'success');
                    setTimeout(() => {
                        loginModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        resetAuthForm();
                    }, 1000);
                } else {
                    showAuthMessage(result.error || 'Invalid code', 'error');
                    authSubmitBtn.textContent = 'Verify Code';
                }
            }
        });
    }

    // Sign up link handler
    const signupLink = document.getElementById('signupLink');
    if (signupLink) {
        signupLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Magic code works for both sign up and sign in
            showAuthMessage('Enter your email to get started - works for both sign up and sign in!', 'info');
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

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    
    // Wait for Auth to be available
    function waitForAuth() {
        return new Promise((resolve) => {
            if (typeof Auth !== 'undefined') {
                resolve();
            } else {
                // Check every 100ms for Auth to be available
                const interval = setInterval(() => {
                    if (typeof Auth !== 'undefined') {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
                
                // Timeout after 5 seconds
                setTimeout(() => {
                    clearInterval(interval);
                    console.warn('Auth not loaded after 5 seconds');
                    resolve();
                }, 5000);
            }
        });
    }
    
    // Initialize after Auth is available
    waitForAuth().then(() => {
        initAuthStateListener();
    });
    
    // Login Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeModal = document.getElementById('closeModal');
    const emailLoginForm = document.getElementById('emailLoginForm');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const appleLoginBtn = document.getElementById('appleLoginBtn');
    const emailInput = document.getElementById('email');
    const codeInput = document.getElementById('code');
    const fullNameInput = document.getElementById('fullName');
    const companyInput = document.getElementById('company');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const emailStep = document.getElementById('emailStep');
    const codeStep = document.getElementById('codeStep');
    const nameField = document.getElementById('nameField');
    const companyField = document.getElementById('companyField');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const backToEmail = document.getElementById('backToEmail');
    const authMessage = document.getElementById('authMessage');
    const logoutBtn = document.getElementById('logoutBtn');
    const switchModeLink = document.getElementById('switchModeLink');
    const switchModeText = document.getElementById('switchModeText');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    
    let currentEmail = '';
    let isCodeStep = false;
    let isSignUpMode = false;
    let userProfile = {};

    // Initialize auth state
    function initAuthStateListener() {
        console.log('Initializing auth state listener');
        if (typeof Auth !== 'undefined' && Auth.onAuthStateChanged) {
            Auth.onAuthStateChanged((user) => {
                console.log('Auth state changed:', user);
                updateUIForAuthState(user);
            });
        } else {
            console.warn('Auth not available for state listener');
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
                if (typeof Auth !== 'undefined') {
                    await Auth.signOut();
                    showAuthMessage('Logged out successfully', 'success');
                }
            } catch (error) {
                console.error('Logout error:', error);
                showAuthMessage('Error logging out', 'error');
            }
        });
    }

    function showAuthMessage(message, type = 'info') {
        if (!authMessage) return;
        authMessage.textContent = message;
        authMessage.style.color = type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : 'var(--text-primary)';
    }

    function resetAuthForm() {
        isCodeStep = false;
        currentEmail = '';
        userProfile = {};
        if (emailInput) emailInput.value = '';
        if (codeInput) codeInput.value = '';
        if (fullNameInput) fullNameInput.value = '';
        if (companyInput) companyInput.value = '';
        if (agreeTermsCheckbox) agreeTermsCheckbox.checked = false;
        if (emailStep) emailStep.style.display = 'block';
        if (codeStep) codeStep.style.display = 'none';
        if (nameField) nameField.style.display = isSignUpMode ? 'block' : 'none';
        if (companyField) companyField.style.display = isSignUpMode ? 'block' : 'none';
        if (termsCheckbox) termsCheckbox.style.display = isSignUpMode ? 'flex' : 'none';
        if (authSubmitBtn) authSubmitBtn.textContent = isSignUpMode ? 'Create Account' : 'Send Magic Code';
        if (backToEmail) backToEmail.style.display = 'none';
        if (authMessage) authMessage.textContent = '';
    }

    // Switch between sign in and sign up
    function switchMode(toSignUp) {
        isSignUpMode = toSignUp;
        
        if (isSignUpMode) {
            // Switch to sign up mode
            modalTitle.textContent = 'Create Your Account';
            modalSubtitle.textContent = 'Start building amazing apps today';
            switchModeText.textContent = 'Already have an account?';
            switchModeLink.textContent = 'Sign in';
            nameField.style.display = 'block';
            companyField.style.display = 'block';
            termsCheckbox.style.display = 'flex';
            authSubmitBtn.textContent = 'Create Account';
        } else {
            // Switch to sign in mode
            modalTitle.textContent = 'Welcome Back';
            modalSubtitle.textContent = 'Sign in to continue building amazing apps';
            switchModeText.textContent = "Don't have an account?";
            switchModeLink.textContent = 'Sign up';
            nameField.style.display = 'none';
            companyField.style.display = 'none';
            termsCheckbox.style.display = 'none';
            authSubmitBtn.textContent = 'Send Magic Code';
        }
        
        resetAuthForm();
    }

    // Mode switch handler
    if (switchModeLink) {
        switchModeLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchMode(!isSignUpMode);
        });
    }

    // Open login modal
    if (loginBtn) {
        console.log('Login button found, adding click handler');
        loginBtn.addEventListener('click', function(e) {
            console.log('Login button clicked');
            e.preventDefault();
            
            if (!loginModal) {
                console.error('Login modal not found!');
                alert('Login modal not found. Please refresh the page.');
                return;
            }
            
            resetAuthForm();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal should be visible now');
        });
    } else {
        console.error('Login button not found!');
    }

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            console.log('Close button clicked');
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
            
            // Check if Auth is available
            if (typeof Auth === 'undefined') {
                showAuthMessage('Authentication system not loaded. Please refresh the page.', 'error');
                return;
            }
            
            // Note: Google OAuth requires configuration in InstantDB dashboard
            // See OAUTH_SETUP.md for complete setup instructions
            
            showAuthMessage('Google OAuth needs to be configured. See OAUTH_SETUP.md for instructions.', 'info');
            
            // Production implementation (uncomment after configuration):
            /*
            const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
            
            if (typeof google !== 'undefined' && google.accounts) {
                google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: async (response) => {
                        console.log('Google response received:', response);
                        showAuthMessage('Signing in with Google...', 'info');
                        
                        try {
                            const result = await Auth.signInWithGoogle(response.credential);
                            if (result.success) {
                                showAuthMessage('Login successful!', 'success');
                                setTimeout(() => {
                                    loginModal.classList.remove('active');
                                    document.body.style.overflow = 'auto';
                                    resetAuthForm();
                                }, 1000);
                            } else {
                                showAuthMessage(result.error || 'Google login failed', 'error');
                            }
                        } catch (error) {
                            console.error('Google auth error:', error);
                            showAuthMessage('Error signing in with Google', 'error');
                        }
                    }
                });
                google.accounts.id.prompt();
            } else {
                showAuthMessage('Google Sign-In library not loaded', 'error');
            }
            */
        });
    }

    // Apple Login Handler
    if (appleLoginBtn) {
        appleLoginBtn.addEventListener('click', async function() {
            console.log('Apple login initiated');
            
            // Check if Auth is available
            if (typeof Auth === 'undefined') {
                showAuthMessage('Authentication system not loaded. Please refresh the page.', 'error');
                return;
            }
            
            // Note: Apple Sign-In requires configuration in InstantDB dashboard
            // See OAUTH_SETUP.md for complete setup instructions
            
            showAuthMessage('Apple Sign-In needs to be configured. See OAUTH_SETUP.md for instructions.', 'info');
            
            // Production implementation (uncomment after configuration):
            /*
            const APPLE_CLIENT_ID = 'com.landingpagem.web';
            
            if (typeof AppleID !== 'undefined') {
                try {
                    AppleID.auth.init({
                        clientId: APPLE_CLIENT_ID,
                        scope: 'name email',
                        redirectURI: window.location.origin + '/apple-callback',
                        usePopup: true
                    });
                    
                    const response = await AppleID.auth.signIn();
                    console.log('Apple response received:', response);
                    showAuthMessage('Signing in with Apple...', 'info');
                    
                    const result = await Auth.signInWithApple(response.authorization.id_token);
                    if (result.success) {
                        showAuthMessage('Login successful!', 'success');
                        setTimeout(() => {
                            loginModal.classList.remove('active');
                            document.body.style.overflow = 'auto';
                            resetAuthForm();
                        }, 1000);
                    } else {
                        showAuthMessage(result.error || 'Apple login failed', 'error');
                    }
                } catch (error) {
                    console.error('Apple auth error:', error);
                    showAuthMessage('Error signing in with Apple', 'error');
                }
            } else {
                showAuthMessage('Apple Sign-In library not loaded', 'error');
            }
            */
        });
    }

    // Email/Magic Code Login Handler
    if (emailLoginForm) {
        emailLoginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Check if Auth is available
            if (typeof Auth === 'undefined') {
                showAuthMessage('Authentication system not loaded. Please refresh the page.', 'error');
                console.error('Auth is not defined');
                return;
            }
            
            if (!isCodeStep) {
                // Step 1: Validate and send magic code
                
                // Validate sign up fields
                if (isSignUpMode) {
                    const fullName = fullNameInput?.value?.trim();
                    const company = companyInput?.value?.trim();
                    const agreeTerms = agreeTermsCheckbox?.checked;
                    
                    if (!fullName) {
                        showAuthMessage('Please enter your full name', 'error');
                        fullNameInput?.focus();
                        return;
                    }
                    
                    if (fullName.length < 2) {
                        showAuthMessage('Please enter a valid name', 'error');
                        fullNameInput?.focus();
                        return;
                    }
                    
                    if (!agreeTerms) {
                        showAuthMessage('Please agree to the Terms of Service', 'error');
                        return;
                    }
                    
                    // Store profile data for after verification
                    userProfile = {
                        name: fullName,
                        company: company || '',
                        email: emailInput?.value?.trim()
                    };
                }
                
                const email = emailInput?.value?.trim();
                if (!email) {
                    showAuthMessage('Please enter your email', 'error');
                    return;
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    showAuthMessage('Please enter a valid email address', 'error');
                    return;
                }
                
                authSubmitBtn.disabled = true;
                authSubmitBtn.textContent = 'Sending...';
                showAuthMessage('Sending magic code...', 'info');
                
                try {
                    const result = await Auth.signInWithEmail(email);
                    
                    authSubmitBtn.disabled = false;
                    
                    if (result.success) {
                        currentEmail = email;
                        isCodeStep = true;
                        emailStep.style.display = 'none';
                        codeStep.style.display = 'block';
                        if (nameField) nameField.style.display = 'none';
                        if (companyField) companyField.style.display = 'none';
                        if (termsCheckbox) termsCheckbox.style.display = 'none';
                        authSubmitBtn.textContent = 'Verify Code';
                        backToEmail.style.display = 'inline';
                        showAuthMessage(result.message, 'success');
                        setTimeout(() => codeInput?.focus(), 100);
                    } else {
                        showAuthMessage(result.error || 'Failed to send magic code', 'error');
                        authSubmitBtn.textContent = isSignUpMode ? 'Create Account' : 'Send Magic Code';
                    }
                } catch (error) {
                    console.error('Send magic code error:', error);
                    showAuthMessage('Error sending magic code. Please try again.', 'error');
                    authSubmitBtn.disabled = false;
                    authSubmitBtn.textContent = isSignUpMode ? 'Create Account' : 'Send Magic Code';
                }
            } else {
                // Step 2: Verify code and create/update profile
                const code = codeInput?.value?.trim();
                if (!code) {
                    showAuthMessage('Please enter the verification code', 'error');
                    return;
                }
                
                if (code.length !== 6) {
                    showAuthMessage('Verification code must be 6 digits', 'error');
                    return;
                }
                
                authSubmitBtn.disabled = true;
                authSubmitBtn.textContent = 'Verifying...';
                showAuthMessage('Verifying code...', 'info');
                
                try {
                    const result = await Auth.verifyMagicCode(currentEmail, code);
                    
                    authSubmitBtn.disabled = false;
                    
                    if (result.success) {
                        // If sign up, update user profile with collected data
                        if (isSignUpMode && userProfile.name) {
                            showAuthMessage('Setting up your profile...', 'info');
                            
                            try {
                                await Auth.updateUserProfile({
                                    name: userProfile.name,
                                    company: userProfile.company,
                                    plan: 'free'
                                });
                                
                                // Track sign up event
                                Auth.trackEvent('user_signup', {
                                    method: 'email',
                                    hasCompany: !!userProfile.company
                                });
                                
                                showAuthMessage(`Welcome aboard, ${userProfile.name.split(' ')[0]}! 🎉`, 'success');
                            } catch (profileError) {
                                console.error('Profile update error:', profileError);
                                // Continue anyway - user is authenticated
                            }
                        } else {
                            showAuthMessage('Login successful!', 'success');
                        }
                        
                        setTimeout(() => {
                            loginModal.classList.remove('active');
                            document.body.style.overflow = 'auto';
                            resetAuthForm();
                            isSignUpMode = false;
                            switchMode(false);
                        }, 1500);
                    } else {
                        showAuthMessage(result.error || 'Invalid code', 'error');
                        authSubmitBtn.textContent = 'Verify Code';
                    }
                } catch (error) {
                    console.error('Verify code error:', error);
                    showAuthMessage('Error verifying code. Please try again.', 'error');
                    authSubmitBtn.disabled = false;
                    authSubmitBtn.textContent = 'Verify Code';
                }
            }
        });
    }

    // Sign up link handler - removed, now using switchModeLink
    
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

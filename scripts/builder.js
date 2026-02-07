// App Builder Functionality with InstantDB
document.addEventListener('DOMContentLoaded', function() {
    // Check auth and load project if editing
    const user = Auth?.getCurrentUser();
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    let currentProject = null;
    
    // Elements
    const promptInput = document.getElementById('promptInput');
    const charCount = document.getElementById('charCount');
    const voiceBtn = document.getElementById('voiceBtn');
    const clearBtn = document.getElementById('clearBtn');
    const buildBtn = document.getElementById('buildBtn');
    const saveProjectBtn = document.getElementById('saveProjectBtn');
    const projectTitleInput = document.getElementById('projectTitle');
    const generationStatus = document.getElementById('generationStatus');
    const previewContainer = document.getElementById('previewContainer');
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Load project if editing
    if (projectId && user) {
        loadProject(projectId);
    }
    
    // Save project handler
    if (saveProjectBtn) {
        saveProjectBtn.addEventListener('click', saveProject);
    }
    
    // Auto-save on significant changes (debounced)
    let autoSaveTimeout;
    function scheduleAutoSave() {
        if (!user) return;
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            if (currentProject) {
                saveProject(true); // Silent auto-save
            }
        }, 5000); // Auto-save after 5 seconds of inactivity
    }
    
    if (promptInput) {
        promptInput.addEventListener('input', scheduleAutoSave);
    }
    
    // Model selection
    const modelOptions = document.querySelectorAll('.model-option');
    modelOptions.forEach(option => {
        option.addEventListener('click', function() {
            modelOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
    
    // Character counter
    if (promptInput && charCount) {
        promptInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = `${count} character${count !== 1 ? 's' : ''}`;
        });
    }
    
    // Example prompts
    const examplePrompts = {
        fitness: "I want to build a fitness tracking app where users can log their workouts, track calories burned, set weekly goals, and see their progress in beautiful charts. Include social features so users can share achievements with friends and compete on leaderboards. Add a meal planner with nutrition tracking and integrate with popular fitness wearables.",
        
        finance: "Create a personal finance management app that helps users track income and expenses, create budgets, and visualize spending patterns with interactive charts. Include bill reminders, savings goals, investment portfolio tracking, and automatic categorization of transactions. Add bank account integration and generate monthly financial reports.",
        
        social: "Build a social networking app focused on connecting people with similar hobbies and interests. Users can create profiles, join interest-based groups, share posts with photos and videos, comment and like content, and chat in real-time. Include event planning features, location-based recommendations, and a discovery feed with personalized content.",
        
        ecommerce: "Design an e-commerce mobile app for selling handmade crafts and artisan products. Include product browsing with filters, shopping cart, secure checkout with multiple payment options, order tracking, user reviews and ratings, wishlist functionality, and push notifications for deals and order updates. Add seller profiles and a search feature with autocomplete."
    };
    
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const example = this.dataset.example;
            if (promptInput && examplePrompts[example]) {
                promptInput.value = examplePrompts[example];
                promptInput.dispatchEvent(new Event('input'));
                promptInput.focus();
                
                // Smooth scroll to prompt
                promptInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Voice input
    let recognition;
    let isListening = false;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = function(event) {
            let interimTranscript = '';
            let finalTranscript = '';
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }
            
            if (finalTranscript) {
                promptInput.value += finalTranscript;
                promptInput.dispatchEvent(new Event('input'));
            }
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopListening();
            alert('Voice recognition error: ' + event.error);
        };
        
        recognition.onend = function() {
            if (isListening) {
                stopListening();
            }
        };
    }
    
    function startListening() {
        if (recognition) {
            isListening = true;
            voiceBtn.classList.add('listening');
            recognition.start();
        } else {
            alert('Voice recognition is not supported in your browser. Please try Chrome or Edge.');
        }
    }
    
    function stopListening() {
        if (recognition) {
            isListening = false;
            voiceBtn.classList.remove('listening');
            recognition.stop();
        }
    }
    
    if (voiceBtn) {
        voiceBtn.addEventListener('click', function() {
            if (isListening) {
                stopListening();
            } else {
                startListening();
            }
        });
    }
    
    // Clear prompt
    if (clearBtn && promptInput) {
        clearBtn.addEventListener('click', function() {
            promptInput.value = '';
            promptInput.dispatchEvent(new Event('input'));
            promptInput.focus();
        });
    }
    
    // Build app functionality
    if (buildBtn) {
        buildBtn.addEventListener('click', async function() {
            const prompt = promptInput.value.trim();
            
            if (!prompt) {
                alert('Please describe what you want to build before clicking "Build My App"');
                promptInput.focus();
                return;
            }
            
            if (prompt.length < 20) {
                alert('Please provide a more detailed description (at least 20 characters)');
                promptInput.focus();
                return;
            }
            
            // Check if user is logged in
            const user = Auth?.getCurrentUser();
            if (!user) {
                alert('Please log in to build apps');
                window.location.href = 'index.html';
                return;
            }
            
            // Save project first if not saved
            if (!currentProject) {
                await saveProject(true);
            }
            
            // Get selected options
            const selectedModel = document.querySelector('input[name="model"]:checked').value;
            const selectedPlatforms = Array.from(document.querySelectorAll('input[name="platform"]:checked'))
                .map(cb => cb.value);
            const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked'))
                .map(cb => cb.value);
            const selectedStyle = document.getElementById('styleSelect').value;
            
            const config = {
                prompt,
                model: selectedModel,
                platforms: selectedPlatforms,
                features: selectedFeatures,
                style: selectedStyle
            };
            
            console.log('Building app with config:', config);
            await startGeneration(config, user.id);
        });
    }
    
    // Generation process
    async function startGeneration(config, userId) {
        const db = window.InstantDBClient?.getDB();
        
        // Update project status
        if (currentProject && db) {
            await db.transact([
                db.tx.projects[currentProject.id].update({
                    status: 'generating',
                    updatedAt: new Date().toISOString()
                })
            ]);
        }
        
        // Create generation record
        let generationId;
        if (db && currentProject) {
            generationId = db.id();
            await db.transact([
                db.tx.generations[generationId].update({
                    projectId: currentProject.id,
                    userId: userId,
                    status: 'generating',
                    generatedAt: new Date().toISOString()
                })
            ]);
            
            Auth.trackEvent('generation_started', { 
                projectId: currentProject.id,
                generationId,
                model: config.model
            });
        }
        
        // Disable build button
        buildBtn.disabled = true;
        buildBtn.textContent = 'Building...';
        
        // Show generation status
        generationStatus.classList.add('active');
        previewContainer.classList.remove('active');
        
        // Scroll to status
        generationStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Simulate generation stages
        const stages = [
            { progress: 10, title: 'Analyzing requirements...', message: 'Understanding your app description and requirements', duration: 1000 },
            { progress: 25, title: 'Setting up project structure...', message: 'Creating project files and folder structure', duration: 1500 },
            { progress: 40, title: 'Generating UI components...', message: 'Designing beautiful user interface components', duration: 2000 },
            { progress: 60, title: 'Writing application logic...', message: 'Implementing features and functionality with AI', duration: 2500 },
            { progress: 75, title: 'Integrating selected features...', message: 'Adding authentication, database, and other features', duration: 2000 },
            { progress: 90, title: 'Optimizing and testing...', message: 'Ensuring quality and performance', duration: 1500 },
            { progress: 100, title: 'Your app is ready!', message: 'Successfully generated your application', duration: 1000 }
        ];
        
        let currentStage = 0;
        const startTime = Date.now();
        
        function processStage() {
            if (currentStage < stages.length) {
                const stage = stages[currentStage];
                
                // Update UI
                statusTitle.textContent = stage.title;
                statusMessage.textContent = stage.message;
                progressFill.style.width = stage.progress + '%';
                progressText.textContent = stage.progress + '%';
                
                currentStage++;
                
                // Move to next stage
                setTimeout(processStage, stage.duration);
            } else {
                // Generation complete
                const duration = Math.floor((Date.now() - startTime) / 1000);
                completeGeneration(config, generationId, duration);
            }
        }
        
        processStage();
    }
    
    async function completeGeneration(config, generationId, duration) {
        const db = window.InstantDBClient?.getDB();
        
        // Update generation record
        if (db && generationId) {
            await db.transact([
                db.tx.generations[generationId].update({
                    status: 'completed',
                    duration: duration,
                    code: {
                        files: [
                            'index.html',
                            'styles.css',
                            'app.js',
                            'components/',
                            'config.json',
                            'README.md'
                        ]
                    }
                })
            ]);
            
            Auth.trackEvent('generation_completed', { 
                generationId,
                duration,
                model: config.model
            });
        }
        
        // Update project status
        if (db && currentProject) {
            await db.transact([
                db.tx.projects[currentProject.id].update({
                    status: 'completed',
                    updatedAt: new Date().toISOString()
                })
            ]);
        }
        
        // Hide generation status
        setTimeout(() => {
            generationStatus.classList.remove('active');
            
            // Show preview
            previewContainer.classList.add('active');
            
            // Generate preview content
            generatePreview(config);
            
            // Re-enable build button
            buildBtn.disabled = false;
            buildBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H11V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11H13V3Z" fill="white"/>
                </svg>
                Build My App
            `;
            
            // Scroll to preview
            previewContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show success message
            showSuccessMessage(config);
        }, 500);
    }
    
    function generatePreview(config) {
        const previewContent = document.querySelector('.preview-content');
        
        // Create a nice preview showing what was built
        const platformsList = config.platforms.map(p => 
            p.charAt(0).toUpperCase() + p.slice(1)
        ).join(', ');
        
        const featuresList = config.features.length > 0 
            ? config.features.map(f => {
                const featureNames = {
                    auth: 'User Authentication',
                    database: 'Database Integration',
                    api: 'REST API',
                    realtime: 'Real-time Updates',
                    payments: 'Payment Integration',
                    notifications: 'Push Notifications'
                };
                return featureNames[f] || f;
            }).join(', ')
            : 'Basic features';
        
        previewContent.innerHTML = `
            <div style="text-align: left; max-width: 600px; width: 100%;">
                <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 2rem; border-radius: 0.75rem; color: white; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">✨ App Generated Successfully!</h3>
                    <p style="opacity: 0.9;">Your app is ready to be deployed and tested</p>
                </div>
                
                <div style="background: white; padding: 1.5rem; border-radius: 0.75rem; border: 2px solid #e5e7eb; margin-bottom: 1rem;">
                    <h4 style="font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">📋 Project Summary</h4>
                    <div style="display: grid; gap: 0.75rem;">
                        <div>
                            <strong style="color: #6b7280;">AI Model:</strong>
                            <span style="color: #1a1a1a; margin-left: 0.5rem;">${config.model.toUpperCase()}</span>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Platforms:</strong>
                            <span style="color: #1a1a1a; margin-left: 0.5rem;">${platformsList}</span>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Features:</strong>
                            <span style="color: #1a1a1a; margin-left: 0.5rem;">${featuresList}</span>
                        </div>
                        <div>
                            <strong style="color: #6b7280;">Style:</strong>
                            <span style="color: #1a1a1a; margin-left: 0.5rem;">${config.style.charAt(0).toUpperCase() + config.style.slice(1)}</span>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f9fafb; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
                    <h4 style="font-weight: 700; margin-bottom: 1rem; color: #1a1a1a;">📦 Generated Files</h4>
                    <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem;">
                        <li style="color: #6b7280;">📄 index.html</li>
                        <li style="color: #6b7280;">🎨 styles.css</li>
                        <li style="color: #6b7280;">⚡ app.js</li>
                        <li style="color: #6b7280;">📱 components/</li>
                        <li style="color: #6b7280;">🔧 config.json</li>
                        <li style="color: #6b7280;">📝 README.md</li>
                    </ul>
                </div>
                
                <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(99, 102, 241, 0.1); border-radius: 0.5rem; border-left: 4px solid #6366f1;">
                    <p style="color: #1a1a1a; margin: 0;">
                        <strong>💡 Next Steps:</strong> You can now download the code, deploy to vibecode.dev, or continue customizing your app.
                    </p>
                </div>
            </div>
        `;
    }
    
    function showSuccessMessage(config) {
        // You could show a toast notification here
        console.log('App generated successfully!', config);
    }
    
    // Preview actions
    const refreshPreview = document.getElementById('refreshPreview');
    if (refreshPreview) {
        refreshPreview.addEventListener('click', function() {
            alert('Preview refresh functionality would reload the app preview here.');
        });
    }
    
    const downloadCode = document.getElementById('downloadCode');
    if (downloadCode) {
        downloadCode.addEventListener('click', function() {
            if (!previewContainer.classList.contains('active')) {
                alert('Please build an app first before downloading the code.');
                return;
            }
            
            alert('In production, this would:\n\n1. Package all generated code into a ZIP file\n2. Include project structure and dependencies\n3. Add setup instructions in README\n4. Download to your device\n\nFor now, this is a demo of the interface.');
        });
    }
});

// Project Management Functions
async function saveProject(silent = false) {
    const user = Auth?.getCurrentUser();
    if (!user) {
        if (!silent) alert('Please log in to save projects');
        return;
    }
    
    const db = window.InstantDBClient?.getDB();
    if (!db) {
        if (!silent) alert('Database not initialized');
        return;
    }
    
    const title = document.getElementById('projectTitle').value.trim();
    const prompt = document.getElementById('promptInput').value.trim();
    
    if (!title) {
        if (!silent) alert('Please enter a project name');
        document.getElementById('projectTitle').focus();
        return;
    }
    
    if (!prompt) {
        if (!silent) alert('Please enter a project description');
        return;
    }
    
    // Get all configuration
    const config = getCurrentConfig();
    
    try {
        if (currentProject) {
            // Update existing project
            await db.transact([
                db.tx.projects[currentProject.id].update({
                    title,
                    description: prompt.substring(0, 200),
                    prompt,
                    model: config.model,
                    platforms: config.platforms,
                    features: config.features,
                    style: config.style,
                    updatedAt: new Date().toISOString()
                })
            ]);
            
            if (!silent) {
                showNotification('Project updated successfully!', 'success');
            }
            
            Auth.trackEvent('project_updated', { projectId: currentProject.id });
        } else {
            // Create new project
            const projectId = db.id();
            await db.transact([
                db.tx.projects[projectId].update({
                    userId: user.id,
                    title,
                    description: prompt.substring(0, 200),
                    prompt,
                    model: config.model,
                    platforms: config.platforms,
                    features: config.features,
                    style: config.style,
                    status: 'draft',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                })
            ]);
            
            currentProject = { id: projectId };
            
            // Update URL
            window.history.replaceState({}, '', `app-builder.html?project=${projectId}`);
            
            if (!silent) {
                showNotification('Project saved successfully!', 'success');
            }
            
            Auth.trackEvent('project_created', { projectId });
        }
    } catch (error) {
        console.error('Error saving project:', error);
        if (!silent) {
            alert('Failed to save project. Please try again.');
        }
    }
}

async function loadProject(projectId) {
    const db = window.InstantDBClient?.getDB();
    if (!db) return;
    
    try {
        const { data, error } = await db.query({
            projects: {
                $: {
                    where: {
                        id: projectId
                    }
                }
            }
        });
        
        if (error || !data?.projects?.[0]) {
            alert('Project not found');
            window.location.href = 'dashboard.html';
            return;
        }
        
        const project = data.projects[0];
        currentProject = project;
        
        // Populate form
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('promptInput').value = project.prompt;
        
        // Set model
        const modelRadio = document.querySelector(`input[name="model"][value="${project.model}"]`);
        if (modelRadio) {
            modelRadio.checked = true;
            modelRadio.closest('.model-option').classList.add('active');
        }
        
        // Set platforms
        (project.platforms || []).forEach(platform => {
            const checkbox = document.querySelector(`input[name="platform"][value="${platform.toLowerCase()}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        // Set features
        (project.features || []).forEach(feature => {
            const checkbox = document.querySelector(`input[name="feature"][value="${feature}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        // Set style
        const styleSelect = document.getElementById('styleSelect');
        if (styleSelect) {
            styleSelect.value = project.style;
        }
        
        // Update character count
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = `${project.prompt.length} character${project.prompt.length !== 1 ? 's' : ''}`;
        }
        
        showNotification('Project loaded', 'success');
    } catch (error) {
        console.error('Error loading project:', error);
        alert('Failed to load project');
    }
}

function getCurrentConfig() {
    return {
        model: document.querySelector('input[name="model"]:checked')?.value || 'gpt5',
        platforms: Array.from(document.querySelectorAll('input[name="platform"]:checked')).map(cb => cb.value),
        features: Array.from(document.querySelectorAll('input[name="feature"]:checked')).map(cb => cb.value),
        style: document.getElementById('styleSelect')?.value || 'modern'
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);


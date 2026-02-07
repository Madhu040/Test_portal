// Dashboard Functionality with InstantDB
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Initialize dashboard
    initDashboard();
    
    // Logout handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            await Auth.signOut();
            window.location.href = 'index.html';
        });
    }
});

function checkAuth() {
    if (typeof Auth === 'undefined' || !Auth.isAuthenticated()) {
        // Redirect to home page if not authenticated
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

async function initDashboard() {
    const db = window.InstantDBClient.getDB();
    if (!db) {
        console.error('Database not initialized');
        return;
    }
    
    const user = Auth.getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update user info
    updateUserInfo(user);
    
    // Load projects
    loadProjects(db, user.id);
    
    // Set up search and filters
    setupFilters();
}

function updateUserInfo(user) {
    const userName = user.email ? user.email.split('@')[0] : 'User';
    const userInitials = userName.substring(0, 2).toUpperCase();
    
    document.getElementById('welcomeMessage').textContent = `Welcome back, ${userName}!`;
    document.getElementById('userEmail').textContent = user.email || '';
    document.getElementById('userInitials').textContent = userInitials;
    
    // Set plan if available
    const planSelector = document.getElementById('planSelector');
    if (user.plan) {
        planSelector.value = user.plan;
    }
}

async function loadProjects(db, userId) {
    const loadingEl = document.getElementById('loadingProjects');
    const emptyEl = document.getElementById('emptyState');
    const gridEl = document.getElementById('projectsGrid');
    
    try {
        // Query projects for current user
        const { data, error } = await db.query({
            projects: {
                $: {
                    where: {
                        userId: userId
                    }
                }
            },
            generations: {
                $: {
                    where: {
                        userId: userId
                    }
                }
            }
        });
        
        if (error) {
            console.error('Error loading projects:', error);
            loadingEl.style.display = 'none';
            emptyEl.style.display = 'block';
            return;
        }
        
        const projects = data?.projects || [];
        const generations = data?.generations || [];
        
        // Update stats
        updateStats(projects, generations);
        
        // Display projects
        if (projects.length === 0) {
            loadingEl.style.display = 'none';
            emptyEl.style.display = 'block';
        } else {
            loadingEl.style.display = 'none';
            gridEl.style.display = 'grid';
            renderProjects(projects);
        }
        
    } catch (error) {
        console.error('Error in loadProjects:', error);
        loadingEl.style.display = 'none';
        emptyEl.style.display = 'block';
    }
}

function updateStats(projects, generations) {
    const totalProjects = projects.length;
    const totalGenerations = generations.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const draftProjects = projects.filter(p => p.status === 'draft').length;
    
    document.getElementById('totalProjects').textContent = totalProjects;
    document.getElementById('totalGenerations').textContent = totalGenerations;
    document.getElementById('completedProjects').textContent = completedProjects;
    document.getElementById('draftProjects').textContent = draftProjects;
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.projectId = project.id;
    
    // Determine gradient based on style
    const gradients = {
        modern: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        dark: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        classic: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        playful: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    };
    
    const gradient = gradients[project.style] || gradients.modern;
    
    // Get platform icons
    const platforms = project.platforms || [];
    const platformIcons = platforms.map(p => {
        const icons = {
            ios: '🍎',
            android: '🤖',
            web: '🌐'
        };
        return icons[p.toLowerCase()] || '📱';
    }).join('');
    
    // Format date
    const date = new Date(project.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    card.innerHTML = `
        <div class="project-thumbnail" style="background: ${gradient};">
            <span style="font-size: 3rem;">${platformIcons || '📱'}</span>
        </div>
        <div class="project-content">
            <div class="project-header">
                <h3 class="project-title">${escapeHtml(project.title)}</h3>
                <p class="project-description">${escapeHtml(project.description || project.prompt.substring(0, 100) + '...')}</p>
            </div>
            <div class="project-meta">
                <span class="project-date">${formattedDate}</span>
                <span class="project-status status-${project.status}">${project.status}</span>
            </div>
            <div class="project-platforms">
                ${platforms.map(p => `<div class="platform-icon" title="${p}">${p.substring(0, 3)}</div>`).join('')}
            </div>
            <div class="project-actions">
                <button class="action-btn" onclick="openProject('${project.id}')">Open</button>
                <button class="action-btn" onclick="editProject('${project.id}')">Edit</button>
                <button class="action-btn" onclick="deleteProject('${project.id}')">Delete</button>
            </div>
        </div>
    `;
    
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function setupFilters() {
    const searchInput = document.getElementById('searchProjects');
    const filterStatus = document.getElementById('filterStatus');
    const sortProjects = document.getElementById('sortProjects');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSortProjects);
    }
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filterAndSortProjects);
    }
    
    if (sortProjects) {
        sortProjects.addEventListener('change', filterAndSortProjects);
    }
}

function filterAndSortProjects() {
    const searchTerm = document.getElementById('searchProjects').value.toLowerCase();
    const statusFilter = document.getElementById('filterStatus').value;
    const sortBy = document.getElementById('sortProjects').value;
    
    const cards = Array.from(document.querySelectorAll('.project-card'));
    
    cards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const status = card.querySelector('.project-status').textContent;
        
        // Filter by search
        const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
        
        // Filter by status
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        
        // Show/hide card
        card.style.display = (matchesSearch && matchesStatus) ? 'block' : 'none';
    });
    
    // Sort visible cards
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    const grid = document.getElementById('projectsGrid');
    
    visibleCards.sort((a, b) => {
        const titleA = a.querySelector('.project-title').textContent;
        const titleB = b.querySelector('.project-title').textContent;
        const dateA = a.querySelector('.project-date').textContent;
        const dateB = b.querySelector('.project-date').textContent;
        
        switch(sortBy) {
            case 'name':
                return titleA.localeCompare(titleB);
            case 'oldest':
                return new Date(dateA) - new Date(dateB);
            case 'newest':
            default:
                return new Date(dateB) - new Date(dateA);
        }
    });
    
    // Reorder in DOM
    visibleCards.forEach(card => grid.appendChild(card));
}

// Project actions
window.openProject = function(projectId) {
    window.location.href = `app-builder.html?project=${projectId}`;
};

window.editProject = function(projectId) {
    window.location.href = `app-builder.html?project=${projectId}&edit=true`;
};

window.deleteProject = async function(projectId) {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        return;
    }
    
    const db = window.InstantDBClient.getDB();
    if (!db) return;
    
    try {
        await db.transact([
            db.tx.projects[projectId].delete()
        ]);
        
        // Track analytics
        Auth.trackEvent('project_deleted', { projectId });
        
        // Reload projects
        const user = Auth.getCurrentUser();
        if (user) {
            loadProjects(db, user.id);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
    }
};

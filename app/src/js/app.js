// app.js - Main JavaScript for DevSecOps Pipeline Web App

// Configuration
const config = {
    appVersion: '1.0.0',
    buildNumber: process.env.BUILD_NUMBER || 'local',
    environment: process.env.ENVIRONMENT || 'unknown',
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    displayEnvironmentInfo();
    checkHealthStatus();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('🚀 DevSecOps Pipeline App Initialized');
    console.log(`Environment: ${config.environment}`);
    console.log(`Version: ${config.appVersion}`);
    console.log(`Build: ${config.buildNumber}`);
    
    // Set deployment time
    const deployTime = new Date().toLocaleString();
    const deployTimeElement = document.getElementById('deploy-time');
    if (deployTimeElement) {
        deployTimeElement.textContent = deployTime;
    }
}

/**
 * Setup smooth scrolling navigation
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Display environment-specific information
 */
function displayEnvironmentInfo() {
    // Detect environment from hostname or injected env variable
    let environment = 'dev'; // default
    const hostname = window.location.hostname;
    
    if (hostname.includes('prod') || hostname.includes('production')) {
        environment = 'prod';
    } else if (hostname.includes('stage') || hostname.includes('staging')) {
        environment = 'stage';
    } else if (hostname.includes('dev') || hostname.includes('development')) {
        environment = 'dev';
    }
    
    // Try to get from meta tag (injected by ConfigMap)
    const envMeta = document.querySelector('meta[name="environment"]');
    if (envMeta) {
        environment = envMeta.content;
    }
    
    // Update environment badge
    const envBadge = document.getElementById('env-name');
    if (envBadge) {
        envBadge.textContent = `Environment: ${environment.toUpperCase()}`;
        
        // Apply environment-specific styling
        const badge = envBadge.parentElement;
        switch(environment.toLowerCase()) {
            case 'prod':
            case 'production':
                badge.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                break;
            case 'stage':
            case 'staging':
                badge.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
                break;
            case 'dev':
            case 'development':
                badge.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
                break;
            default:
                badge.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
        }
    }
    
    // Update version info
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        versionElement.textContent = `Version: ${config.appVersion}`;
    }
    
    const buildElement = document.getElementById('build-number');
    if (buildElement) {
        buildElement.textContent = `Build: ${config.buildNumber}`;
    }
}

/**
 * Check application health status
 */
function checkHealthStatus() {
    const healthElement = document.getElementById('health-status');
    
    if (healthElement) {
        // Simulate health check
        const isHealthy = true; // In real scenario, this would be an API call
        
        if (isHealthy) {
            healthElement.innerHTML = '● Healthy';
            healthElement.className = 'status-healthy';
        } else {
            healthElement.innerHTML = '● Unhealthy';
            healthElement.className = 'status-unhealthy';
        }
    }
}

/**
 * Add intersection observer for scroll animations
 */
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

/**
 * Console Easter Egg
 */
console.log(`
%c
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║      🚀 DevSecOps CI/CD Pipeline                     ║
║                                                       ║
║      Built with:                                      ║
║      • Kubernetes (AWS EKS)                          ║
║      • ArgoCD (GitOps)                               ║
║      • GitHub Actions                                 ║
║      • Docker                                         ║
║                                                       ║
║      Version: ${config.appVersion}                            ║
║      Environment: ${config.environment}                      ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
`, 'color: #2563eb; font-weight: bold;');

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        setupNavigation,
        displayEnvironmentInfo,
        checkHealthStatus
    };
}

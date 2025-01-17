import { setupCarousel } from './carousel.js';
import { setupTyping } from './typing.js';
import { setupDarkMode } from './darkmode.js';
import { router } from './router.js';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    router.init();
    
    // Setup navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            router.navigate(page);
        });
    });
});

// Handle browser navigation
window.addEventListener('popstate', () => {
    router.handleLocation();
});
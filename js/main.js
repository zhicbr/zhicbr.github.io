import { setupCarousel } from './carousel.js';
import { setupTyping } from './typing.js';
import { setupDarkMode } from './darkmode.js';
import { router } from './router.js';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        router.init();
    } else {
        // 移动端由 mobile.js 初始化
        console.log('Mobile device detected, router handled by mobile.js');
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            router.navigate(page);
        });
    });
    // Initialize TOC
    setupTOC();
});

// Handle browser navigation
window.addEventListener('popstate', () => {
    router.handleLocation();
});

// TOC Functions
function setupTOC() {
    const tocContainer = document.querySelector('.article-toc');
    if (!tocContainer) return;

    // Generate TOC
    const headings = document.querySelectorAll('.markdown-content h2, .markdown-content h3');
    const tocList = document.createElement('ul');
    tocList.className = 'toc-list';

    headings.forEach(heading => {
        const level = heading.tagName.toLowerCase();
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;

        const tocItem = document.createElement('li');
        tocItem.className = `toc-item toc-${level}`;
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        
        tocItem.appendChild(link);
        tocList.appendChild(tocItem);
    });

    // Add toggle functionality
    const toggleBtn = tocContainer.querySelector('.toc-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            tocContainer.classList.toggle('collapsed');
            toggleBtn.textContent = tocContainer.classList.contains('collapsed') ? '▶' : '▼';
        });
    }

    // Add scroll spy
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const tocLink = tocContainer.querySelector(`a[href="#${id}"]`);
            if (tocLink) {
                tocLink.classList.toggle('active', entry.isIntersecting);
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    });

    headings.forEach(heading => observer.observe(heading));

    // Add smooth scroll
    tocList.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const target = document.querySelector(e.target.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    tocContainer.appendChild(tocList);
}

function renderArticle(content) {
    const articleContent = document.querySelector('.article-content');
    articleContent.innerHTML = marked.parse(content);
    articleContent.classList.add('markdown-content');
    setupTOC();
}

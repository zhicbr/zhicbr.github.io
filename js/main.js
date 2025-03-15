// js/main.js
import { setupCarousel } from './carousel.js';
import { setupTyping } from './typing.js';
import { setupDarkMode } from './darkmode.js';
import { router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    setupDarkMode();
    
    // 所有设备都初始化基础路由
    router.init();
    
    // 仅桌面端加载轮播和打字动画
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        import('./carousel.js').then(module => module.setupCarousel());
        import('./typing.js').then(module => module.setupTyping());
    }

    // 通用导航点击事件
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            router.navigate(page);
        });
    });
});

// 处理浏览器前进/后退
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

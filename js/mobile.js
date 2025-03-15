class MobileRouter {
    constructor() {
        this.init();
    }

    init() {
        this.setupViewport();
        this.setupNavigation();
        this.handleLocation();
        window.addEventListener('hashchange', () => this.handleLocation());
    }

    setupViewport() {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewportMeta);
    }

    setupNavigation() {
        const navContent = document.querySelector('.nav-content');
        if (!navContent) {
            console.error('Navigation container .nav-content not found');
            return;
        }

        // 添加移动端导航切换按钮
        const navToggle = document.createElement('div');
        navToggle.className = 'mobile-nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        navContent.appendChild(navToggle);

        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) {
            console.error('Navigation links .nav-links not found');
            return;
        }

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                router.navigate(page);
                navLinks.classList.remove('active');
            });
        });
    }

    handleLocation() {
        const hash = window.location.hash.slice(1) || 'home';
        const [page, id] = hash.split('/');
        this.loadPage(page, id);
    }

    async loadPage(page, id) {
        const app = document.getElementById('app');
        if (!app) {
            console.error('App container #app not found');
            return;
        }
        switch(page) {
            case 'home':
                app.innerHTML = await router.getHomePage();
                break;
            case 'articles':
                if (id) {
                    app.innerHTML = await this.loadArticleDetail(id);
                    this.setupMobileTOC();
                } else {
                    app.innerHTML = await router.getArticlesPage();
                }
                break;
            case 'about':
                app.innerHTML = router.getAboutPage();
                break;
            default:
                app.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    async loadArticleDetail(id) {
        try {
            const response = await fetch('posts/articles.json');
            const data = await response.json();
            const article = data.articles.find(a => a.id.toString() === id);
            
            if (!article) {
                return '<div class="error">文章不存在</div>';
            }

            const markdownResponse = await fetch(`posts/${article.file}`);
            const markdownContent = await markdownResponse.text();
            const htmlContent = marked.parse(markdownContent);

            return `
                <div class="article-detail-container">
                    <div class="mobile-toc-button">
                        <i class="fas fa-list"></i>
                    </div>
                    <div class="mobile-toc-panel">
                        <div class="toc-header">
                            <span>目录</span>
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="toc-content"></div>
                    </div>
                    <div class="article-detail">
                        <h1>
                            ${article.featured ? '<i class="fas fa-star featured-star"></i>' : ''}
                            ${article.title}
                        </h1>
                        <div class="article-meta">
                            <span class="date">${article.date}</span>
                            ${article.lastEdited ? `<span class="last-edited">最后编辑时间: ${article.lastEdited}</span>` : ''}
                            <div class="article-tags">
                                ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="markdown-content">
                            ${htmlContent}
                        </div>
                        <button onclick="router.navigate('articles')" class="back-button">
                            <i class="fas fa-arrow-left"></i> 返回文章列表
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading article:', error);
            return '<div class="error">加载文章详情时出错</div>';
        }
    }

    setupMobileTOC() {
        const content = document.querySelector('.markdown-content');
        const tocContent = document.querySelector('.toc-content');
        const tocButton = document.querySelector('.mobile-toc-button');
        const tocPanel = document.querySelector('.mobile-toc-panel');
        const tocClose = document.querySelector('.toc-header .fa-times');

        if (!content || !tocContent || !tocButton || !tocPanel || !tocClose) {
            console.error('TOC elements not found');
            return;
        }

        const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let tocHTML = '<ul>';
        headings.forEach((heading, index) => {
            const level = parseInt(heading.tagName[1]);
            const id = `heading-${index}`;
            heading.id = id;
            tocHTML += `
                <li style="padding-left: ${(level - 1) * 16}px">
                    <a href="#${id}">${heading.textContent}</a>
                </li>`;
        });
        tocHTML += '</ul>';
        tocContent.innerHTML = tocHTML;

        // 平滑滚动并关闭面板
        const links = tocContent.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').slice(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
                tocPanel.classList.remove('active');
            });
        });

        // 打开/关闭目录
        tocButton.addEventListener('click', () => {
            tocPanel.classList.toggle('active');
        });
        tocClose.addEventListener('click', () => {
            tocPanel.classList.remove('active');
        });

        // 高亮当前标题
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        links.forEach(link => link.classList.remove('active'));
                        const activeLink = tocContent.querySelector(`a[href="#${entry.target.id}"]`);
                        if (activeLink) activeLink.classList.add('active');
                    }
                });
            },
            { rootMargin: '-100px 0px -50% 0px' }
        );
        headings.forEach(heading => observer.observe(heading));
    }
}

if (/Mobi|Android/i.test(navigator.userAgent)) {
    const mobileRouter = new MobileRouter();
    window.mobileRouter = mobileRouter;
}
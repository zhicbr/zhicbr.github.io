class MobileRouter {
    constructor() {
        this.init();
        // 初始加载处理
        setTimeout(() => this.handleLocation(), 50);
    }

    init() {
        this.setupViewport();
        this.setupNavigation();
        // 统一使用 hashchange 事件
        window.addEventListener('hashchange', () => {
            setTimeout(() => this.handleLocation(), 50);
        });
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
                this.navigate(page); // 使用 this.navigate 而不是 router.navigate
                navLinks.classList.remove('active');
            });
        });
    }

    handleLocation() {
        let hash = window.location.hash.slice(1);
        
        // 处理空 hash 和 home 路由
        if (!hash || hash === 'home') {
            this.loadPage('home');
            return;
        }
        
        const [page, id] = hash.split('/');
        this.loadPage(page, id);
        
        // 确保目录按钮初始化
        if (page === 'articles' && id) {
            setTimeout(() => this.setupMobileTOC(), 50);
        }
    }

    navigate(page, id) {
        const hash = id ? `#${page}/${id}` : `#${page}`;
        window.location.hash = hash; // 直接修改 hash 触发 hashchange 事件
    }

    async loadPage(page, id) {
        const app = document.getElementById('app');
        if (!app) {
            console.error('App container #app not found');
            return;
        }
        switch (page) {
            case 'home':
                app.innerHTML = await this.getHomePage();
                break;
            case 'articles':
                if (id) {
                    app.innerHTML = await this.loadArticleDetail(id);
                    this.setupMobileTOC(); // 确保立即初始化目录按钮
                } else {
                    app.innerHTML = await this.getArticlesPage();
                }
                break;
            case 'about':
                app.innerHTML = this.getAboutPage();
                break;
            default:
                app.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    async getHomePage() {
        const featuredArticles = await this.getFeaturedArticles();
        return `
            <div class="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/1737119766339.jpg" alt="Random Image 1">
                    </div>
                    <div class="carousel-item">
                        <img src="https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/1737120461614.jpg" alt="Random Image 2">
                    </div>
                </div>
            </div>
            <div class="typing-container"></div>
            <div class="featured-articles">
                <h2><i class="fas fa-star"></i> 精选文章</h2>
                <div class="article-grid">
                    ${featuredArticles}
                </div>
            </div>
        `;
    }

    async getFeaturedArticles() {
        try {
            const response = await fetch('posts/articles.json');
            const data = await response.json();
            const featuredArticles = data.articles.filter(article => article.featured);
            
            return featuredArticles.map(article => `
                <div class="article-card" onclick="mobileRouter.navigate('articles', '${article.id}')">
                    <div class="featured-badge">
                        <i class="fas fa-star"></i> 精选
                    </div>
                    <h3>${article.title}</h3>
                    <div class="article-meta">
                        <span>${article.date}</span>
                        <div class="article-tags">
                            ${article.tags.map(tag => `
                                <span class="tag">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="article-views">
                        <!-- <i class="fas fa-eye"></i> ${article.views} 次浏览 -->
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading featured articles:', error);
            return '';
        }
    }

    async getArticlesPage() {
        try {
            const response = await fetch('posts/articles.json');
            const data = await response.json();
            const { articles } = data;
            
            return `
                <h1>文章列表</h1>
                <div class="article-list">
                    ${articles.map(article => `
                        <div class="article-card" onclick="mobileRouter.navigate('articles', '${article.id}')">
                            ${article.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> 精选</div>' : ''}
                            <h2 class="article-title">${article.title}</h2>
                            <p class="article-excerpt">${article.excerpt || '文章简介...'}</p>
                            <div class="article-meta">
                                <span>${article.date}</span>
                                <div class="article-tags">
                                    ${article.tags.map(tag => `
                                        <span class="tag">${tag}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error loading articles:', error);
            return '<div class="error">加载文章列表时出错</div>';
        }
    }

    getAboutPage() {
        return `
            <div class="about-container">
                <img src="https://raw.githubusercontent.com/zhicbr/zhicbr.github.io/refs/heads/main/images/profilephoto.jpg" alt="我的头像" class="avatar">
                <h1>关于我</h1>
                <p>欢迎来到我的个人博客！</p>
                <section>
                    <h2>个人介绍</h2>
                    <p>我是一名热爱技术和创新的开发者，专注于Web开发和人工智能领域。</p>
                </section>
                <section>
                    <h2>也许</h2>
                    <blockquote>"……"</blockquote>
                </section>
                <section>
                    <h2>技能</h2>
                    <ul>
                        <li>前端开发 (vue3)</li>
                        <li>后端开发 (Node.js, java)</li>
                    </ul>
                </section>
            </div>
        `;
    }

    async loadArticleDetail(id) {
        try {
            const response = await fetch('posts/articles.json');
            if (!response.ok) {
                throw new Error('Failed to load articles.json');
            }
            const data = await response.json();
            const article = data.articles.find(a => a.id.toString() === id);
            
            if (!article) {
                return '<div class="error">文章不存在</div>';
            }

            const markdownResponse = await fetch(`posts/${article.file}`);
            if (!markdownResponse.ok) {
                throw new Error('Failed to load article markdown');
            }
            const markdownContent = await markdownResponse.text();
            const htmlContent = marked.parse(markdownContent);

            return `
                <div class="article-detail-container">
                    <div class="mobile-toc-button" ontouchstart>
                        <i class="fas fa-list"></i>
                    </div>
                    <div class="mobile-toc-panel">
                        <div class="toc-header">
                            <span>目录导航</span>
                            <i class="fas fa-times" ontouchstart></i>
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
                        <button onclick="mobileRouter.navigate('articles')" class="back-button">
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

        // 移除防抖函数依赖（避免需要 lodash）
        const togglePanel = () => {
            tocPanel.classList.toggle('active');
        };

        // 绑定点击事件（直接操作，无需防抖）
        tocButton.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            togglePanel();
            if (window.navigator.vibrate) window.navigator.vibrate(15);
        });

        tocClose.addEventListener('click', (e) => {
            e.stopPropagation();
            tocPanel.classList.remove('active');
        });

        // 点击外部关闭面板
        document.addEventListener('click', (e) => {
            if (!tocPanel.contains(e.target) && !tocButton.contains(e.target)) {
                tocPanel.classList.remove('active');
            }
        });
        tocButton.addEventListener('click', () => {
            togglePanel();
            // 添加触觉反馈 (需要设备支持)
            if (window.navigator.vibrate) {
                window.navigator.vibrate(15);
            }
        });

        tocClose.addEventListener('click', () => {
            tocPanel.classList.remove('active');
        });

        // 点击外部关闭面板
        document.addEventListener('click', (e) => {
            if (!tocPanel.contains(e.target) && !tocButton.contains(e.target)) {
                tocPanel.classList.remove('active');
            }
        });

        // 动态调整按钮位置
        window.addEventListener('resize', () => {
            const viewportHeight = window.innerHeight;
            tocButton.style.top = `${viewportHeight * 0.7}px`;
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
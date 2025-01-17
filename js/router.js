export const router = {
    init() {
        this.handleLocation();
    },

    async navigate(page, params = {}) {
        const url = params.id ? `#${page}/${params.id}` : `#${page}`;
        window.history.pushState({}, '', url);
        await this.handleLocation();
    },

    async handleLocation() {
        const hash = window.location.hash.slice(1) || 'home';
        const [page, id] = hash.split('/');
        const content = await this.getContent(page, id);
        document.getElementById('app').innerHTML = content;

        // Initialize page-specific features
        if (page === 'home') {
            import('./carousel.js').then(module => module.setupCarousel());
            import('./typing.js').then(module => module.setupTyping());
        }
    },

    async getContent(page, id) {
        switch (page) {
            case 'home':
                return this.getHomePage();
            case 'articles':
                return id ? await this.getArticleDetail(id) : await this.getArticlesPage();
            case 'about':
                return this.getAboutPage();
            default:
                return '<h1>404 - Page Not Found</h1>';
        }
    },

    async getFeaturedArticles() {
        try {
            const response = await fetch('posts/articles.json');
            const data = await response.json();
            const featuredArticles = data.articles.filter(article => article.featured);
            
            return featuredArticles.map(article => `
                <div class="article-card" onclick="router.navigate('articles', {id: '${article.id}'})">
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
                        <i class="fas fa-eye"></i> ${article.views} 次浏览
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading featured articles:', error);
            return '';
        }
    },

    async getHomePage() {
        const featuredArticles = await this.getFeaturedArticles();
        return `
            <div class="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://picsum.photos/1000/300?random=1" alt="Random Image 1">
                    </div>
                    <div class="carousel-item">
                        <img src="https://picsum.photos/1000/300?random=2" alt="Random Image 2">
                    </div>
                    <div class="carousel-item">
                        <img src="https://picsum.photos/1000/300?random=3" alt="Random Image 3">
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
    },

    async getArticlesPage() {
        try {
            const response = await fetch('posts/articles.json');
            const data = await response.json();
            const { articles } = data;
            
            return `
                <h1>文章列表</h1>
                <div class="article-grid">
                    ${articles.map(article => `
                        <div class="article-card" onclick="router.navigate('articles', {id: '${article.id}'})">
                            ${article.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> 精选</div>' : ''}
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
                                <i class="fas fa-eye"></i> ${article.views} 次浏览
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error loading articles:', error);
            return '<div class="error">加载文章列表时出错</div>';
        }
    },

    async getArticleDetail(id) {
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
                <div class="article-detail">
                    <h1>
                        ${article.featured ? '<i class="fas fa-star featured-star"></i>' : ''}
                        ${article.title}
                    </h1>
                    <div class="article-meta">
                        <span class="date">${article.date}</span>
                        <span class="views"><i class="fas fa-eye"></i> ${article.views} 次浏览</span>
                        <div class="article-tags">
                            ${article.tags.map(tag => `
                                <span class="tag">${tag}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div class="markdown-content">
                        ${htmlContent}
                    </div>
                    <button onclick="router.navigate('articles')" class="back-button">
                        <i class="fas fa-arrow-left"></i> 返回文章列表
                    </button>
                </div>
            `;
        } catch (error) {
            console.error('Error loading article:', error);
            return '<div class="error">加载文章详情时出错</div>';
        }
    },

    getAboutPage() {
        return `
            <div class="about-container">
                <img src="https://picsum.photos/200/200?random=4" alt="我的头像" class="avatar">
                <h1>关于我</h1>
                <p>欢迎来到我的个人博客！</p>
                <section>
                    <h2>个人介绍</h2>
                    <p>我是一名热爱技术和创新的开发者，专注于Web开发和人工智能领域。</p>
                </section>
                <section>
                    <h2>座右铭</h2>
                    <blockquote>"持续学习，不断进步"</blockquote>
                </section>
                <section>
                    <h2>技能</h2>
                    <ul>
                        <li>前端开发 (HTML, CSS, JavaScript)</li>
                        <li>后端开发 (Node.js, Python)</li>
                        <li>数据库设计</li>
                        <li>UI/UX设计</li>
                    </ul>
                </section>
                <section>
                    <h2>联系我</h2>
                    <p>Email: example@example.com</p>
                    <p>GitHub: github.com/example</p>
                </section>
            </div>
        `;
    }
};

// Make router globally accessible
window.router = router;
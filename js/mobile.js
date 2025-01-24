class MobileRouter {
    constructor() {
        this.init();
    }

    init() {
        this.setupViewport();
        this.setupNavigation();
        this.handleLocation();
    }

    setupViewport() {
        const viewportMeta = document.createElement('meta');
        viewportMeta.name = 'viewport';
        viewportMeta.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewportMeta);
    }

    setupNavigation() {
        const navToggle = document.createElement('div');
        navToggle.className = 'mobile-nav-toggle';
        navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('.nav-content').appendChild(navToggle);

        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#articles">文章</a></li>
                <li><a href="#about">关于我</a></li>
            </ul>
        `;
        document.body.appendChild(mobileMenu);

        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    handleLocation() {
        const hash = window.location.hash.slice(1) || 'home';
        const [page] = hash.split('/');
        this.loadPage(page);
    }

    loadPage(page) {
        switch(page) {
            case 'home':
                this.loadHomePage();
                break;
            case 'articles':
                this.loadArticlesPage();
                break;
            case 'about':
                this.loadAboutPage();
                break;
            default:
                this.load404Page();
        }
    }

    loadHomePage() {
        // Mobile specific home page logic
    }

    loadArticlesPage() {
        // Mobile specific articles page logic
    }

    loadAboutPage() {
        // Mobile specific about page logic
    }

    load404Page() {
        // Mobile specific 404 page logic
    }
}

// Initialize mobile router
if (/Mobi|Android/i.test(navigator.userAgent)) {
    const mobileRouter = new MobileRouter();
    window.mobileRouter = mobileRouter;
}

export function setupDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkTheme = document.getElementById('dark-theme');
    const icon = darkModeToggle.querySelector('i');
    
    // Check saved preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkTheme.disabled = false;
        icon.className = 'fas fa-sun';
    }

    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDarkMode) {
            document.documentElement.removeAttribute('data-theme');
            darkTheme.disabled = true;
            localStorage.setItem('darkMode', 'false');
            icon.className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            darkTheme.disabled = false;
            localStorage.setItem('darkMode', 'true');
            icon.className = 'fas fa-sun';
        }
    });
}
const root = document.documentElement;

export function setDarkMode() {
    root.style.setProperty('--primary-bg', '#060B1D');
    root.style.setProperty('--secondary-bg', '#1e293b');
    root.style.setProperty('--gray-details', '#303E51');
    root.style.setProperty('--dark-bg', '#020617');
    root.style.setProperty('--blur-bg', 'rgb(30, 41, 59, 0.5)');
    root.style.setProperty('--bg-gradient', 'linear-gradient(0deg, var(--primary-bg), var(--secondary-accent-bg-2))');
    root.style.setProperty('--bg-gradient-2', 'linear-gradient(180deg, var(--dark-bg), var(--secondary-accent-bg-2))');

    root.style.setProperty('--text', '#fff');
    root.style.setProperty('--modal-bg', 'rgba(20, 27, 39, 0.9)');

    root.style.setProperty('--primary-icon-color', 'var(--primary-light)');
    root.style.setProperty('--secondary-icon-color', 'var(--secondary-light)');
}

export function setLightMode() {
    root.style.setProperty('--primary-bg', '#fff');
    root.style.setProperty('--secondary-bg', '#F8FAFC');
    root.style.setProperty('--gray-details', '#dadee2');
    root.style.setProperty('--dark-bg', '#d6e8fa');
    root.style.setProperty('--blur-bg', 'rgb(248, 250, 252, 0.5)');
    root.style.setProperty('--bg-gradient', 'linear-gradient(0deg, var(--primary-bg), var(--primary-accent-bg-2))');
    root.style.setProperty('--bg-gradient-2', 'linear-gradient(180deg, var(--dark-bg), var(--primary-accent-bg-2))');

    root.style.setProperty('--text', '#060B1D');
    root.style.setProperty('--modal-bg', 'rgba(248, 250, 252, 0.9)');

    root.style.setProperty('--primary-icon-color', 'var(--primary)');
    root.style.setProperty('--secondary-icon-color', 'var(--secondary)');
}
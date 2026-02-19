export function setLanguage(data) {
    const images = document.querySelectorAll('img[id]');

    images.forEach(img => {
        const key = img.id;
        if (data[key]) {
            img.setAttribute('alt', data[key]);
        }
    });

    const allNodes = document.querySelectorAll('[data-i18n]');
    allNodes.forEach(node => {
        const key = node.dataset.i18n;
        
        if (data[key]) {
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.placeholder = data[key];
            } else {
                node.innerHTML = data[key];
            }
        } else {
            console.warn(`Clave de traducción faltante: ${key}`);
        }
    });
}
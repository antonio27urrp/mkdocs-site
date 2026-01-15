document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт успешно загружен и готов к работе!');

    // 1. Плавная прокрутка до якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Автоматическое обновление года в футере
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        // Заменяем текст или добавляем год, если его там нет
        footer.innerHTML += ` | ${currentYear}`;
    }

    // 3. Подсветка активного пункта меню
    const currentUrl = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Проверяем, совпадает ли ссылка с текущим адресом
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.style.fontWeight = 'bold';
            link.style.borderBottom = '2px solid white';
        }
    });
});
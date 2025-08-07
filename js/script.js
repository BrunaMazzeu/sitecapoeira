document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');

    if (hamburgerMenu && menu) {
        hamburgerMenu.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Adiciona um listener para fechar o menu quando um link é clicado
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }

    // --- LÓGICA DO FORMULÁRIO DE UNIFORME ---
    const openFormButton = document.getElementById('open-uniform-form');
    const closeFormButton = document.getElementById('close-uniform-form');
    const modal = document.getElementById('uniform-form-modal');
    const form = document.getElementById('uniform-request-form');

    if (openFormButton && modal) {
        openFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        closeFormButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pedido de uniforme enviado com sucesso! Aguarde o nosso contato.');
            modal.style.display = 'none';
            form.reset();
        });
    }

    // --- LÓGICA DO CARROSSEL ---
    const carousel = document.querySelector('.carousel');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    if (carousel && leftArrow && rightArrow) {
        const scrollAmount = 350;

        rightArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            if (carousel.scrollLeft + scrollAmount >= maxScrollLeft) {
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                }, 800);
            }
        });

        leftArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // --- LÓGICA DO FAQ ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');

    if (hamburgerMenu && menu) {
        hamburgerMenu.addEventListener('click', () => {
            menu.classList.toggle('active');
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
    
    // --- LÓGICA DO CARROSSEL (para a página inicial) ---
    const carousel = document.querySelector('.carousel');

    if (carousel) {
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');
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

    // --- LÓGICA DO FAQ (para a página inicial) ---
    const faqSection = document.querySelector('.faq-section');

    if (faqSection) {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                faqItem.classList.toggle('active');
            });
        });
    }

});
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

    const cpfInput = document.getElementById('cpf');
    const whatsappInput = document.getElementById('whatsapp');

    // --- MÁSCARA CPF ---
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    // --- MÁSCARA WHATSAPP ---
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

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
        
            // Captura os valores do formulário
            const pedidoData = {
                nome_aluno: document.getElementById('student-name').value,
                nome_responsavel: document.getElementById('responsible-name').value,
                whatsapp: document.getElementById('whatsapp').value,
                cpf: document.getElementById('cpf').value,
                professor_local: document.getElementById('class-location').value,
                tamanho_camisa_adulto: document.getElementById('adult-size').value,
                tamanho_camisa_infantil: document.getElementById('child-size').value,
                pago: 0 // inicialmente 0, depois será marcado como pago no dashboard
            };
        
            // Envia para a API
            fetch('http://localhost:3000/api/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedidoData)
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message); // exibe mensagem de sucesso
                modal.style.display = 'none';
                form.reset();
            })
            .catch(err => {
                console.error(err);
                alert('Ocorreu um erro ao enviar o pedido.');
            });
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
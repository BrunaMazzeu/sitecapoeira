// Seleciona os elementos do HTML
const carousel = document.querySelector('.carousel');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Define a quantidade de pixels a ser rolada (ajuste este valor)
const scrollAmount = 350; // Largura do seu card + o gap (250px + 20px)

// Adiciona o evento de clique para a seta da direita
rightArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

    // Lógica para voltar ao início quando o carrossel chega ao fim
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    if (carousel.scrollLeft + scrollAmount >= maxScrollLeft) {
        setTimeout(() => {
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
        }, 800); // Adicionamos um pequeno delay
    }
});

// Adiciona o evento de clique para a seta da esquerda
leftArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
// Seleciona todos os botões de pergunta da FAQ
const faqQuestions = document.querySelectorAll('.faq-question');

// Adiciona um evento de clique para cada botão
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    // Encontra o item completo da FAQ (o pai do botão)
    const faqItem = question.parentElement;
    
    // Adiciona ou remove a classe 'active' no item
    // Isso fará a resposta aparecer ou desaparecer via CSS
    faqItem.classList.toggle('active');
  });
});
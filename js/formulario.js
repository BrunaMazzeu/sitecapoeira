document.addEventListener('DOMContentLoaded', () => {
    const openFormButton = document.getElementById('open-uniform-form');
    const closeFormButton = document.getElementById('close-uniform-form');
    const modal = document.getElementById('uniform-form-modal');
    const form = document.getElementById('uniform-request-form');

    if (openFormButton && modal) {
        // Abre o formulário
        openFormButton.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        // Fecha o formulário
        closeFormButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Fecha o formulário ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Adiciona funcionalidade ao envio
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pedido de uniforme enviado com sucesso! Aguarde o nosso contato.');
            modal.style.display = 'none';
            form.reset();
        });
    }
});
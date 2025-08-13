// Estrutura inicial para armazenar os pedidos
let orders = [];

// Função para atualizar os cards e tabela
function updateDashboard() {
    const totalOrders = document.getElementById('total-orders');
    const paidOrders = document.getElementById('paid-orders');
    const pendingOrders = document.getElementById('pending-orders');
    const tableBody = document.querySelector('#orders-table tbody');

    totalOrders.textContent = orders.length;
    paidOrders.textContent = orders.filter(o => o.status === 'Pago').length;
    pendingOrders.textContent = orders.filter(o => o.status === 'Pendente').length;

    // Limpa a tabela
    tableBody.innerHTML = '';

    // Preenche a tabela
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.student}</td>
            <td>${order.responsible}</td>
            <td>${order.whatsapp}</td>
            <td>${order.cpf}</td>
            <td>${order.classLocation}</td>
            <td>${order.adultSize}</td>
            <td>${order.childSize}</td>
            <td>${order.status}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// Para testar, adiciona pedidos fictícios
orders.push({
    student: 'João',
    responsible: 'Maria',
    whatsapp: '(11) 99999-9999',
    cpf: '123.456.789-00',
    classLocation: 'Mestre Kino - Cia Athletica Kansas',
    adultSize: 'M',
    childSize: '10',
    status: 'Pago'
});

updateDashboard();

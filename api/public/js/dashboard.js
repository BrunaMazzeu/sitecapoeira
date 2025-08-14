const API_URL = "/api/pedidos";

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('pedidos-table-body');
    const filterInput = document.getElementById('filter-input');
    const refreshButton = document.getElementById('refresh-button');

    // Buscar dados da API
    async function fetchPedidos() {
        try {
            const response = await fetch(API_URL);
            const pedidos = await response.json();
            displayPedidos(pedidos);
        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
        }
    }

    // Exibir pedidos na tabela
    function displayPedidos(pedidos) {
        tableBody.innerHTML = "";
        const filter = filterInput.value.toLowerCase();

        pedidos.forEach(pedido => {
            if (
                pedido.nome_aluno.toLowerCase().includes(filter) ||
                pedido.cpf.includes(filter) ||
                pedido.whatsapp.includes(filter)
            ) {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${pedido.nome_aluno}</td>
                    <td>${pedido.nome_responsavel}</td>
                    <td>${pedido.whatsapp}</td>
                    <td>${pedido.cpf}</td>
                    <td>${pedido.professor_local}</td>
                    <td>${pedido.tamanho_camisa_adulto}</td>
                    <td>${pedido.tamanho_camisa_infantil}</td>
                    <td>${pedido.pago ? "Sim" : "Não"}</td>
                    <td>
                        <button class="enviado-btn" data-id="${pedido.id}">
                            ${pedido.enviado ? "Enviado" : "Marcar Enviado"}
                        </button>
                    </td>
                `;

                tableBody.appendChild(tr);
            }
        });

        // Adiciona evento aos botões "Marcar Enviado"
        document.querySelectorAll('.enviado-btn').forEach(button => {
            button.addEventListener('click', async () => {
                const id = button.getAttribute('data-id');
                await markEnviado(id, button);
            });
        });
    }

    // Atualizar pedido como enviado
    async function markEnviado(id, button) {
        try {
            const response = await fetch(`${API_URL}/${id}/enviado`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ enviado: true })
            });
            const data = await response.json();
            console.log(data);
            button.textContent = "Enviado";
            button.disabled = true;
        } catch (err) {
            console.error("Erro ao atualizar pedido:", err);
        }
    }

    // Eventos de filtro e atualizar
    filterInput.addEventListener('input', fetchPedidos);
    refreshButton.addEventListener('click', fetchPedidos);

    // Carrega dados ao abrir a página
    fetchPedidos();
});

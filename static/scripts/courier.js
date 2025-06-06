//document.addEventListener('DOMContentLoaded', function() {
//    const completeButtons = document.querySelectorAll('.complete-button');
//
//    completeButtons.forEach(button => {
//        button.addEventListener('click', function() {
//            const order = this.closest('.order');
//            order.querySelector('.status').textContent = 'Завершен';
//            this.style.display = 'none';
//        });
//    });
//});

document.addEventListener('DOMContentLoaded', function() {
    const completeButtons = document.querySelectorAll('.complete-button');

    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const order = this.closest('.order');
            const orderId = order.dataset.orderId;

            fetch(`http://127.0.0.1:8000/orders/${orderId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courier_id: 1, // Пример ID курьера (замените на реальный)
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка завершения заказа');
                }
                return response.json();
            })
            .then(() => {
                order.querySelector('.status').textContent = 'Завершен';
                button.style.display = 'none';
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Не удалось завершить заказ: ' + error.message);
            });
        });
    });
});
//////document.addEventListener('DOMContentLoaded', function() {
//////    const completeButtons = document.querySelectorAll('.complete-button');
//////
//////    completeButtons.forEach(button => {
//////        button.addEventListener('click', function() {
//////            const order = this.closest('.order');
//////            order.querySelector('.status').textContent = 'Завершен';
//////            this.style.display = 'none';
//////        });
//////    });
//////});
////
////document.addEventListener('DOMContentLoaded', function() {
////    const completeButtons = document.querySelectorAll('.complete-button');
////
////    completeButtons.forEach(button => {
////        button.addEventListener('click', function() {
////            const order = this.closest('.order');
////            const orderId = order.dataset.orderId;
////
////            fetch(`http://127.0.0.1:8080/orders/${orderId}/complete`, {
////                method: 'POST',
////                headers: {
////                    'Content-Type': 'application/json',
////                },
////                body: JSON.stringify({
////                    courier_id: 1, // Пример ID курьера (замените на реальный)
////                }),
////            })
////            .then(response => {
////                if (!response.ok) {
////                    throw new Error('Ошибка завершения заказа');
////                }
////                return response.json();
////            })
////            .then(() => {
////                order.querySelector('.status').textContent = 'Завершен';
////                button.style.display = 'none';
////            })
////            .catch(error => {
////                console.error('Ошибка:', error);
////                alert('Не удалось завершить заказ: ' + error.message);
////            });
////        });
////    });
////});
//
//document.addEventListener('DOMContentLoaded', function() {
//    // Получаем ID курьера из URL
//    const urlParams = new URLSearchParams(window.location.search);
//    const courierId = urlParams.get('id');
//
//    if (!courierId) {
//        alert('ID курьера не указан');
//        window.location.href = '/courier-auth';
//        return;
//    }
//
//    // Загружаем данные курьера
//    fetch(`http://127.0.0.1:8080/couriers/${courierId}`)
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Курьер не найден');
//            }
//            return response.json();
//        })
//        .then(courier => {
//            // Заполняем данные на странице
//            document.getElementById('courier-id').textContent = courier.id;
//            document.getElementById('courier-type').textContent = getCourierTypeName(courier.type);
//            document.getElementById('courier-districts').textContent = courier.districts.join(', ');
//            document.getElementById('courier-schedule').textContent = courier.schedule.join(', ');
//            document.getElementById('courier-rating').textContent = courier.rating || 'Нет данных';
//            document.getElementById('courier-earnings').textContent = courier.earnings ? `${courier.earnings} руб.` : '0 руб.';
//
//            // Загружаем заказы курьера
//            return fetch(`http://127.0.0.1:8080/couriers/${courierId}/orders`);
//        })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Не удалось загрузить заказы');
//            }
//            return response.json();
//        })
//        .then(orders => {
//            const ordersList = document.getElementById('orders-list');
//            ordersList.innerHTML = '';
//
//            if (orders.length === 0) {
//                ordersList.innerHTML = '<p>Нет текущих заказов</p>';
//                return;
//            }
//
//            orders.forEach(order => {
//                const orderElement = document.createElement('div');
//                orderElement.className = 'order';
//                orderElement.dataset.orderId = order.id;
//                orderElement.innerHTML = `
//                    <div class="order-header">
//                        <h3>Заказ #${order.id}</h3>
//                        <span class="status">${order.status}</span>
//                    </div>
//                    <div class="order-details">
//                        <p><strong>Вес</strong>: ${order.weight} кг</p>
//                        <p><strong>Район</strong>: ${order.district}</p>
//                        <p><strong>Время доставки</strong>: ${order.delivery_hours}</p>
//                    </div>
//                    ${order.status === 'в процессе' ?
//                        `<button class="complete-button">Завершить</button>` : ''}
//                `;
//                ordersList.appendChild(orderElement);
//            });
//
//            // Инициализируем кнопки завершения заказов
//            const completeButtons = document.querySelectorAll('.complete-button');
//            completeButtons.forEach(button => {
//                button.addEventListener('click', completeOrder);
//            });
//        })
//        .catch(error => {
//            console.error('Ошибка:', error);
//            alert(error.message);
//        });
//
//    function getCourierTypeName(type) {
//        const types = {
//            'foot': 'Пеший',
//            'bike': 'Велокурьер',
//            'car': 'Автомобиль'
//        };
//        return types[type] || type;
//    }
//
//    function completeOrder() {
//        const orderElement = this.closest('.order');
//        const orderId = orderElement.dataset.orderId;
//
//        fetch(`http://127.0.0.1:8080/orders/${orderId}/complete`, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify({
//                courier_id: courierId,
//                complete_time: new Date().toISOString()
//            }),
//        })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Ошибка завершения заказа');
//            }
//            return response.json();
//        })
//        .then(() => {
//            orderElement.querySelector('.status').textContent = 'завершен';
//            this.remove();
//        })
//        .catch(error => {
//            console.error('Ошибка:', error);
//            alert('Не удалось завершить заказ: ' + error.message);
//        });
//    }
//});

// СВЕРХУ - ЭТО БЕЗ БД, СНИЗУ - ПРОБОВАЛОСЬ В БД НО ДРЯНЬ, НЕ ИСПЫТЫВАЕМАЯ ЧЕЛОВЕКОМ
document.addEventListener('DOMContentLoaded', function() {
    // Получаем ID курьера из URL
    const urlParams = new URLSearchParams(window.location.search);
    const courierId = urlParams.get('id');

    if (!courierId) {
        alert('ID курьера не указан');
        window.location.href = 'courier-auth.html';
        return;
    }

    // Загружаем данные курьера
    fetch(`http://127.0.0.1:8080/couriers/${courierId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Курьер не найден');
            }
            return response.json();
        })
        .then(courier => {
            // Заполняем данные на странице
            document.getElementById('courier-id').textContent = courier.courier_id;
            document.getElementById('courier-type').textContent = getCourierTypeName(courier.type);
            document.getElementById('courier-regions').textContent = courier.regions.join(', ');
            document.getElementById('courier-hours').textContent = courier.working_hours.join(', ');
            document.getElementById('courier-rating').textContent = courier.rating ? courier.rating.toFixed(2) : 'Нет данных';
            document.getElementById('courier-earnings').textContent = courier.earnings ? `${courier.earnings} руб.` : '0 руб.';

            // Загружаем заказы курьера
            return fetch(`http://127.0.0.1:8080/couriers/${courierId}/orders`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить заказы');
            }
            return response.json();
        })
        .then(orders => {
            const ordersList = document.getElementById('orders-list');
            ordersList.innerHTML = '';

            if (orders.length === 0) {
                ordersList.innerHTML = '<p class="loading">Нет текущих заказов</p>';
                return;
            }

            orders.forEach(order => {
                const orderElement = document.createElement('div');
                orderElement.className = 'order';
                orderElement.dataset.orderId = order.id;
                orderElement.innerHTML = `
                    <div class="order-header">
                        <h3>Заказ #${order.id}</h3>
                        <span class="status">${order.status === 'completed' ? 'завершен' : 'в процессе'}</span>
                    </div>
                    <div class="order-details">
                        <p><strong>Вес:</strong> ${order.weight} кг</p>
                        <p><strong>Район:</strong> ${order.region}</p>
                        <p><strong>Время доставки:</strong> ${order.delivery_hours.join(', ')}</p>
                    </div>
                    ${order.status !== 'completed' ?
                        `<button class="complete-button">Завершить заказ</button>` : ''}
                `;
                ordersList.appendChild(orderElement);
            });

            // Инициализируем кнопки завершения заказов
            const completeButtons = document.querySelectorAll('.complete-button');
            completeButtons.forEach(button => {
                button.addEventListener('click', completeOrder);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('orders-list').innerHTML =
                `<p class="error">${error.message}</p>`;
        });

    function getCourierTypeName(type) {
        const types = {
            'foot': 'Пеший',
            'bike': 'Велокурьер',
            'car': 'Автомобиль'
        };
        return types[type] || type;
    }

    function completeOrder() {
        const orderElement = this.closest('.order');
        const orderId = orderElement.dataset.orderId;

        fetch(`http://127.0.0.1:8080/orders/${orderId}/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courier_id: courierId,
                complete_time: new Date().toISOString()
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка завершения заказа');
            }
            return response.json();
        })
        .then(() => {
            orderElement.querySelector('.status').textContent = 'завершен';
            this.remove();
            // Обновляем данные курьера (рейтинг и заработок)
            return fetch(`http://127.0.0.1:8080/couriers/${courierId}`);
        })
        .then(response => response.json())
        .then(courier => {
            document.getElementById('courier-rating').textContent =
                courier.rating ? courier.rating.toFixed(2) : 'Нет данных';
            document.getElementById('courier-earnings').textContent =
                courier.earnings ? `${courier.earnings} руб.` : '0 руб.';
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось завершить заказ: ' + error.message);
        });
    }
});
//document.addEventListener('DOMContentLoaded', function() {
//    // Управление табами
//    const tabs = document.querySelectorAll('.tab');
//    const tabContents = document.querySelectorAll('.tab-content');
//
//    tabs.forEach(tab => {
//        tab.addEventListener('click', function() {
//            // Убираем активный класс у всех вкладок и контента
//            tabs.forEach(t => t.classList.remove('active'));
//            tabContents.forEach(content => content.classList.remove('active'));
//
//            // Добавляем активный класс к выбранной вкладке и соответствующему контенту
//            this.classList.add('active');
//            const tabId = this.getAttribute('data-tab');
//            document.getElementById(tabId).classList.add('active');
//
//            // Загружаем заказы, если выбрана вкладка "Мои заказы"
//            if (tabId === 'my-orders') {
//                loadCustomerOrders();
//            }
//        });
//    });
//
//    // Управление временем доставки
//    document.getElementById('addHourBtn').addEventListener('click', function() {
//        const hoursList = document.getElementById('hoursList');
//        const newHourItem = document.createElement('div');
//        newHourItem.className = 'hour-item';
//        newHourItem.innerHTML = `
//            <input type="text" class="hour-input" placeholder="HH:MM-HH:MM" required>
//            <button type="button" class="remove-hour">×</button>
//        `;
//        hoursList.appendChild(newHourItem);
//
//        newHourItem.querySelector('.remove-hour').addEventListener('click', function() {
//            if (hoursList.children.length > 1) {
//                hoursList.removeChild(newHourItem);
//            }
//        });
//    });
//
//    // Инициализация первой кнопки удаления
//    const initialRemoveButtons = document.querySelectorAll('.remove-hour');
//    initialRemoveButtons.forEach(function(button) {
//        button.addEventListener('click', function(e) {
//            const hoursList = document.getElementById('hoursList');
//            if (hoursList.children.length > 1) {
//                const hourItem = e.target.closest('.hour-item');
//                hoursList.removeChild(hourItem);
//            }
//        });
//    });
//
//    // Создание заказа
//    document.getElementById('createOrderForm').addEventListener('submit', function(e) {
//        e.preventDefault();
//
//        const weight = parseFloat(document.getElementById('orderWeight').value);
//        const region = parseInt(document.getElementById('orderRegion').value);
//
//        const deliveryHours = [];
//        document.querySelectorAll('.hour-input').forEach(function(input) {
//            if (input.value) deliveryHours.push(input.value);
//        });
//
//        try {
//            // Пример успешного ответа
//            const data = {
//                orders: [{ id: Math.floor(Math.random() * 1000) + 1000 }]
//            };
//
//            alert(`Заказ #${data.orders[0].id} успешно создан!`);
//            document.getElementById('createOrderForm').reset();
//
//            // Оставляем только одно поле времени доставки
//            const hoursList = document.getElementById('hoursList');
//            while (hoursList.children.length > 1) {
//                hoursList.removeChild(hoursList.lastChild);
//            }
//            if (hoursList.children.length > 0) {
//                hoursList.querySelector('.hour-input').value = '';
//            }
//
//            // Переключаемся на вкладку с заказами и обновляем список
//            document.querySelector('.tab[data-tab="my-orders"]').click();
//        } catch (error) {
//            console.error('Ошибка создания заказа:', error);
//            alert('Не удалось создать заказ');
//        }
//    });
//
//    // Загрузка заказов покупателя
//    function loadCustomerOrders() {
//        try {
//            // Пример данных для демонстрации
//            const orders = [
//                {
//                    order_id: 123,
//                    weight: 3.5,
//                    region: 12,
//                    delivery_hours: ["10:00-12:00", "15:00-18:00"],
//                    status: "В процессе",
//                    courier_id: 456
//                },
//                {
//                    order_id: 124,
//                    weight: 2.1,
//                    region: 5,
//                    delivery_hours: ["09:00-11:00"],
//                    status: "Завершен",
//                    courier_id: 789
//                }
//            ];
//
//            renderOrders(orders);
//        } catch (error) {
//            console.error('Ошибка загрузки заказов:', error);
//        }
//    }
//
//    // Функция для отображения заказов
//    function renderOrders(orders) {
//        const container = document.getElementById('ordersContainer');
//
//        if (orders.length === 0) {
//            container.innerHTML = '<div class="no-orders">У вас пока нет заказов</div>';
//            return;
//        }
//
//        container.innerHTML = '';
//
//        orders.forEach(function(order) {
//            const orderCard = document.createElement('div');
//            orderCard.className = 'order-card';
//
//            orderCard.innerHTML = `
//                <div class="order-header">
//                    <div class="order-id">Заказ #${order.order_id}</div>
//                    <div class="order-status">${order.status}</div>
//                </div>
//                <div class="order-details">
//                    <div>
//                        <div class="form-label">Вес</div>
//                        <div>${order.weight} кг</div>
//                    </div>
//                    <div>
//                        <div class="form-label">Район</div>
//                        <div>${order.region}</div>
//                    </div>
//                    <div>
//                        <div class="form-label">Время доставки</div>
//                        <div>${order.delivery_hours.join(', ')}</div>
//                    </div>
//                </div>
//                ${order.courier_id ? `<div><strong>Курьер:</strong> #${order.courier_id}</div>` : ''}
//            `;
//
//            container.appendChild(orderCard);
//        });
//    }
//
//    // Возврат на главную страницу
//    document.getElementById('backBtn').addEventListener('click', function() {
//        window.location.href = '/';
//    });
//});

document.addEventListener('DOMContentLoaded', function() {

    checkBackendConnection(); // добавила 09.06!!!!

    // Управление табами
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            if (tabId === 'my-orders') {
                loadCustomerOrders();
            }
        });
    });

    // Управление временем доставки
    document.getElementById('addHourBtn').addEventListener('click', function() {
        const hoursList = document.getElementById('hoursList');
        const newHourItem = document.createElement('div');
        newHourItem.className = 'hour-item';
        newHourItem.innerHTML = `
            <input type="text" class="hour-input" placeholder="HH:MM-HH:MM" required>
            <button type="button" class="remove-hour">×</button>
        `;
        hoursList.appendChild(newHourItem);

        newHourItem.querySelector('.remove-hour').addEventListener('click', function() {
            if (hoursList.children.length > 1) {
                hoursList.removeChild(newHourItem);
            }
        });
    });

    // Инициализация первой кнопки удаления
    const initialRemoveButtons = document.querySelectorAll('.remove-hour');
    initialRemoveButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            const hoursList = document.getElementById('hoursList');
            if (hoursList.children.length > 1) {
                const hourItem = e.target.closest('.hour-item');
                hoursList.removeChild(hourItem);
            }
        });
    });

    // Создание заказа
    document.getElementById('createOrderForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        // Показываем индикатор загрузки
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Создание...';

        try {
            const weight = parseFloat(document.getElementById('orderWeight').value);
            const region = parseInt(document.getElementById('orderRegion').value);

            const deliveryHours = [];
            document.querySelectorAll('.hour-input').forEach(function(input) {
                if (input.value) deliveryHours.push(input.value);
            });

            // Валидация данных
            if (isNaN(weight) throw new Error('Укажите корректный вес');
            if (isNaN(region)) throw new Error('Укажите корректный район');
            if (deliveryHours.length === 0) throw new Error('Укажите хотя бы один интервал доставки');

            const response = await fetch('http://127.0.0.1:8000/orders/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [{
                        order_id: Math.floor(Math.random() * 900000) + 100000,
                        weight: weight,
                        region: region,
                        delivery_hours: deliveryHours
                    }]
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Не удалось создать заказ');
            }

            showNotification(`Заказ #${data.orders[0].id} успешно создан!`, 'success');

            // Очистка формы
            document.getElementById('createOrderForm').reset();
            const hoursList = document.getElementById('hoursList');
            while (hoursList.children.length > 1) {
                hoursList.removeChild(hoursList.lastChild);
            }
            if (hoursList.children.length > 0) {
                hoursList.querySelector('.hour-input').value = '';
            }

            // Обновляем список заказов
            if (document.querySelector('.tab[data-tab="my-orders"].active')) {
                loadCustomerOrders();
            }

        } catch (error) {
            console.error('Ошибка создания заказа:', error);
            showNotification(`Не удалось создать заказ: ${error.message}`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Создать заказ';
        }
    });

    // Функция проверки подключения к бэкенду
    function checkBackendConnection() {
        const connectionStatus = document.getElementById('connectionStatus');
        try {
            // Проверяем оба типа запросов (GET и OPTIONS)
            const response = await fetch('http://127.0.0.1:8000/orders/', {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                connectionStatus.textContent = '✓ Подключение с бэкендом установлено';
                connectionStatus.className = 'connection-status connected';
            } else {
                connectionStatus.textContent = '✗ Нет подключения к бэкенду';
                connectionStatus.className = 'connection-status disconnected';
            }
        } catch (error) {
            console.error('Ошибка подключения:', error);
            connectionStatus.textContent = '✗ Ошибка подключения к бэкенду';
            connectionStatus.className = 'connection-status disconnected';
        }
    }

    // Функция показа уведомлений
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Закрыть';
        closeBtn.className = 'close-notification';
        closeBtn.onclick = () => notification.remove();

        notification.appendChild(closeBtn);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // Загрузка заказов покупателя (с использованием Promise)
    function loadCustomerOrders() {
        fetch('http://127.0.0.1:8000/orders/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки заказов');
                }
                return response.json();
            })
            .then(orders => {
                renderOrders(orders);
            })
            .catch(error => {
                console.error('Ошибка загрузки заказов:', error);
                document.getElementById('ordersContainer').innerHTML = `
                    <div class="error-message">Ошибка загрузки: ${error.message}</div>
                `;
            });
    }

    // Функция для отображения заказов
    function renderOrders(orders) {
        const container = document.getElementById('ordersContainer');

        if (orders.length === 0) {
            container.innerHTML = '<div class="no-orders">У вас пока нет заказов</div>';
            return;
        }

        container.innerHTML = '';
        orders.forEach(function(order) {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.innerHTML = `
                <div class="order-header">
                    <div class="order-id">Заказ #${order.order_id}</div>
                    <div class="order-status">${order.status}</div>
                </div>
                <div class="order-details">
                    <div>
                        <div class="form-label">Вес</div>
                        <div>${order.weight} кг</div>
                    </div>
                    <div>
                        <div class="form-label">Район</div>
                        <div>${order.region}</div>
                    </div>
                    <div>
                        <div class="form-label">Время доставки</div>
                        <div>${order.delivery_hours.join(', ')}</div>
                    </div>
                </div>
                ${order.courier_id ? `<div><strong>Курьер:</strong> #${order.courier_id}</div>` : ''}
            `;
            container.appendChild(orderCard);
        });
    }

    // Возврат на главную страницу
    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = '/';
    });
});
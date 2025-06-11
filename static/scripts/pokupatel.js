document.addEventListener('DOMContentLoaded', function() {
    // Базовый URL API
    const API_BASE_URL = 'http://127.0.0.1:8080';

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

        const submitBtn = document.querySelector('#createOrderForm .submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Создание...';

        try {
            const weight = parseFloat(document.getElementById('orderWeight').value);
            const region = parseInt(document.getElementById('orderRegion').value);

            const deliveryHours = [];
            const timeInputs = document.querySelectorAll('.hour-input');

            // Проверка временных интервалов
            for (const input of timeInputs) {
                if (!input.value) continue;

                // Проверка формата
                const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(input.value)) {
                    throw new Error('Формат времени должен быть HH:MM-HH:MM (например, 09:00-18:00)');
                }

                // Проверка корректности интервала
                const [startTime, endTime] = input.value.split('-');
                const start = new Date(`2000-01-01T${startTime}:00`);
                const end = new Date(`2000-01-01T${endTime}:00`);

                if (start >= end) {
                    throw new Error('Неправильно набран промежуток: время начала должно быть раньше времени окончания');
                }

                deliveryHours.push(input.value);
            }

            // Остальная валидация
            if (isNaN(weight) || weight < 0.01 || weight > 50) {
                throw new Error('Вес должен быть от 0.01 до 50 кг');
            }
            if (isNaN(region) || region <= 0) {
                throw new Error('Район должен быть положительным целым числом');
            }
            if (deliveryHours.length === 0) {
                throw new Error('Укажите хотя бы один интервал доставки');
            }

            // Генерация order_id
            const order_id = Math.floor(Math.random() * 900000) + 100000;

            const response = await fetch(`${API_BASE_URL}/orders/`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [{
                        order_id: order_id,
                        weight: weight,
                        region: region,
                        delivery_hours: deliveryHours
                    }]
                }),
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (e) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let errorMessage = 'Не удалось создать заказ';
                if (errorData.detail) {
                    errorMessage = errorData.detail;
                } else if (errorData.validation_error && errorData.validation_error.orders) {
                    errorMessage = 'Ошибка валидации данных';
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            alert(`Заказ #${order_id} успешно создан!`);

            // Очистка формы
            document.getElementById('createOrderForm').reset();
            const hoursList = document.getElementById('hoursList');
            while (hoursList.children.length > 1) {
                hoursList.removeChild(hoursList.lastChild);
            }
            if (hoursList.children.length > 0) {
                hoursList.querySelector('.hour-input').value = '';
            }

        } catch (error) {
            console.error('Ошибка создания заказа:', error);
            alert(`Ошибка: ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Создать заказ';
        }
    });

    // Назначение заказов курьеру
    document.getElementById('assignOrderForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.querySelector('#assignOrderForm .submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Назначение...';

        const courierId = document.getElementById('courierId');
        const assignResult = document.getElementById('assignResult');
        const assignTime = document.getElementById('assignTime');
        const assignedOrders = document.getElementById('assignedOrders');

        assignResult.style.display = 'none';
        assignedOrders.innerHTML = '';

        try {
            if (!courierId.value || isNaN(courierId.value) || courierId.value <= 0) {
                throw new Error('Введите корректный ID курьера (положительное число)');
            }

            const response = await fetch(`${API_BASE_URL}/orders/assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courier_id: parseInt(courierId.value)
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Не удалось назначить заказы');
            }

            const data = await response.json();

            assignResult.style.display = 'block';

            if (data.assign_time) {
                const date = new Date(data.assign_time);
                assignTime.innerHTML = `Время назначения: ${date.toLocaleString()}`;
            } else {
                assignTime.innerHTML = 'Время назначения: не назначено';
            }

            if (data.orders && data.orders.length > 0) {
                data.orders.forEach(order => {
                    const orderElement = document.createElement('div');
                    orderElement.className = 'assigned-order';
                    orderElement.innerHTML = `
                        <div class="assigned-order-id">Заказ #${order.id}</div>
                    `;
                    assignedOrders.appendChild(orderElement);
                });
            } else {
                const noOrdersElement = document.createElement('div');
                noOrdersElement.className = 'no-orders-message';
                noOrdersElement.textContent = 'Нет доступных заказов для курьера в его районах';
                assignedOrders.appendChild(noOrdersElement);
            }

            // Очистка поля после успешного выполнения
            courierId.value = '';

        } catch (error) {
            console.error('Ошибка назначения заказов:', error);

            assignResult.style.display = 'block';
            assignTime.innerHTML = '';

            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = `Ошибка: ${error.message}`;
            assignedOrders.appendChild(errorElement);

        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Назначить заказы';
        }
    });

    // Завершение заказа
    document.getElementById('completeOrderForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.querySelector('#completeOrderForm .submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Завершение...';

        const courierId = document.getElementById('completeCourierId');
        const orderId = document.getElementById('completeOrderId');
        const completeTime = document.getElementById('completeTime');

        const completeResult = document.getElementById('completeResult');
        const completeResponse = document.getElementById('completeResponse');

        completeResult.style.display = 'none';
        completeResponse.innerHTML = '';
        completeResponse.className = 'complete-response';

        try {
            // Валидация данных
            if (!courierId.value || isNaN(courierId.value)) {
                throw new Error('ID курьера должен быть числом');
            }

            if (!orderId.value || isNaN(orderId.value)) {
                throw new Error('ID заказа должен быть числом');
            }

            if (!completeTime.value) {
                throw new Error('Укажите время завершения заказа');
            }

            // Форматирование времени для API
            const formattedTime = new Date(completeTime.value).toISOString();

            const response = await fetch(`${API_BASE_URL}/orders/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courier_id: parseInt(courierId.value),
                    order_id: parseInt(orderId.value),
                    complete_time: formattedTime
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Не удалось завершить заказ');
            }

            const data = await response.json();

            completeResult.style.display = 'block';
            completeResponse.innerHTML = `
                <p class="complete-success">Заказ #${data.order_id} успешно завершен!</p>
            `;

            // Очистка полей после успешного выполнения
            courierId.value = '';
            orderId.value = '';
            completeTime.value = '';

        } catch (error) {
            console.error('Ошибка завершения заказа:', error);

            completeResult.style.display = 'block';
            completeResponse.className = 'complete-response complete-error';

            // Русскоязычные сообщения об ошибках
            let errorMessage = 'Произошла ошибка';
            if (error.message.includes('ID курьера')) {
                errorMessage = 'Ошибка: Некорректный ID курьера';
            } else if (error.message.includes('ID заказа')) {
                errorMessage = 'Ошибка: Некорректный ID заказа';
            } else if (error.message.includes('время завершения')) {
                errorMessage = 'Ошибка: Укажите время завершения';
            } else if (error.message.includes('Не удалось завершить')) {
                errorMessage = 'Ошибка: Не удалось завершить заказ';
            }

            completeResponse.innerHTML = errorMessage;

        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Завершить заказ';
        }
    });

    // Возврат на главную страницу
    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = '/';
    });
});
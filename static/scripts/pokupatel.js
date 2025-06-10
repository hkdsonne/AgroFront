// НОВОЕ
document.addEventListener('DOMContentLoaded', function() {
    // Базовый URL API
    const API_BASE_URL = 'http://127.0.0.1:8000';

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
            if (isNaN(weight) || weight < 0.01 || weight > 50) {
                throw new Error('Вес должен быть от 0.01 до 50 кг');
            }
            if (isNaN(region) || region <= 0) {
                throw new Error('Район должен быть положительным целым числом');
            }
            if (deliveryHours.length === 0) {
                throw new Error('Укажите хотя бы один интервал доставки');
            }

            // Проверка формата времени доставки
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            for (const hour of deliveryHours) {
                if (!timeRegex.test(hour)) {
                    throw new Error('Формат времени должен быть HH:MM-HH:MM (например, 09:00-18:00)');
                }
            }

            // Генерация order_id
            const order_id = Math.floor(Math.random() * 900000) + 100000;

            const response = await fetch(`${API_BASE_URL}/orders/`, {
                method: 'POST',
                mode: 'cors', // Явно указываем режим CORS
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: [{
                        order_id: order_id, // Добавляем order_id
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

            // Обновляем список заказов
            if (document.querySelector('.tab[data-tab="my-orders"].active')) {
                loadCustomerOrders();
            }

        } catch (error) {
            console.error('Ошибка создания заказа:', error);
            alert(`Ошибка: ${error.message}`);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Создать заказ';
        }
    });



    // Возврат на главную страницу
    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = '/';
    });
});

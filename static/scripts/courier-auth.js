document.addEventListener('DOMContentLoaded', function() {
    // Кнопка возврата на главную
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    // Элементы для анимации
    const authContainer = document.getElementById('auth-container');
    const courierPanel = document.getElementById('courier-panel');
    const courierInfo = document.getElementById('courier-info');
    const closeCourierButton = document.getElementById('close-courier-button');
    const saveButton = document.getElementById('save-button');

    let currentCourierId = null;
    let currentCourierData = null;

    // Функция для проверки корректности временного интервала
    function isValidTimeRange(timeRange) {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(timeRange)) {
            return false;
        }

        const [startTime, endTime] = timeRange.split('-');
        const start = startTime.split(':').map(Number);
        const end = endTime.split(':').map(Number);

        const startTotalMinutes = start[0] * 60 + start[1];
        const endTotalMinutes = end[0] * 60 + end[1];

        return endTotalMinutes > startTotalMinutes;
    }

    // Обработчик для кнопки "Этот курьер надоел"
    if (closeCourierButton) {
        closeCourierButton.addEventListener('click', async () => {
            const courierType = document.getElementById('edit-courier-type').value;
            const regions = document.getElementById('edit-regions').value.split(',').map(r => parseInt(r.trim()));
            const workingHoursInputs = Array.from(document.querySelectorAll('#edit-working-hours .hour-input')).map(input => input.value);

            // Проверяем, заполнены ли временные промежутки и корректны ли они
            const validWorkingHours = workingHoursInputs.filter(wh => isValidTimeRange(wh));

            if (validWorkingHours.length !== workingHoursInputs.length) {
                alert('Некорректный формат времени. Убедитесь, что время окончания больше времени начала.');
                return;
            }

            // Если нет заполненных временных промежутков, не обновляем рабочие часы
            const updateData = {
                courier_type: courierType,
                regions: regions,
                ...(validWorkingHours.length > 0 ? { working_hours: validWorkingHours } : {})
            };

            try {
                const response = await fetch(`http://127.0.0.1:8000/couriers/${currentCourierId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Ошибка обновления данных курьера');
                }

                authContainer.classList.remove('hidden');
                courierPanel.classList.remove('visible');
            } catch (error) {
                console.error('Ошибка обновления данных курьера:', error);
                alert('Не удалось обновить данные курьера: ' + error.message);
            }
        });
    }

    // Обработчик для кнопки "Сохранить изменения"
    if (saveButton) {
        saveButton.addEventListener('click', async () => {
            const courierType = document.getElementById('edit-courier-type').value;
            const regions = document.getElementById('edit-regions').value.split(',').map(r => parseInt(r.trim()));
            const workingHoursInputs = Array.from(document.querySelectorAll('#edit-working-hours .hour-input')).map(input => input.value);

            // Проверяем, заполнены ли временные промежутки и корректны ли они
            const validWorkingHours = workingHoursInputs.filter(wh => isValidTimeRange(wh));

            if (validWorkingHours.length !== workingHoursInputs.length) {
                alert('Некорректный формат времени. Убедитесь, что время окончания больше времени начала.');
                return;
            }

            // Если нет заполненных временных промежутков, используем существующие
            const workingHours = validWorkingHours.length > 0 ? validWorkingHours : currentCourierData.working_hours;

            const updateData = {
                courier_type: courierType,
                regions: regions,
                working_hours: workingHours
            };

            try {
                const response = await fetch(`http://127.0.0.1:8000/couriers/${currentCourierId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                });

                if (response.ok) {
                    alert('Данные успешно обновлены!');
                    currentCourierData.courier_type = courierType;
                    currentCourierData.regions = regions;
                    currentCourierData.working_hours = workingHours;
                    showCourierInfo(currentCourierData);
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Ошибка обновления данных курьера');
                }
            } catch (error) {
                console.error('Ошибка обновления данных курьера:', error);
                alert('Не удалось обновить данные курьера: ' + error.message);
            }
        });
    }

    // Переключение между вкладками
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Обработка входа
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', async () => {
            const courierId = document.getElementById('courier-id').value;

            if (!courierId) {
                alert('Пожалуйста, введите ID курьера');
                return;
            }

            try {
                const response = await fetch(`http://127.0.0.1:8000/couriers/${courierId}`);

                if (response.ok) {
                    const courierData = await response.json();
                    currentCourierId = courierId;
                    currentCourierData = courierData;
                    showCourierInfo(courierData);
                } else if (response.status === 404) {
                    alert(`Курьер с ID ${courierId} не найден`);
                } else {
                    alert('Произошла ошибка при проверке курьера');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Не удалось подключиться к серверу');
            }
        });
    }

    // Обработка регистрации
    const registerButton = document.getElementById('register-button');
    if (registerButton) {
        registerButton.addEventListener('click', async () => {
            const courierType = document.getElementById('courier-type').value;
            const workingHoursInputs = Array.from(document.querySelectorAll('#workingHoursList .hour-input')).map(input => input.value);
            const regionsInput = document.getElementById('regions').value;

            if (workingHoursInputs.length === 0) {
                alert('Пожалуйста, укажите рабочие часы');
                return;
            }

            if (!regionsInput) {
                alert('Пожалуйста, укажите регионы работы');
                return;
            }

            // Проверяем, заполнены ли временные промежутки и корректны ли они
            const validWorkingHours = workingHoursInputs.filter(wh => isValidTimeRange(wh));

            if (validWorkingHours.length !== workingHoursInputs.length) {
                alert('Некорректный формат времени. Убедитесь, что время окончания больше времени начала.');
                return;
            }

            const regions = regionsInput.split(',').map(r => parseInt(r.trim()));

            let courierId;
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                courierId = Math.floor(Math.random() * 10000) + 1;

                try {
                    const checkResponse = await fetch(`http://127.0.0.1:8000/couriers/${courierId}`);

                    if (checkResponse.status === 404) {
                        break;
                    }
                } catch (error) {
                    console.error('Ошибка проверки ID:', error);
                }

                attempts++;
            }

            if (attempts >= maxAttempts) {
                alert('Не удалось найти свободный ID. Попробуйте еще раз.');
                return;
            }

            const courierData = {
                data: [{
                    courier_id: courierId,
                    type: courierType,
                    regions: regions,
                    working_hours: validWorkingHours
                }]
            };

            try {
                const response = await fetch('http://127.0.0.1:8000/couriers/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(courierData)
                });

                if (response.ok) {
                    const courierResponse = await fetch(`http://127.0.0.1:8000/couriers/${courierId}`);
                    if (courierResponse.ok) {
                        const courierInfo = await courierResponse.json();
                        currentCourierId = courierId;
                        currentCourierData = courierInfo;
                        showCourierInfo(courierInfo);
                    }
                } else {
                    const errorData = await response.json();
                    alert(`Ошибка регистрации: ${errorData.detail || 'Неизвестная ошибка'}`);
                }
            } catch (error) {
                console.error('Ошибка регистрации:', error);
                alert('Не удалось подключиться к серверу');
            }
        });
    }

    // Добавление временного интервала
    const addWorkingHourBtn = document.getElementById('addWorkingHourBtn');
    if (addWorkingHourBtn) {
        addWorkingHourBtn.addEventListener('click', () => {
            const hoursList = document.getElementById('workingHoursList');
            const hourItem = document.createElement('div');
            hourItem.className = 'hour-item';
            hourItem.innerHTML = `
                <input type="text" class="hour-input" placeholder="HH:MM-HH:MM" required>
                <button type="button" class="remove-hour">×</button>
            `;
            hoursList.appendChild(hourItem);

            const removeButton = hourItem.querySelector('.remove-hour');
            removeButton.addEventListener('click', () => {
                hoursList.removeChild(hourItem);
            });
        });
    }

    function showCourierInfo(courierData) {
        const courierTypeMap = {
            'foot': 'Пеший курьер',
            'bike': 'Курьер на велосипеде',
            'car': 'Курьер на автомобиле'
        };

        let infoHTML = `
            <p><strong>ID курьера:</strong> ${courierData.courier_id}</p>
            <p><strong>Заработок:</strong> ${courierData.earnings} ₽</p>
        `;

        if (courierData.rating !== undefined) {
            infoHTML += `<p><strong>Рейтинг:</strong> ${courierData.rating.toFixed(2)}</p>`;
        }

        infoHTML += `
            <div class="editable-field">
                <label for="edit-courier-type">Тип курьера:</label>
                <select id="edit-courier-type">
                    <option value="foot" ${courierData.courier_type === 'foot' ? 'selected' : ''}>Пеший курьер</option>
                    <option value="bike" ${courierData.courier_type === 'bike' ? 'selected' : ''}>Курьер на велосипеде</option>
                    <option value="car" ${courierData.courier_type === 'car' ? 'selected' : ''}>Курьер на автомобиле</option>
                </select>
            </div>
            <div class="editable-field">
                <label for="edit-regions">Регионы работы:</label>
                <input type="text" id="edit-regions" value="${courierData.regions.join(', ')}">
            </div>
            <div class="editable-field">
                <label>Рабочие часы:</label>
                <button type="button" class="add-hour" id="addEditWorkingHourBtn">Добавить временной интервал</button>
                <div class="hours-list" id="edit-working-hours">
                    ${courierData.working_hours.map(wh => `
                        <div class="hour-item">
                            <input type="text" class="hour-input" value="${wh}" required>
                            <button type="button" class="remove-hour">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        courierInfo.innerHTML = infoHTML;

        authContainer.classList.add('hidden');
        setTimeout(() => {
            courierPanel.classList.add('visible');
        }, 500);

        // Добавляем обработчики для кнопок удаления временных интервалов
        document.querySelectorAll('#edit-working-hours .remove-hour').forEach(button => {
            button.addEventListener('click', function() {
                this.parentElement.remove();
            });
        });

        // Обработчик для кнопки "Добавить временной интервал" в режиме редактирования
        const addEditWorkingHourBtn = document.getElementById('addEditWorkingHourBtn');
        if (addEditWorkingHourBtn) {
            addEditWorkingHourBtn.addEventListener('click', () => {
                const hoursList = document.getElementById('edit-working-hours');
                const hourItem = document.createElement('div');
                hourItem.className = 'hour-item';
                hourItem.innerHTML = `
                    <input type="text" class="hour-input" placeholder="HH:MM-HH:MM" required>
                    <button type="button" class="remove-hour">×</button>
                `;
                hoursList.appendChild(hourItem);

                const removeButton = hourItem.querySelector('.remove-hour');
                removeButton.addEventListener('click', () => {
                    hoursList.removeChild(hourItem);
                });
            });
        }
    }

    // Матричный эффект с японскими иероглифами
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const kanji = '日本語勉強中春夏秋冬山川空人木水火土金月日時分前後左右上下大小多少男女老若生年月';
    const fontSize = 20;
    const columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(255, 240, 245, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#FF1493';
        ctx.font = `${fontSize}px "MS Mincho", "SimSun", serif`;

        for (let i = 0; i < rainDrops.length; i++) {
            const text = kanji.charAt(Math.floor(Math.random() * kanji.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Эффект следования за курсором с сердечками
    let lastTime = 0;
    const delay = 100;

    document.addEventListener('mousemove', function(e) {
        const currentTime = new Date().getTime();
        if (currentTime - lastTime > delay) {
            const trail = document.createElement('div');
            trail.className = 'trail';
            trail.style.position = 'absolute';
            trail.style.width = '20px';
            trail.style.height = '20px';
            trail.style.backgroundColor = 'transparent';
            trail.style.pointerEvents = 'none';
            trail.style.left = (e.pageX - 10) + 'px';
            trail.style.top = (e.pageY - 10) + 'px';
            trail.style.zIndex = '4';
            trail.textContent = '❤';
            trail.style.fontSize = '20px';
            trail.style.color = 'rgba(255, 105, 180, 0.8)';
            document.body.appendChild(trail);

            setTimeout(() => {
                trail.remove();
            }, 500);
            lastTime = currentTime;
        }
    });
});

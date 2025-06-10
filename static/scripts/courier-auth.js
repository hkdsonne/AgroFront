document.addEventListener('DOMContentLoaded', function() {
        // Кнопка возврата на главную
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = '/';
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
                    alert(`Добро пожаловать, курьер #${courierId}! Тип: ${courierData.courier_type}`);
                    // Здесь можно перенаправить на страницу курьера
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
            const workingHoursInput = document.getElementById('working-hours').value;

            if (!workingHoursInput) {
                alert('Пожалуйста, укажите рабочие часы');
                return;
            }

            // Проверяем формат рабочего времени
            const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]-([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(workingHoursInput)) {
                alert('Неверный формат времени. Используйте HH:MM-HH:MM');
                return;
            }

            const workingHours = [workingHoursInput];
            const regions = [1]; // По умолчанию регион 1, можно добавить поле для выбора регионов

            // Генерируем случайный ID и проверяем его уникальность
            let courierId;
            let attempts = 0;
            const maxAttempts = 10;

            while (attempts < maxAttempts) {
                courierId = Math.floor(Math.random() * 10000) + 1;

                try {
                    const checkResponse = await fetch(`http://127.0.0.1:8000/couriers/${courierId}`);

                    if (checkResponse.status === 404) {
                        // ID свободен, можно использовать
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

            // Создаем данные для отправки
            const courierData = {
                data: [{
                    courier_id: courierId,
                    type: courierType,
                    regions: regions,
                    working_hours: workingHours
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
                    alert(`Курьер успешно зарегистрирован! Ваш ID: ${courierId}\nТип: ${courierType}\nРабочие часы: ${workingHoursInput}`);
                    // Переключаем на вкладку входа и заполняем ID
                    document.querySelector('.tab-button[data-tab="login"]').click();
                    document.getElementById('courier-id').value = courierId;
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

// ЭТО МОЯ НЯШЕЧКА ВКУСНЯШЕЧКА - НЕ УДАЛЯТЬ АРТЕФАКТ
// А ТАК ВХОД И РЕГА - КЛЮЧЕВЫЕ КНОПКИ, ПО ВХОДУ ПЕРЕНАПРАВЛЯЕМСЯ НА ДРУГУЮ СТРАНИЦУ

//    // Обработка входа -- более менее РАБОТАЮЩЕЕ
//    const loginButton = document.getElementById('login-button');
//    if (loginButton) {
//        loginButton.addEventListener('click', async () => {
//            const courierId = document.getElementById('courier-id').value;
//
//            if (!courierId) {
//                alert('Пожалуйста, введите ID курьера');
//                return;
//            }
//
//            try {
//                const response = await fetch(`http://127.0.0.1:8000/couriers/${courierId}`);
//
//                if (response.ok) {
//                    // Перенаправляем на страницу курьера с ID
//                    window.location.href = `courier.html?id=${courierId}`;
//                } else  {
//                    alert(`Курьер с ID ${courierId} не найден`);
//                }
//            } catch (error) {
//                console.error('Ошибка:', error);
//                alert('Не удалось подключиться к серверу');
//            }
//        });
//    }

//    // Обработка регистрации
//    const registerButton = document.getElementById('register-button');
//    if (registerButton) {
//        registerButton.addEventListener('click', async () => {
//            // ... (предыдущий код регистрации остается без изменений до успешной регистрации)
//
//            if (response.ok) {
//                alert(`Курьер успешно зарегистрирован! Ваш ID: ${courierId}`);
//                // Перенаправляем на страницу курьера с новым ID
//                window.location.href = `courier.html?id=${courierId}`;
//            } else {
//                const errorData = await response.json();
//                alert(`Ошибка регистрации: ${errorData.detail || 'Неизвестная ошибка'}`);
//            }
//
//        });
//    }

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

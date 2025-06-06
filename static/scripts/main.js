//document.addEventListener('DOMContentLoaded', function() {
//    // Матричный эффект с японскими иероглифами
//    const canvas = document.createElement('canvas');
//    canvas.className = 'matrix-bg';
//    canvas.style.position = 'fixed';
//    canvas.style.top = '0';
//    canvas.style.left = '0';
//    canvas.style.zIndex = '0';
//    document.body.prepend(canvas);
//
//    const ctx = canvas.getContext('2d');
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
//
//    // Японские иероглифы (кандзи)
//    const kanji = '日本語勉強中春夏秋冬山川空人木水火土金月日時分前後左右上下大小多少男女老若生年月';
//    const fontSize = 20;
//    const columns = canvas.width / fontSize;
//    const rainDrops = [];
//
//    for (let x = 0; x < columns; x++) {
//        rainDrops[x] = Math.random() * canvas.height;
//    }
//
//    const draw = () => {
//        ctx.fillStyle = 'rgba(255, 240, 245, 0.05)';
//        ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//        ctx.fillStyle = '#FF1493';
//        ctx.font = `${fontSize}px "MS Mincho", "SimSun", serif`;
//
//        for (let i = 0; i < rainDrops.length; i++) {
//            const text = kanji.charAt(Math.floor(Math.random() * kanji.length));
//            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
//
//            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//                rainDrops[i] = 0;
//            }
//            rainDrops[i]++;
//        }
//    };
//
//    setInterval(draw, 30);
//
//    window.addEventListener('resize', () => {
//        canvas.width = window.innerWidth;
//        canvas.height = window.innerHeight;
//    });
//
//    // Эффект следования за курсором с сердечками
//    let lastTime = 0;
//    const delay = 100; // Задержка в миллисекундах между появлениями сердечек
//
//    document.addEventListener('mousemove', function(e) {
//        const currentTime = new Date().getTime();
//        if (currentTime - lastTime > delay) {
//            const trail = document.createElement('div');
//            trail.className = 'trail';
//            trail.style.position = 'absolute';
//            trail.style.width = '20px';
//            trail.style.height = '20px';
//            trail.style.backgroundColor = 'transparent';
//            trail.style.pointerEvents = 'none';
//            trail.style.left = (e.pageX - 10) + 'px';
//            trail.style.top = (e.pageY - 10) + 'px';
//            trail.style.zIndex = '4';
//
//            // Используем Unicode символ сердечка
//            trail.textContent = '❤';
//            trail.style.fontSize = '20px';
//            trail.style.color = 'rgba(255, 105, 180, 0.8)';
//
//            document.body.appendChild(trail);
//
//            setTimeout(() => {
//                trail.remove();
//            }, 500);
//
//            lastTime = currentTime;
//        }
//    });
//});


document.addEventListener('DOMContentLoaded', function() {
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
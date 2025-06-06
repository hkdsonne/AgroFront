//// Эффект следования за курсором (розовые круги)
//document.addEventListener('mousemove', function(e) {
//    const cursor = document.createElement('div');
//    cursor.className = 'cursor-trail';
//    cursor.style.left = e.pageX + 'px';
//    cursor.style.top = e.pageY + 'px';
//    document.body.appendChild(cursor);
//
//    setTimeout(() => {
//        cursor.style.opacity = '0';
//        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
//        setTimeout(() => {
//            cursor.remove();
//        }, 300);
//    }, 500);
//});
//
//// Матричный эффект с японскими иероглифами
//const canvas = document.createElement('canvas');
//canvas.className = 'matrix-bg';
//document.body.prepend(canvas);
//
//const ctx = canvas.getContext('2d');
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
//
//// Японские иероглифы (кандзи)
//const kanji = // Эффект падающих иероглифов
//document.addEventListener('DOMContentLoaded', function() {
//    const glyphs = "✧✦❀❁❂❃❄❅❆❇❈❉❊❋❍❎❏❐❑❒❓❔❕❖❗❘❙❚❛❜❝❞❟❠❡❢❣❤❥❦❧";
//    const glyphContainer = document.getElementById('falling-glyphs');
//
//    function createGlyph() {
//        const glyph = document.createElement('div');
//        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
//        glyph.style.position = 'absolute';
//        glyph.style.left = Math.random() * window.innerWidth + 'px';
//        glyph.style.top = '0px';
//        glyph.style.fontSize = '24px';
//        glyph.style.color = 'rgba(255, 105, 180, 0.5)';
//        glyphContainer.appendChild(glyph);
//
//        let posY = 0;
//        const fallInterval = setInterval(() => {
//            posY += 2;
//            glyph.style.top = posY + 'px';
//
//            if (posY > window.innerHeight) {
//                clearInterval(fallInterval);
//                glyph.remove();
//            }
//        }, 20);
//    }
//
//    setInterval(createGlyph, 100);
//});
//
//function loadContent(page) {
//    fetch(`/templates/${page}.html`)
//        .then(response => response.text())
//        .then(html => {
//            document.querySelector('.card').innerHTML = html;
//        })
//        .catch(err => console.error('Failed to load page:', err));
//}
//;
//const fontSize = 20;
//const columns = canvas.width / fontSize;
//const rainDrops = [];
//
//for (let x = 0; x < columns; x++) {
//    rainDrops[x] = Math.random() * canvas.height;
//}
//
//const draw = () => {
//    ctx.fillStyle = 'rgba(255, 240, 245, 0.05)';
//    ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//    ctx.fillStyle = '#FF1493';
//    ctx.font = fontSize + 'px "MS Mincho", "SimSun", serif';
//
//    for (let i = 0; i < rainDrops.length; i++) {
//        const text = kanji.charAt(Math.floor(Math.random() * kanji.length));
//        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
//
//        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
//            rainDrops[i] = 0;
//        }
//        rainDrops[i]++;
//    }
//};
//
//setInterval(draw, 30);
//
//window.addEventListener('resize', () => {
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
//});
//
//// Обработчики кнопок
//document.getElementById('courierBtn').addEventListener('click', () => {
//    window.location.href = '/courier';
//});
//
//document.getElementById('customerBtn').addEventListener('click', () => {
//    window.location.href = '/pokupatel';
//});
//

//// Эффект падающих иероглифов
//document.addEventListener('DOMContentLoaded', function() {
//    const glyphs = "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦鯵";
//    const glyphContainer = document.getElementById('falling-glyphs');
//
//    function createGlyph() {
//        const glyph = document.createElement('div');
//        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
//        glyph.style.position = 'absolute';
//        glyph.style.left = Math.random() * window.innerWidth + 'px';
//        glyph.style.top = '0px';
//        glyph.style.fontSize = '24px';
//        glyph.style.color = 'rgba(255, 105, 180, 0.5)';
//        glyphContainer.appendChild(glyph);
//
//        let posY = 0;
//        const fallInterval = setInterval(() => {
//            posY += 2;
//            glyph.style.top = posY + 'px';
//
//            if (posY > window.innerHeight) {
//                clearInterval(fallInterval);
//                glyph.remove();
//            }
//        }, 20);
//    }
//
//    setInterval(createGlyph, 100);




// РАБОТАЕТ-НЕ ТРОГАЙ

//document.addEventListener('DOMContentLoaded', function() {
//    // Матричный эффект с японскими иероглифами
//    const canvas = document.createElement('canvas');
//    canvas.className = 'matrix-bg';
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
//    // Эффект следования за курсором
//    document.addEventListener('mousemove', function(e) {
//        const trail = document.createElement('div');
//        trail.className = 'trail';
//        trail.style.position = 'absolute';
//        trail.style.width = '10px';
//        trail.style.height = '10px';
//        trail.style.backgroundColor = 'rgba(255, 105, 180, 0.5)';
//        trail.style.borderRadius = '50%';
//        trail.style.pointerEvents = 'none';
//        trail.style.left = (e.pageX - 5) + 'px';
//        trail.style.top = (e.pageY - 5) + 'px';
//        document.body.appendChild(trail);
//
//        setTimeout(() => {
//            trail.remove();
//        }, 500);
//    });
//});





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
//    // Эффект следования за курсором
//    document.addEventListener('mousemove', function(e) {
//        const trail = document.createElement('div');
//        trail.className = 'trail';
//        trail.style.position = 'absolute';
//        trail.style.width = '10px';
//        trail.style.height = '10px';
//        trail.style.backgroundColor = 'rgba(255, 105, 180, 0.5)';
//        trail.style.borderRadius = '50%';
//        trail.style.pointerEvents = 'none';
//        trail.style.left = (e.pageX - 5) + 'px';
//        trail.style.top = (e.pageY - 5) + 'px';
//        trail.style.zIndex = '4';
//        document.body.appendChild(trail);
//
//        setTimeout(() => {
//            trail.remove();
//        }, 500);
//    });
//});



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
//    // Эффект следования за курсором
//    document.addEventListener('mousemove', function(e) {
//        const trail = document.createElement('div');
//        trail.className = 'trail';
//        trail.style.position = 'absolute';
//        trail.style.width = '10px';
//        trail.style.height = '10px';
//        trail.style.backgroundColor = 'rgba(255, 105, 180, 0.5)';
//        trail.style.borderRadius = '50%';
//        trail.style.pointerEvents = 'none';
//        trail.style.left = (e.pageX - 5) + 'px';
//        trail.style.top = (e.pageY - 5) + 'px';
//        trail.style.zIndex = '4';
//        document.body.appendChild(trail);
//
//        setTimeout(() => {
//            trail.remove();
//        }, 500);
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

    // Японские иероглифы (кандзи)
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
    const delay = 100; // Задержка в миллисекундах между появлениями сердечек

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

            // Используем Unicode символ сердечка
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

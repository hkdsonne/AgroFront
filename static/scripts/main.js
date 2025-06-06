// Эффект следования за курсором (розовые круги)
document.addEventListener('mousemove', function(e) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.style.opacity = '0';
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            cursor.remove();
        }, 300);
    }, 500);
});

// Матричный эффект с японскими иероглифами
const canvas = document.createElement('canvas');
canvas.className = 'matrix-bg';
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
    ctx.font = fontSize + 'px "MS Mincho", "SimSun", serif';

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

// Обработчики кнопок
document.getElementById('courierBtn').addEventListener('click', () => {
    window.location.href = '/courier';
});

document.getElementById('customerBtn').addEventListener('click', () => {
    window.location.href = '/pokupatel';
});
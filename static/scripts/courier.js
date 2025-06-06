document.addEventListener('DOMContentLoaded', function() {
    const completeButtons = document.querySelectorAll('.complete-button');

    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const order = this.closest('.order');
            order.querySelector('.status').textContent = 'Завершен';
            this.style.display = 'none';
        });
    });
});

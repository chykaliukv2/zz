const reviewsList = document.getElementById('reviewsList');
const reviewForm = document.getElementById('reviewForm');

// Завантаження відгуків з сервера
async function loadReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();

        reviewsList.innerHTML = ''; // Очищення списку перед додаванням нових відгуків

        reviews.forEach((review) => {
            const div = document.createElement('div');
            div.classList.add('review');
            div.innerHTML = `<p>"${review.text}"</p><span>- ${review.name}</span>`;
            reviewsList.appendChild(div);
        });
    } catch (error) {
        console.error('Помилка завантаження відгуків:', error);
    }
}

// Відправка нового відгуку на сервер
reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('reviewName').value;
    const text = document.getElementById('reviewText').value;

    try {
        await fetch('http://localhost:3000/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, text }),
        });

        loadReviews(); // Оновлення списку відгуків
        reviewForm.reset(); // Очищення форми
    } catch (error) {
        console.error('Помилка додавання відгуку:', error);
    }
});

// Завантаження відгуків при старті сторінки
loadReviews();

// Слайдер
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

setInterval(nextSlide, 3000);

import UserModel from './userModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const userModel = new UserModel();
    const form = document.querySelector('form');

    // Логіка для сторінки РЕЄСТРАЦІЇ
    if (window.location.pathname.includes('registration.html')) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input, select');
            
            const newUser = {
                name: inputs[0].value,
                email: inputs[1].value,
                gender: inputs[2].value,
                dob: inputs[3].value,
                password: inputs[4].value,
                university: "КПІ ім. Ігоря Сікорського", // Дефолтне значення
                specialty: "Комп'ютерна інженерія"       // Дефолтне значення
            };

            try {
                userModel.saveUser(newUser);
                userModel.setCurrentUser(newUser); // Одразу логінимо
                alert('Реєстрація успішна!');
                window.location.href = 'profile.html'; // Перекидаємо на профіль
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Логіка для сторінки ВХОДУ
    if (window.location.pathname.includes('login.html')) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll('input');
            const email = inputs[0].value;
            const password = inputs[1].value;

            if (userModel.login(email, password)) {
                window.location.href = 'profile.html';
            } else {
                alert('Невірний email або пароль!');
            }
        });
    }
});
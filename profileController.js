import UserModel from './userModel.js';

document.addEventListener('DOMContentLoaded', () => {
    const userModel = new UserModel();
    const currentUser = userModel.getCurrentUser();

    // Якщо користувач не залогований, викидаємо на сторінку входу
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Елементи DOM
    const nameHeaders = document.querySelectorAll('.profile-header h3, table tr:nth-child(1) td');
    const emailCell = document.querySelector('table tr:nth-child(2) td');
    const genderCell = document.querySelector('table tr:nth-child(3) td');
    const dobCell = document.querySelector('table tr:nth-child(4) td');
    const avatar = document.querySelector('.avatar-circle');
    const handle = document.querySelector('.profile-header p');
    
    // Функція оновлення відображення
    const renderProfile = (user) => {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        avatar.textContent = initials;
        handle.textContent = '@' + user.email.split('@')[0];
        
        nameHeaders[0].textContent = user.name; // Заголовок
        nameHeaders[1].textContent = user.name; // Таблиця
        emailCell.textContent = user.email;
        
        const genderMap = { 'female': 'Жіноча', 'male': 'Чоловіча', 'other': 'Інша' };
        genderCell.textContent = genderMap[user.gender] || user.gender;
        dobCell.textContent = user.dob;
    };

    renderProfile(currentUser);

    // Логіка виходу (кнопка "Вийти" в хедері)
    const logoutBtn = document.querySelector('.btn-login');
    if (logoutBtn && logoutBtn.textContent === 'Вийти') {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            userModel.logout();
            window.location.href = 'login.html';
        });
    }

    // Логіка редагування
    const editBtn = document.querySelector('.btn-outline-primary');
    let isEditing = false;

    editBtn.addEventListener('click', () => {
        if (!isEditing) {
            // Вмикаємо режим редагування
            isEditing = true;
            editBtn.textContent = 'Зберегти зміни';
            editBtn.classList.replace('btn-outline-primary', 'btn-success');

            // Замінюємо текст на інпути
            nameHeaders[1].innerHTML = `<input type="text" class="form-control form-control-sm" value="${currentUser.name}">`;
            dobCell.innerHTML = `<input type="date" class="form-control form-control-sm" value="${currentUser.dob}">`;
            
            const genderOptions = [
                { val: 'female', text: 'Жіноча' },
                { val: 'male', text: 'Чоловіча' },
                { val: 'other', text: 'Інша' }
            ];
            let selectHTML = `<select class="form-select form-select-sm">`;
            genderOptions.forEach(opt => {
                const selected = currentUser.gender === opt.val ? 'selected' : '';
                selectHTML += `<option value="${opt.val}" ${selected}>${opt.text}</option>`;
            });
            selectHTML += `</select>`;
            genderCell.innerHTML = selectHTML;

        } else {
            // Зберігаємо зміни
            currentUser.name = nameHeaders[1].querySelector('input').value;
            currentUser.dob = dobCell.querySelector('input').value;
            currentUser.gender = genderCell.querySelector('select').value;

            userModel.updateUser(currentUser);
            renderProfile(currentUser);

            isEditing = false;
            editBtn.textContent = 'Редагувати профіль';
            editBtn.classList.replace('btn-success', 'btn-outline-primary');
        }
    });
});
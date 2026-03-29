export default class UserModel {
    constructor() {
        this.usersKey = 'calcMaster_users';
        this.currentUserKey = 'calcMaster_currentUser';
    }

    // Отримати всіх зареєстрованих користувачів
    getUsers() {
        return JSON.parse(localStorage.getItem(this.usersKey)) || [];
    }

    // Зберегти нового користувача
    saveUser(user) {
        const users = this.getUsers();
        if (users.find(u => u.email === user.email)) {
            throw new Error('Користувач з таким email вже існує!');
        }
        users.push(user);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    // Оновити дані користувача (для редагування профілю)
    updateUser(updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === updatedUser.email);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem(this.usersKey, JSON.stringify(users));
            this.setCurrentUser(updatedUser); // Оновлюємо поточну сесію
        }
    }

    // Вхід
    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            this.setCurrentUser(user);
            return true;
        }
        return false;
    }

    // Вихід
    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    // Зберегти поточного залогованого користувача
    setCurrentUser(user) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    }

    // Отримати поточного залогованого користувача
    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.currentUserKey));
    }
}
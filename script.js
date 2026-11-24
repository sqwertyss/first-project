const switcherBtns = document.querySelectorAll('.nav__switcher-btn');
const moviesContent = document.getElementById('movies-content');
const channelsContent = document.getElementById('channels-content');

switcherBtns.forEach(btn => {
    btn.addEventListener('click', (evt) => {
        evt.preventDefault();

        // Убираем активный класс у всех кнопок и добавляем текущей
        switcherBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Получаем значение атрибута data-tab
        const tabName = btn.getAttribute('data-tab');

        // Переключаем видимость блоков в зависимости от выбранной вкладки
        if (tabName === 'movies') {
            moviesContent.classList.remove('hidden');
            channelsContent.classList.add('hidden');
        } else if (tabName === 'channels') {
            channelsContent.classList.remove('hidden');
            moviesContent.classList.add('hidden');
        }
    });
});
const openModalBtn = document.getElementById('login-open-btn');
const modal = document.getElementById('login-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login-input');
const passwordInput = document.getElementById('password-input');
const modalMessage = document.getElementById('modal-message');

const loginOpenBtn = document.getElementById('login-open-btn');
const userPanel = document.getElementById('user-panel');
const logoutBtn = document.getElementById('logout-btn');
const userNameSpan = document.getElementById('user-name');

const CORRECT_LOGIN = "admin";
const CORRECT_PASSWORD = "123";

function checkAuthStatus() {
    const isAuth = localStorage.getItem('isAuthorized');
    const savedName = localStorage.getItem('userName') || "Даша Б.";

    if (isAuth === 'true') {
        loginOpenBtn.classList.add('hidden');
        userPanel.classList.remove('hidden');
        userNameSpan.textContent = savedName;
    } else {
        loginOpenBtn.classList.remove('hidden');
        userPanel.classList.add('hidden');
    }
}

checkAuthStatus();

if (openModalBtn) {
    openModalBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        modal.classList.remove('hidden', 'modal--fade-out');
        modalMessage.textContent = '';
        modalMessage.className = 'modal__message';
    });
}

if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const userLogin = loginInput.value.trim();
        const userPassword = passwordInput.value.trim();

        if (userLogin === CORRECT_LOGIN && userPassword === CORRECT_PASSWORD) {
            modalMessage.textContent = "Всё верно!";
            modalMessage.className = "modal__message modal__message--success";

            localStorage.setItem('isAuthorized', 'true');
            localStorage.setItem('userName', 'Даша Б.');

            setTimeout(() => {
                modal.classList.add('modal--fade-out');

                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('modal--fade-out');
                    loginForm.reset();
                    modalMessage.textContent = '';

                    checkAuthStatus();
                }, 500);
            }, 1000);

        } else {
            modalMessage.textContent = "Неверный логин или пароль!";
            modalMessage.className = "modal__message modal__message--error";
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        localStorage.removeItem('isAuthorized');
        localStorage.removeItem('userName');

        checkAuthStatus();
    });
}
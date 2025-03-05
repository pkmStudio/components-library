/**
 * Класс для управления модальным окном.
 * @class
 */
class Modal {
    /**
     * Создает экземпляр модального окна.
     * @param {string} modalSelector - Селектор модального окна.
     * @param {string} popupSelector - Селектор попапа внутри модального окна.
     * @param {string} responseSelector - Селектор блока response.
     * @param {string} closeButtonSelector - Селектор кнопки закрытия модального окна.
     * @param {string} submitButtonSelector - Селектор кнопки отправки формы.
     * @param {string} resetButtonSelector - Селектор кнопки сброса формы.
     * @param {string} openButtonSelector - Селектор кнопки открытия модального окна.
     */
    constructor(modalSelector, popupSelector, responseSelector, closeButtonSelector, submitButtonSelector, resetButtonSelector, openButtonSelector) {
        // Инициализация элементов
        this.modal = document.querySelector(modalSelector);
        this.popup = document.querySelector(popupSelector);
        this.response = document.querySelector(responseSelector);

        if (!this.modal || !this.popup || !this.response) {
            console.error('Один или несколько элементов не найдены на странице.');
            return;
        }

        // Селекторы для кнопок
        this.closeButtonSelector = closeButtonSelector;
        this.submitButtonSelector = submitButtonSelector; // Добавляем селектор кнопки "Отправить"
        this.resetButtonSelector = resetButtonSelector; // Селектор кнопки "Заполнить снова"
        this.openButtonSelector = openButtonSelector;

        // Привязка контекста для обработчиков событий
        this.handleModalEvents = this.handleModalEvents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handleFormInvalid = this.handleFormInvalid.bind(this);

        // Инициализация событий
        this.init();
    }

    /**
     * Инициализирует обработчики событий.
     * @private
     */
    init() {
        document.addEventListener('click', this.handleModalEvents);
        document.addEventListener('keydown', this.handleModalEvents);

        // Добавляем обработчики для событий CF7
        document.addEventListener('wpcf7mailsent', this.handleFormSubmission, false);
        document.addEventListener('wpcf7invalid', this.handleFormInvalid, false);
    }

    /**
     * Открывает модальное окно.
     */
    openModal() {
        if (this.modal && !this.modal.classList.contains('active')) {
            this.modal.classList.add('active');
        }
    }

    /**
     * Закрывает модальное окно.
     */
    closeModal() {
        if (this.modal && this.modal.classList.contains('active')) {
            this.modal.classList.remove('active');
        }
        if (this.response && this.response.classList.contains('active')) {
            this.response.classList.remove('active');
        }
    }

    /**
     * Обрабатывает успешную отправку формы CF7.
     */
    handleFormSubmission() {
        if (this.response) {
            this.response.classList.add('active'); // Показываем блок response
        }
    }

    /**
     * Обрабатывает невалидную отправку формы CF7.
     */
    handleFormInvalid() {
        if (this.response) {
            this.response.classList.remove('active'); // Скрываем блок response
        }
    }

    /**
     * Обрабатывает события кликов и нажатий клавиш.
     * @param {Event} e - Событие.
     * @private
     */
    handleModalEvents(e) {
        // Обработка кликов
        if (e.type === 'click') {
            const withinBoundaries = e.composedPath().includes(this.popup);

            // Открытие модального окна при клике на кнопку открытия
            if (e.target.closest(this.openButtonSelector)) {
                this.openModal();
            }

            // Закрытие модального окна при клике на кнопку закрытия или вне попапа
            if ((e.target.closest(this.closeButtonSelector) ||
                (!withinBoundaries && !e.target.closest(this.openButtonSelector))) && this.modal.classList.contains('active')) {
                this.closeModal();
            }

            // Обработка клика на кнопку "Отправить"
            if (e.target.closest(this.submitButtonSelector)) {
                // Ничего не делаем, так как отправка формы обрабатывается через CF7
            }

            // Обработка клика на кнопку "Заполнить снова"
            if (e.target.closest(this.resetButtonSelector)) {
                this.response.classList.remove('active');
            }
        }

        // Обработка нажатия клавиши Escape
        if (e.type === 'keydown' && e.key === 'Escape') {
            this.closeModal();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Создание экземпляра класса
    const contactModal = new Modal(
        '.popup-wrap', // Селектор модального окна
        '.popup',      // Селектор попапа
        '.popup__response', // Селектор блока response
        '.popup__close', // Селектор кнопки закрытия
        '.popup__button--submit', // Селектор кнопки "Отправить"
        '.popup__button--reset', // Селектор кнопки "Заполнить снова"
        '.header__body-call' // Селектор кнопки открытия
    );
})

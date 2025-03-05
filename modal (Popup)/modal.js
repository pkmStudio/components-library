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
     * @param {string} actionButtonSelector - Селектор кнопки действия (например, отправки формы).
     * @param {string} openButtonSelector - Селектор кнопки открытия модального окна.
     */
    constructor(modalSelector, popupSelector, responseSelector, closeButtonSelector, actionButtonSelector, openButtonSelector) {
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
        this.actionButtonSelector = actionButtonSelector;
        this.openButtonSelector = openButtonSelector;

        // Привязка контекста для обработчиков событий
        this.handleModalEvents = this.handleModalEvents.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleResponse = this.toggleResponse.bind(this);

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
     * Переключает видимость блока response.
     */
    toggleResponse() {
        if (this.response) {
            this.response.classList.toggle('active');
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

            // Переключение response при клике на кнопку действия
            if (e.target.closest(this.actionButtonSelector)) {
                this.toggleResponse();
            }
        }

        // Обработка нажатия клавиши Escape
        if (e.type === 'keydown' && e.key === 'Escape') {
            this.closeModal();
        }
    }

}

// Создание экземпляра класса
const contactModal = new Modal(
    '.popup-wrap', // Селектор модального окна
    '.popup',      // Селектор попапа
    '.popup__response', // Селектор response
    '.popup__close', // Селектор кнопки закрытия
    '.popup__button', // Селектор кнопки действия
    '.open-popup' // Селектор кнопки открытия
);


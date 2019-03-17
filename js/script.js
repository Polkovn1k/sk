// ОБРАБОТЧИК МОДАЛОК
var modals = {
//слушаем клик по кнопкам вызывающим оверлэи
    listenClickForBtnWhichCallOverlay: () => {
        document.querySelectorAll(".js-overlay-btn").forEach((btnCallingOverlays) => {
            btnCallingOverlays.addEventListener("click", (event) => {
               if (btnCallingOverlays && btnCallingOverlays.contains(event.target)) {
                   event.preventDefault();
                   modals._actionsWithBtnsAndModals(btnCallingOverlays);
               }
            });
        });
    },

//слушаем клик по кнопке закрывающей все оверлэи
    closeAllOverlaysBtn: () => {
        document.querySelectorAll(".js-close-overlays").forEach((btnCloseAllOverlay) => {
            btnCloseAllOverlay.addEventListener("click", (event) => {
               modals._hideOverlays();//убираем все оверлэи
               modals._deleteButtonsStateForAllBtn();//убираем active-btn у всех кнопок
               modals._toggleHtmlScrollForOverlays("enable");//возвращаем скролл для html/body
            });
        });
    },

//слушаем поворот устройства
    listenTurnDevice: () => {
        window.addEventListener("orientationchange", function() {
            modals._hideOverlays();//убираем все оверлэи
            modals._deleteButtonsStateForAllBtn();//убираем active-btn у всех кнопок
            modals._toggleHtmlScrollForOverlays("enable");//возвращаем скролл для html/body
        });
    },

//слушаем ресайз вьюпорта
    listenResizeDevice: () => {
        window.addEventListener("resize", function() {
            modals._hideOverlays();//убираем все оверлэи
            modals._deleteButtonsStateForAllBtn();//убираем active-btn у всех кнопок
            modals._toggleHtmlScrollForOverlays("enable");//возвращаем скролл для html/body
        });
    },

    _actionsWithBtnsAndModals: (clickedBtn) => {
//если содержит active-btn, то..
        if (clickedBtn.classList.contains("active-btn")) {
            modals._hideOverlays();//убираем все оверлэи
            modals._deleteButtonsStateForAllBtn();//убираем active-btn у всех кнопок
            modals._toggleHtmlScrollForOverlays("enable");//возвращаем скролл для html/body
            return false;
        }
//если не содержит active-btn, то..
        modals._hideOverlays();//убираем все оверлэи
        var foundOverlay = modals._findOverlayByClickedBtn(clickedBtn);//находим нужный нам оверлэй
        modals._openCurrentOverlay(foundOverlay);//открываем его
        modals._toggleHtmlScrollForOverlays("disable");//блокируем скролл на html/body
        modals._deleteButtonsStateForAllBtn();//убираем active-btn у всех кнопок
        modals._addButtonState(clickedBtn);//и ставим active-btn только на нажатую кнопку
    },

//убирает active-btn у всех кнопок с классом js-overlay-btn
    _deleteButtonsStateForAllBtn: () => {
        document.querySelectorAll(".js-overlay-btn").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

//убираем класс opened у всех оверлеев с классом js-overlay
    _hideOverlays: () => {
        document.querySelectorAll(".js-overlay").forEach((element) => {
            element.classList.remove("opened");
        });
    },

//открываем нужный оверлэй в зависимости от нажатой кнопки
    _openCurrentOverlay: (currentOverlay) => {
        currentOverlay.classList.add("opened");
    },

//добавляем класс active-btn к конкретной кнопке
    _addButtonState: (btn) => {
        btn.classList.add("active-btn");
    },

//метод находящий нужный оверлэй в зависимости от нажатии конкретной кнопки
    _findOverlayByClickedBtn: (clickedBtn) => {
        var overlayIdForClickedElement = clickedBtn.dataset.overlayId;
        var overlayForClickedElement = document.getElementById(overlayIdForClickedElement);
        return overlayForClickedElement;
    },

//отключаем/включаем скролл на html/body в зависимости от аргумента
    _toggleHtmlScrollForOverlays(state) {
        var toggledElems = document.querySelectorAll('html, body');
        if (state === "disable") {
            for (var i = 0; i < toggledElems.length; i++) {
                toggledElems[i].classList.add('scroll-disabled');
            }
            return false;
        }
        for (var i = 0; i < toggledElems.length; i++) {
            toggledElems[i].classList.remove('scroll-disabled');
        }
    },

    init: () => {
        modals.listenClickForBtnWhichCallOverlay();
        modals.closeAllOverlaysBtn();
        modals.listenTurnDevice();
        modals.listenResizeDevice();
    },
};
modals.init();
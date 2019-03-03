// ОБРАБОТЧИК МОДАЛОК
var modals = {
//обработчик для оверлеев с одной кнопкой вызова/закрытия
    listenClickForOneBtn: () => {
        document.addEventListener("click", (event) => {
            document.querySelectorAll(".js-overlay-btn").forEach((btnCallingOverlays) => {
                if (btnCallingOverlays && btnCallingOverlays.contains(event.target)) {
                    modals.toggleForOneBtnAndModals(btnCallingOverlays);
                }
            });
        });
    },

    toggleForOneBtnAndModals: (clickedBtn) => {
        if (clickedBtn.classList.contains("active-btn")) {
            modals.hideOverlays();
            modals.deleteButtonsStateForOneBtn();
            modals.toggleHtmlScrollForOverlays('enable');
            return false;
        }
        modals.hideOverlays();
        modals.openOverlayForClickedButton(clickedBtn);
        modals.deleteButtonsStateForOneBtn();
        modals.addButtonState(clickedBtn);
    },

    deleteButtonsStateForOneBtn: () => {
        document.querySelectorAll(".js-overlay-btn").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

//обработчик для оверлеев с двумя кнопками вызова/закрытия
    listenClickForTwoBtn: () => {
        document.addEventListener("click", (event) => {
            document.querySelectorAll(".js-overlay-two-btn").forEach((btnCallingOverlays) => {
                if (btnCallingOverlays && btnCallingOverlays.contains(event.target)) {
                    modals.toggleForTwoBtnsAndModals(btnCallingOverlays);
                }
            });
        });
    },

    toggleForTwoBtnsAndModals: (clickedBtn) => {
        if (clickedBtn.classList.contains("js-overlay-two-btn--close")) {
            modals.hideOverlays();
            modals.deleteButtonsStateForTwoBtn();
            modals.toggleHtmlScrollForOverlays('enable');
            return false;
        }
        modals.hideOverlays();
        modals.openOverlayForClickedButton(clickedBtn);
        modals.deleteButtonsStateForTwoBtn();
        modals.addButtonState(clickedBtn);
    },

    deleteButtonsStateForTwoBtn: () => {
        document.querySelectorAll(".js-overlay-two-btn").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

//Общие обработчики для всех типов кнопок
    listenTurnDevice: () => {
        window.addEventListener("orientationchange", function() {
            modals.hideOverlays();
            modals.deleteButtonsStateForOneBtn();
            modals.deleteButtonsStateForTwoBtn();
            modals.toggleHtmlScrollForOverlays('enable');
        });
    },

    listenResizeDevice: () => {
        window.addEventListener("resize", function() {
            modals.hideOverlays();
            modals.deleteButtonsStateForOneBtn();
            modals.deleteButtonsStateForTwoBtn();
            modals.toggleHtmlScrollForOverlays('enable');
        });
    },

    hideOverlays: () => {
        document.querySelectorAll(".js-overlay").forEach((element) => {
            element.classList.remove("opened");
        });
    },

    addButtonState: (btn) => {
        btn.classList.add("active-btn");
    },

    openOverlayForClickedButton: (clickedBtn) => {
        let overlayIdForClickedElement = clickedBtn.dataset.overlayId;
        let overlayForClickedElement = document.getElementById(overlayIdForClickedElement);
        overlayForClickedElement.classList.add("opened");
        modals.toggleHtmlScrollForOverlays('disable');
    },

    toggleHtmlScrollForOverlays(state) {
        let toggledElems = document.querySelectorAll('html, body');
        if (state === 'disable') {
            for (let i = 0; i < toggledElems.length; i++) {
                toggledElems[i].classList.add('scroll-disabled');
            }
            return false;
        }
        for (let i = 0; i < toggledElems.length; i++) {
            toggledElems[i].classList.remove('scroll-disabled');
        }
    },
};
modals.listenClickForOneBtn();
modals.listenClickForTwoBtn();
modals.listenTurnDevice();
modals.listenResizeDevice();
//---------------------------------------------------------------
var productNav = {

    catalogButtons: [
        ".js-product-nav__sub-nav-tog",
    ],

    TRANSITION_TIME: "300",

    // ОБРАБОТЧИК ФИЛЬТРА
    filterShowContent: () => {
        productNav.catalogButtons.forEach(function(item) {
            document.querySelectorAll(item).forEach((item) => {
                item.addEventListener("click", (event) => {
                    item.classList.toggle("active-btn");
                    if (item.classList.contains("js-product-nav__sub-nav-tog")) {
                        productNav.findFilterContentId(item);
                        return false;
                    }
                    productNav.findOtherContentId(item);
                });
            });
        });
    },

    // Высота элемента без учета схлопывания
    elementHeightBeforeCollapse: (item) => {
        item.style.maxHeight = item.scrollHeight + "px";
        item.style.maxHeight = "0px";
    },

    // Убираем ограничитель высоты
    deleteItemMaxHeight: (item) => {
        setTimeout(function() {
            item.style.maxHeight = "none";
        }, productNav.TRANSITION_TIME);
    },

    // Находим элемент через id с помощью data-атрибута (без заданной высоты)
    findFilterContentId: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
        if (!item.classList.contains("active-btn")) {
            productNav.elementHeightBeforeCollapse(findContentElementByID);
            return false;
        }
        productNav.deleteItemMaxHeight(findContentElementByID);
    },

    // ДЛЯ ЭЛЕМЕНТОВ С ФИКСИРОВАННОЙ ВЫСОТОЙ
    findOtherContentId: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        if (item.classList.contains("active-btn")) {
            findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
            return false;
        }
        findContentElementByID.style.removeProperty("max-height");
    },
};
productNav.filterShowContent();
//---------------------------------------------------------------
var footerNav = {
    catalogButtons: [".js-footer-nav__nav-tog"],

    TRANSITION_TIME: "300",

    // ОБРАБОТЧИК ФИЛЬТРА
    filterShowContent: () => {
        footerNav.catalogButtons.forEach(function(item) {
            document.querySelectorAll(item).forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (item === event.target & !item.classList.contains("active-btn")) {
                        footerNav.filterShowRemoveAllActiveStateBtns();
                    }
                    item.classList.toggle("active-btn");
                    if (item.classList.contains("js-product-nav__sub-nav-tog")) {
                        footerNav.findFilterContentId(item);
                        return false;
                    }
                    footerNav.findOtherContentId(item);
                });
            });
        });
    },

    filterShowRemoveAllActiveStateBtns: () => {
        document.querySelectorAll(".js-footer-nav__nav-tog").forEach((element) => {
            element.classList.remove("active-btn");
            footerNav.findOtherContentId(element);
        });
    },

    // Высота элемента без учета схлопывания
    elementHeightBeforeCollapse: (item) => {
        item.style.maxHeight = item.scrollHeight + "px";
        item.style.maxHeight = "0px";
    },

    // Убираем ограничитель высоты
    deleteItemMaxHeight: (item) => {
        setTimeout(function() {
            item.style.maxHeight = "none";
        }, footerNav.TRANSITION_TIME);
    },

    // Находим элемент через id с помощью data-атрибута (без заданной высоты)
    findFilterContentId: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
        if (!item.classList.contains("active-btn")) {
            footerNav.elementHeightBeforeCollapse(findContentElementByID);
            return false;
        }
        footerNav.deleteItemMaxHeight(findContentElementByID);
    },

    // ДЛЯ ЭЛЕМЕНТОВ С ФИКСИРОВАННОЙ ВЫСОТОЙ
    findOtherContentId: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        if (item.classList.contains("active-btn")) {
            findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
            return false;
        }
        findContentElementByID.style.removeProperty("max-height");
    },
};
footerNav.filterShowContent();


//тоглер подписки в футера
var subscription = {
    subscriptionElement: [".js-subscription__btn", ".js-subscription__input"],

    togleElements: () => {
        var checkedSubscription = document.querySelector(".js-switch__label");
        checkedSubscription.addEventListener("click", (event) => {
            subscription.subscriptionElement.forEach((element) => {
                document.querySelector(element).classList.toggle("active");
            });
        });
    },
};
subscription.togleElements();
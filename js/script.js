// ОБРАБОТЧИК МОДАЛОК
var modals = {
//обработчик для оверлеев с одной кнопкой вызова/закрытия
    listenClickForOneBtn: () => {
        document.addEventListener("click", (event) => {
            event.preventDefault();
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
            event.preventDefault();
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
    deleteItemMaxHeightAfterAnimation: (item) => {
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
        productNav.deleteItemMaxHeightAfterAnimation(findContentElementByID);
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
//раскрытие пунктов навигаций в футере
var footerNav = {
    catalogButtons: ".js-footer-nav__nav-tog",

    catalogCollapsedContent: ".js-footer-nav__links-list",

    clickListener: (btns) => {
        document.querySelectorAll(btns).forEach(function(item) {
            item.addEventListener("click", (event) => {
                if (!item.classList.contains("active-btn")) {
                    footerNav.removeAllBtnsActive();
                    footerNav.removeAllContentsHeight();
                    item.classList.add("active-btn");
                    footerNav.openDataToIdContent(item);
                    return false;
                }
                footerNav.removeAllBtnsActive();
                footerNav.removeAllContentsHeight();
            });
        });
    },

    removeAllBtnsActive: () => {
        document.querySelectorAll(footerNav.catalogButtons).forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

    removeAllContentsHeight: () => {
        document.querySelectorAll(footerNav.catalogCollapsedContent).forEach((element) => {
            element.style.removeProperty("max-height");
        });
    },

    openDataToIdContent: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        if (item.classList.contains("active-btn")) {
            findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
            return false;
        }
    },
};
footerNav.clickListener(footerNav.catalogButtons);
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
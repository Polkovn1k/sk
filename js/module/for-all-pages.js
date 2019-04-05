/*---JS ДЛЯ ВСЕХ СТРАНИЦ---*/

//ТОГЛЕР
var subscription = {

    toggleElementsAfterSwitch: () => {
        document.querySelectorAll(".js-disable-by-switch").forEach((clickedSwitchBtn) => {
            clickedSwitchBtn.addEventListener("click", (event) => {
                var elementsForDisableCollection = subscription._getElementsCollectionByBtnData(clickedSwitchBtn);
                elementsForDisableCollection.forEach((element) => {
                    element.classList.toggle("disabled");
                });
            });
        });
    },

    _getElementsCollectionByBtnData: (clickedBtn) => {
        var getClassName = clickedBtn.dataset.class;
        return document.querySelectorAll("."+getClassName);
    },

    init: () => {
        subscription.toggleElementsAfterSwitch();
    },
};
subscription.init();

//КНОПКА СКРОЛА НА ВЕРХ СТРАНИЦЫ
var scrollTopAfterScrollDown = {

    MIN_HEIGHT_FOR_APPEAR_BTN: 300,

    listenScroll: () => {
        var scrolledElement = document.querySelector("html");
        var btnForScrollTop = document.querySelector(".scroll-up");
        window.addEventListener("scroll", (event) => {
            if (scrolledElement.getBoundingClientRect().top < -scrollTopAfterScrollDown.MIN_HEIGHT_FOR_APPEAR_BTN) {
                scrollTopAfterScrollDown._addAcrive(btnForScrollTop);
                return false;
            }
            scrollTopAfterScrollDown._removeAcrive(btnForScrollTop);
        });
    },

    listenClick: () => {
        document.querySelector(".scroll-up").addEventListener("click", (event) => {
            window.scrollTo(0, 0);
        });
    },

    _addAcrive: (btn) => {
        if (btn.classList.contains("active")) {
            return false;
        };
        btn.classList.add("active");
    },

    _removeAcrive: (btn) => {
        if (!btn.classList.contains("active")) {
            return false;
        };
        btn.classList.remove("active");
    },

    init: () => {
        scrollTopAfterScrollDown.listenScroll();
        scrollTopAfterScrollDown.listenClick();
    },
};
scrollTopAfterScrollDown.init();

//ОБРАБОТЧИК ПЛАВНОГО ПОЯВЛЕНИЯ СХЛОПНУТЫХ ЭЛЕМЕНТОВ С ТОГГЛ СТИЛЕМ (В ФУТЕРЕ)
var expandCollapsedItemsToggleStyle = {

    clickListener: () => {
        document.querySelectorAll(".js-call-collapsed-toggle").forEach(function(item) {
            item.addEventListener("click", (event) => {
                if (!item.classList.contains("active-btn")) {
                    expandCollapsedItemsToggleStyle._removeAllBtnsActive();//у всех кнопок убираем active-btn
                    expandCollapsedItemsToggleStyle._removeAllContentsHeight();//убираем все высоты у схопнутых элементов
                    item.classList.add("active-btn");//на нажатую кнопку вешаем active-btn
                    expandCollapsedItemsToggleStyle._openDataToIdContent(item);//и открываем нужный контент по нажатой кнопке
                    return false;
                }
                //если у нажатой кнопки есть active-btn то...
                expandCollapsedItemsToggleStyle._removeAllBtnsActive();//у всех кнопок убираем active-btn
                expandCollapsedItemsToggleStyle._removeAllContentsHeight();//убираем все высоты у схопнутых элементов
                return false;
            });
        });
    },

    _removeAllBtnsActive: () => {
        document.querySelectorAll(".js-call-collapsed-toggle").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

    _removeAllContentsHeight: () => {
        document.querySelectorAll(".js-collapsed-element-tog").forEach((element) => {
            element.style.removeProperty("max-height");
        });
    },

    _openDataToIdContent: (item) => {
        var findContentElementByID = document.getElementById(item.dataset.findId);
        if (item.classList.contains("active-btn")) {
            findContentElementByID.style.maxHeight = findContentElementByID.scrollHeight + "px";
            return false;
        }
    },

    init: () => {
        expandCollapsedItemsToggleStyle.clickListener();
    }
};
expandCollapsedItemsToggleStyle.init();

//ОБРАБОТЧИК МОДАЛОК
var modals = {

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

    closeAllOverlaysBtn: () => {
        document.querySelectorAll(".js-close-overlays").forEach((btnCloseAllOverlay) => {
            btnCloseAllOverlay.addEventListener("click", (event) => {
               modals._hideOverlays();
               modals._deleteButtonsStateForAllBtn();
               modals._toggleHtmlScrollForOverlays("enable");
            });
        });
    },

    listenTurnDevice: () => {
        window.addEventListener("orientationchange", function() {
            modals._hideOverlays();
            modals._deleteButtonsStateForAllBtn();
            modals._toggleHtmlScrollForOverlays("enable");
        });
    },

    listenResizeDevice: () => {
        window.addEventListener("resize", function() {
            modals._hideOverlays();
            modals._deleteButtonsStateForAllBtn();
            modals._toggleHtmlScrollForOverlays("enable");
        });
    },

    _actionsWithBtnsAndModals: (clickedBtn) => {
        if (clickedBtn.classList.contains("active-btn")) {
            modals._hideOverlays();
            modals._deleteButtonsStateForAllBtn();
            modals._toggleHtmlScrollForOverlays("enable");
            return false;
        }
        modals._hideOverlays();
        var foundOverlay = modals._findOverlayByClickedBtn(clickedBtn);
        modals._openCurrentOverlay(foundOverlay);
        modals._toggleHtmlScrollForOverlays("disable");
        modals._deleteButtonsStateForAllBtn();
        modals._addButtonState(clickedBtn);
    },

    _deleteButtonsStateForAllBtn: () => {
        document.querySelectorAll(".js-overlay-btn").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

    _hideOverlays: () => {
        document.querySelectorAll(".js-overlay").forEach((element) => {
            element.classList.remove("opened");
        });
    },

    _openCurrentOverlay: (currentOverlay) => {
        currentOverlay.classList.add("opened");
    },

    _addButtonState: (btn) => {
        btn.classList.add("active-btn");
    },

    _findOverlayByClickedBtn: (clickedBtn) => {
        var overlayIdForClickedElement = clickedBtn.dataset.overlayId;
        var overlayForClickedElement = document.getElementById(overlayIdForClickedElement);
        return overlayForClickedElement;
    },

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
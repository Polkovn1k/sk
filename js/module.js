//СЛАЙДЕР В КОРЗИНЕ

if (document.querySelector(".basket-slider")) {

    var glideAdvantages = new Glide('.js-advantages-slider', {
      perView: 1,
      dragThreshold: 120,
      bound: true,
    });
    glideAdvantages.mount();

}
//ПРЕЛОАДЕР НА КНОПКУ В ДЕТАЛЬНОЙ СТРАНИЦЕ

if (document.querySelector(".btn-loader")) {

    var btnLoader = {

        element: document.querySelector(".js-btn-loader"),

        activeLoader: () => {
            btnLoader.element.classList.add("active");
        },

        hideLoader: () => {
            btnLoader.element.classList.remove("active");
        },

    };
//btnLoader.activeLoader(); - показать прелоадер
//btnLoader.hideLoader(); - скрыть прелоадер

}
//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА И ПОДГРУЖАЕМ ПОДЛОЖКУ "ПУСТО" ЕСЛИ ЭЛЕМЕНТОВ БОЛЬШЕ НЕТ
if (document.querySelector(".del-elements-and-ajax")) {

    var removeElementAndAddAjax = {
        listenBtnsClick: () => {
            var deleteButtons = document.querySelectorAll(".js-delete-button");
            deleteButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.preventDefault();
                    button.closest(".js-deleted-item").remove();
                    if (document.querySelectorAll(".js-deleted-item").length <= 0) {
                        var jsonPathString = removeElementAndAddAjax._getDataForLoadJsonFile();
                        removeElementAndAddAjax._checkToLastElement();
                        removeElementAndAddAjax._loadAjaxAfterCleanContainer(jsonPathString);
                        removeElementAndAddAjax._scrolTopAfterAjax();
                    }
                });
            });
        },

        listenMainBtnForDelClick: () => {
            document.querySelectorAll(".js-remove-container").forEach((btnForDeleteContainer) => {
                btnForDeleteContainer.addEventListener("click", (event) => {
                    event.preventDefault();
                    var jsonPathString = removeElementAndAddAjax._getDataForLoadJsonFile();
                    document.querySelector(".js-deleted-container").remove();
                    removeElementAndAddAjax._loadAjaxAfterCleanContainer(jsonPathString);
                    removeElementAndAddAjax._scrolTopAfterAjax();
                });
            });
        },

        _checkToLastElement: () => {
            document.querySelector(".js-deleted-container").remove();
        },

        _loadAjaxAfterCleanContainer: (jsonPath) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", (event) => {
                console.log(JSON.parse(xhr.responseText));
                var loadedAjax = JSON.parse(xhr.responseText);
                var htmlFragment = document.createRange().createContextualFragment(loadedAjax);
                document.querySelector(".js-add-container").appendChild(htmlFragment);
            });
            xhr.open("GET", "json/"+jsonPath+".json");
            xhr.send();
        },

        _getDataForLoadJsonFile: () => {
            var btnWithData = document.querySelector(".js-remove-container");
            return btnWithData.dataset.json;
        },

        _scrolTopAfterAjax: () => {
            window.scrollTo(0, 0);
        },

        init: () => {
            removeElementAndAddAjax.listenBtnsClick();
            removeElementAndAddAjax.listenMainBtnForDelClick();
        },
    };
    removeElementAndAddAjax.init();

}
//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".delete-after-click")) {

    var hideElementPerClick = {
        listenClick: () => {
            document.querySelectorAll(".js-btn-delete").forEach((item) => {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    item.closest(".js-deleted-element").remove();
                });
            });
        },

        init: () => {
            hideElementPerClick.listenClick();
        },
    };
    hideElementPerClick.init();

}
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
        document.querySelectorAll(".js-overlay-btn:not(.js-inited)").forEach((btnCallingOverlays) => {
            modals._addInitializedStatus(btnCallingOverlays);
            btnCallingOverlays.addEventListener("click", (event) => {
                event.preventDefault();
               if (btnCallingOverlays && btnCallingOverlays.contains(event.target)) {
                   event.preventDefault();
                   modals._actionsWithBtnsAndModals(btnCallingOverlays);
               }
            });
        });
    },

    listenEscForCloseOverlays: () => {
        document.addEventListener("keydown", (event) => {
            document.querySelectorAll(".js-overlay.opened").forEach((overlay) => {
                if (event.keyCode === 27) {
                    modals._hideOverlays();
                    modals._deleteButtonsStateForAllBtn();
                    modals._toggleHtmlScrollForOverlays("enable");
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
        document.querySelectorAll(".js-overlay").forEach((btnCloseAllOverlay) => {
            btnCloseAllOverlay.addEventListener("click", function(event) {
               if (event.target === this) {
                  modals._hideOverlays();
                  modals._deleteButtonsStateForAllBtn();
                  modals._toggleHtmlScrollForOverlays("enable");
               }
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
            if (document.documentElement.clientWidth >= 1024) {
                modals._hideOverlays();
                modals._deleteButtonsStateForAllBtn();
                modals._toggleHtmlScrollForOverlays("enable");
            }
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

    _setScrollPosition: (state) => {
        var scrollPosition = window.pageYOffset;
        var wrapper = document.querySelector(".wrapper");
        var html = document.querySelector("html");
        if (state === "getScroll") {
            wrapper.style.top = -scrollPosition + "px";
            wrapper.setAttribute("data-scroll", scrollPosition);
            html.classList.add("disable-smooth");
            return false;
        }
        if (!wrapper.dataset.scroll) return false
        window.scrollTo(0, wrapper.dataset.scroll);
        wrapper.removeAttribute("style");
        html.classList.remove("disable-smooth");
        wrapper.setAttribute("data-scroll", "");
    },

    _toggleHtmlScrollForOverlays(state) {
        var toggledElems = document.querySelectorAll('html, body');
        if (state === "disable") {
            modals._setScrollPosition("getScroll");
            for (var i = 0; i < toggledElems.length; i++) {
                toggledElems[i].classList.add('scroll-disabled');
            }
            return false;
        }
        for (var i = 0; i < toggledElems.length; i++) {
            toggledElems[i].classList.remove('scroll-disabled');
        }
        modals._setScrollPosition("setScroll");
    },

    _addInitializedStatus: (clickedBtn) => {
        clickedBtn.classList.add("js-inited");
    },

    init: () => {
        modals.listenEscForCloseOverlays();
        modals.listenClickForBtnWhichCallOverlay();
        modals.closeAllOverlaysBtn();
        modals.listenTurnDevice();
        modals.listenResizeDevice();
    },
};
modals.init();

//МОДАЛКА ВХОДА/РЕГИСТРАЦИИ
var joinModal = {
    container: document.getElementById("profile-block"),
    joinBtns: document.querySelectorAll(".js-profile__tab"),
    joinItems: document.querySelectorAll(".js-profile-item"),
    btnToDefault: document.querySelectorAll(".js-default-overlay"),

    init: () => {
        joinModal.joinBtns.forEach(function(item) {
            item.addEventListener("click", function(event) {
                joinModal._removeBtnActiveClasses(joinModal.joinBtns);
                joinModal._removeBlockActiveClasses(joinModal.joinItems);
                joinModal._openBlock(event.target);
                joinModal._activeBtn(event.target);
            });
        });
    },

    resetOverlayView: () => {
        joinModal.btnToDefault.forEach(function(item) {
            item.addEventListener("click", function(event) {
                if (!joinModal.container.classList.contains("opened")) {
                    joinModal._removeBtnActiveClasses(joinModal.joinBtns);
                    joinModal._removeBlockActiveClasses(joinModal.joinItems);
                    document.querySelector(".js-profile-join").classList.add("active");
                    document.querySelector(".js-first-tab").classList.add("active-btn");
                    return false;
                }
            });
        });
    },

    _removeBtnActiveClasses: (allBtns) => {
        allBtns.forEach(function(bItem) {
            bItem.classList.remove("active-btn");
        });
    },

    _removeBlockActiveClasses: (allBlocks) => {
        allBlocks.forEach(function(jItem) {
            jItem.classList.remove("active");
        });
    },

    _openBlock: (opt) => {
        var currentBtn = opt.dataset.toClass;
        for (var i = 0; i < joinModal.joinItems.length; i++) {
            if (joinModal.joinItems[i].classList.contains(currentBtn)) {
                joinModal.joinItems[i].classList.add("active");
            }
        };
    },

    _activeBtn: (opt) => {
        for (var i = 0; i < joinModal.joinBtns.length; i++) {
            opt.classList.add("active-btn");
        };
    },
};
joinModal.init();
joinModal.resetOverlayView();


//ПРЕЛОАДЕР
var loader = {

    element: document.querySelector(".loader"),

    activeLoader: () => {
        loader.element.style.display = "block";
        loader.element.classList.add("active");
    },

    hideLoader: () => {
        loader.element.classList.remove("active");
        setTimeout(loader._afterHideEffect, 700);
    },

    _afterHideEffect: () => {
        loader.element.style.display = "none";
    },
};
//loader.activeLoader();
//loader.hideLoader();

//--------------------------------------------------------------------------
window.addEventListener("load", (event) => {
    fetch("json/ajax-product-nav-brands.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(item) {
            var htmlFragment = document.createRange().createContextualFragment(item);
            document.querySelector(".js-product-link-ajax").appendChild(htmlFragment);
        })
});

//Throttle для различных событий
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function() {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

//ACTIVE для кнопок добавить в избранное/сравнение
if (document.querySelector(".js-active-status")) {

    compareOrFavoriteBtn = {

        listenClick: () => {
            document.querySelectorAll(".js-active-status").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    compareOrFavoriteBtn.action(btn);
                });
            });
        },

        action: (element) => {
            element.classList.toggle("added");
        },

        init: () => {
            compareOrFavoriteBtn.listenClick();
        }

    }
    compareOrFavoriteBtn.init();

}
//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".grid-tog")) {

    var gridStyle = {

        listenClick: () => {
            document.querySelectorAll(".js-sort-view").forEach(function(item) {
                item.addEventListener("click", function(event) {
                    gridStyle._switch(item);
                });
            });
        },

        _switch: (opt) => {
            document.querySelectorAll(".js-sort-view").forEach(function(elements) {
                document.querySelectorAll(".js-products-list-container").forEach((container) => {
                    container.classList.remove(elements.dataset.toClass);
                });
                elements.classList.remove("active-btn");
            });
            document.querySelectorAll(".js-products-list-container").forEach((container) => {
                container.classList.add(opt.dataset.toClass);
            });
            opt.classList.add("active-btn");
        },

        init: () => {
            gridStyle.listenClick();
        },
    };
    gridStyle.init();

}
//УДАЛЯЕМ ЭЛЕМЕНТ ПОСЛЕ КЛИКА НА ИКОНКУ

if (document.querySelector(".hide-sort")) {

    var hideSort = {
        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.addEventListener("click", (event) => {
                    if (item.classList.contains("js-hide-sort")) {
                        document.querySelector(".sort").classList.add("disabled");
                        document.querySelector(".filters").classList.add("disabled");
                        return false;
                    }
                    document.querySelector(".sort").classList.remove("disabled");
                    document.querySelector(".filters").classList.remove("disabled");
                });
            });
        },

        init: () => {
            hideSort.listenClick();
        },
    };
    hideSort.init();

}
//ПЛАВНОЕ ОТКРЫТИЕ СХЛОПНУТЫХ ЭЛЕМЕНТОВ
if (document.querySelector(".open-collapsed")) {

    var expandCollapsedItems = {

        showCollapsedElement: () => {
            var btnForClick = document.querySelectorAll(".js-call-collapsed-element:not(.js-inited)");
            btnForClick.forEach(function(clickedBtn) {
                expandCollapsedItems._addInitializedStatus(clickedBtn);
                clickedBtn.addEventListener("click", (event) => {
                    var currentCollapsedElement = expandCollapsedItems._findClickedBtnsDataToId(clickedBtn);
                    //Если нажатая кнопка содержит active то контейнер схлопываем
                    if (clickedBtn.classList.contains("active")) {
                        expandCollapsedItems._removeActiveStatus(clickedBtn);
                        expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                        expandCollapsedItems._removeActiveStatus(currentCollapsedElement);
                        setTimeout(() => {
                            expandCollapsedItems._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                        }, 0);
                        return false;
                    }
                    //Если нажатая кнопка НЕ содержит active то контейнер развертываем
                    expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                    expandCollapsedItems._addActiveStatus(currentCollapsedElement);
                    expandCollapsedItems._addActiveStatus(clickedBtn);
                    currentCollapsedElement.addEventListener("transitionend", (event) => {
                        expandCollapsedItems._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                    });
                });
            });
        },

//Добавляем активность нажатой кнопке
        _addActiveStatus: (element) => {
            element.classList.add("active");
        },

//Удаляем активность нажатой кнопке
        _removeActiveStatus: (element) => {
            element.classList.remove("active");
        },

//Удаляем максимальную высоту элемента, поставленную инлайном - ДО раскрытия
        _deleteInlineStyleBeforeCollapsed: (collapsedElement) => {
            collapsedElement.style.removeProperty("max-height");
        },

//Находим элемент который неоходимо схлопнуть или раскрыть в зависимости от нажатой кнопки
        _findClickedBtnsDataToId: (clickedBtn) => {
            return document.getElementById(clickedBtn.dataset.findId);
        },

//Получаем реальную высоту элемента и задаем ее в качестве максимальной высоты
        _getTrueElementHeight: (collapsedElement) => {
            collapsedElement.style.maxHeight = collapsedElement.scrollHeight + "px";
        },

//Присваиваем статус "инициализированна"
        _addInitializedStatus: (clickedBtn) => {
            clickedBtn.classList.add("js-inited");
        },

        init: () => {
            expandCollapsedItems.showCollapsedElement();
        },
    };
    expandCollapsedItems.init();

}
//ПРЕЛОАДЕР НА СТРАНИЦЕ ОФОРМЛЕНИЯ ЗАКАЗА

if (document.querySelector(".order-loader")) {

    var orderLoader = {

        element: document.querySelector(".order__loader"),

        activeLoader: () => {
            orderLoader.element.style.display = "block";
            orderLoader.element.classList.add("active");
        },

        hideLoader: () => {
            orderLoader.element.classList.remove("active");
            setTimeout(orderLoader._afterHideEffect, 700);
        },

        _afterHideEffect: () => {
            orderLoader.element.style.display = "none";
        },
    };
//orderLoader.activeLoader(); - показать прелоадер
//orderLoader.hideLoader(); - скрыть прелоадер

}
//КОММЕНТАРИИ К ОТВЕТАМ
if (document.querySelector(".response-to-question")) {

    var articlePage = {
        listenBtnCallingReplyForm: () => {
            document.querySelectorAll(".js-reply-btn").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    articlePage._removeAllFormActive();
                    articlePage._removeAllBtnsHidden();
                    articlePage._addHiddenToClickedBtns(item);
                    var clickedBtnParent = articlePage._findClickedBtnsParent(item);
                    var findRequiredElement = articlePage._findSiblingAndMakeActive(clickedBtnParent);
                    articlePage._doFormActive(findRequiredElement);
                });
            });
        },

        listenBtnClosingReplyForm: () => {
            document.querySelectorAll(".js-btn-cancel").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    event.preventDefault();
                    articlePage._removeAllFormActive();
                    articlePage._removeAllBtnsHidden();
                });
            });
        },

        _addHiddenToClickedBtns: (clickedBtn) => {
            clickedBtn.classList.add("hidden");
        },

        _doFormActive: (element) => {
            element.classList.add("active");
        },

        _findClickedBtnsParent: (clickedBtn) => {
            return clickedBtn.parentElement;
        },

        _findSiblingAndMakeActive: (element) => {
            return element.nextElementSibling;
        },

        _removeAllFormActive: () => {
            document.querySelectorAll(".js-discussion-form").forEach((item) => {
                item.classList.remove("active");
            });
        },

        _removeAllBtnsHidden: () => {
            document.querySelectorAll(".js-reply-btn").forEach((item) => {
                item.classList.remove("hidden");
            });
        },

        init: () => {
            articlePage.listenBtnCallingReplyForm();
            articlePage.listenBtnClosingReplyForm();
        },
    };
    articlePage.init();

}
//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".scroll-spy")) {

    var scrollSpy = {

        DEVIDER_FOR_SECTION: 2,

        listenScroll: () => {
            window.addEventListener("scroll", (event) => {
                scrollSpy._getCurrentSectionAfterScroll(".js-static-content");
            });
        },

        _getCurrentSectionAfterScroll: (item) => {
            var sections = document.querySelectorAll(item);
            for(var i = 0; i < sections.length; i++) {
                if (scrollSpy._isBelowScroll(sections[i]))
                    break;
            }
            if (sections[i]) {
                scrollSpy._changeLinkStatus(sections[i].id);
            }
        },

        _isBelowScroll: (element) => {
            var position = element.getBoundingClientRect();
            var sectionHeight = scrollSpy._getCurrentElementHeight(element);
            var headerHeight = scrollSpy._getHeaderHeight(".js-header");
            return position.top > -((sectionHeight - headerHeight) / scrollSpy.DEVIDER_FOR_SECTION);
        },

        _getCurrentElementHeight: (element) => {
            return element.offsetHeight;
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        _changeLinkStatus: (id) => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.classList.remove("active-btn");
            });
            document.querySelector(".js-sticky-btn[href='#"+id+"']").classList.add("active-btn");
        },

        init: () => {
            scrollSpy.listenScroll();
        },

    };
    scrollSpy.init();

}
//ПЕКЛЮЧЕНИЕ ОТОБРАЖЕНИЯ СОРТИРОВОК
if (document.querySelector(".sort-change")) {

    var sortToggle = {
        listenClickInSort: () => {
            document.querySelectorAll(".js-sort").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    sortToggle._removeAllBtnsActive(".js-sort");
                    sortToggle._addActiveForBtns(item);
                    sortToggle._toggleArrowDirection(event.currentTarget);
                });
            });
        },

        listenClickInAddSort: () => {
            document.querySelectorAll(".js-add-sort").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    sortToggle._removeAllBtnsActive(".js-add-sort");
                    sortToggle._addActiveForBtns(item);
                });
            });
        },

        _toggleArrowDirection: (currentTarget) => {
          var allElements = document.querySelectorAll(".js-sort");
          for (var i = 0; i < allElements.length; i++) {
              if (allElements[i] == currentTarget) {
                  sortToggle._toggleCurrentElementArrow(allElements[i]);
                  continue;
              }
              sortToggle._removeAllDirection(allElements[i]);
          }
        },

        _removeAllDirection: (item) => {
            if (item.classList.contains("down")) {
                item.classList.remove("down");
            }
            if (item.classList.contains("up")) {
                item.classList.remove("up");
            }
        },

        _toggleCurrentElementArrow: (clickedBtn) => {
            if (clickedBtn.classList.contains("down") || clickedBtn.classList.contains("up")) {
              clickedBtn.classList.toggle("down");
              clickedBtn.classList.toggle("up");
              return false;
            }
            clickedBtn.classList.add("down");
        },

        _removeAllBtnsActive: (element) => {
            document.querySelectorAll(element).forEach((item) => {
                item.classList.remove("active");
            });
        },

        _addActiveForBtns: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        init: () => {
            sortToggle.listenClickInSort();
            sortToggle.listenClickInAddSort();
        },
    };
    sortToggle.init();

}
//СТИЛИ НАВИГАЦИЯ - ОБРАБОТЧИК КЛИКА КНОПОК В STICKY НАВИГАЦИИ
if (document.querySelector(".sticky-active-btn")) {

    var anchorTransition = {

        listenBtnClick: () => {
            document.querySelectorAll(".js-sticky-btn").forEach(function(item) {
                item.addEventListener("click", (event) => {
                    anchorTransition._removeAllBtnsActive();
                    anchorTransition._addActiveForBtns(item);
                });
            });
        },

        _removeAllBtnsActive: () => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.classList.remove("active-btn");
            });
        },

        _addActiveForBtns: (clickedBtn) => {
            clickedBtn.classList.add("active-btn");
        },

        init: () => {
            anchorTransition.listenBtnClick();
        },
    };
    anchorTransition.init();

}
//ПЕРЕХОД ПО ЯКОРЮ
if (document.querySelector(".transition-to-anchor")) {

    var goToAnchor = {

        listenClick: () => {
            document.querySelectorAll(".js-sticky-btn").forEach((item) => {
                item.addEventListener("click", (event) => {
                  event.preventDefault();
                  var currentElement = goToAnchor._findClickedBtnsDataToId(item);
                  window.scrollTo(0, goToAnchor._getCoords(currentElement));
                });
            });
        },

        _findClickedBtnsDataToId: (clickedBtn) => {
            return document.getElementById(clickedBtn.dataset.findId);
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        _getCoords: (elem) => {
            return elem.getBoundingClientRect().top + pageYOffset - goToAnchor._getHeaderHeight(".js-header");
        },

        init: () => {
            goToAnchor.listenClick();
        },
    };
    goToAnchor.init();

}
//СЛАЙДЕР ПОСЛЕДНИХ ПРОСМОТРЕННЫХ ТОВАРОВ
if (document.querySelector(".js-viewed-slider")) {

    var watchedProducts = new Glide(".js-viewed-slider", {
        gap: -1,
        bound: true,
        rewind: false,
        perView: 4,
        peek: {
            before: 0,
            after: 0,
        },
        breakpoints: {
            1023: {
                peek: {
                    before: 0,
                    after: 50,
                },
                perView: 3,
            },
            767: {
                peek: {
                    before: 0,
                    after: 50,
                },
                perView: 2,
            },
            575: {
                peek: {
                    before: 0,
                    after: 100,
                },
                perView: 1,
            },
            480: {
                peek: {
                    before: 0,
                    after: 30,
                },
                perView: 1,
            },
        }
    });
    watchedProducts.mount();

}
//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".catalog-range-slider")) {

    (function () {
        var stepsSlider = document.getElementById("price-container");
        var input0 = document.getElementById("price_ranger_min");
        var input1 = document.getElementById("price_ranger_max");
        var inputs = [input0, input1];

        noUiSlider.create(stepsSlider, {
            start: [0, 200],
            connect: true,
            range: {
                "min": [0],
                "max": 200
            }
        });

        stepsSlider.noUiSlider.on("update", function (values, handle) {
            inputs[handle].value = values[handle];
        });

        // Listen to keydown events on the input field.
        inputs.forEach(function (input, handle) {
            input.addEventListener('change', function () {
                stepsSlider.noUiSlider.setHandle(handle, this.value);
            });
            input.addEventListener('keydown', function (e) {
              var values = stepsSlider.noUiSlider.get();
              var value = Number(values[handle]);
              var steps = stepsSlider.noUiSlider.steps();
              var step = steps[handle];
              var position;
              switch (e.which) {
                  case 13:
                  stepsSlider.noUiSlider.setHandle(handle, this.value);
                  break;
                  case 38:position = step[1];
                  if (position === false) {
                      position = 1;
                  }
                  if (position !== null) {
                      stepsSlider.noUiSlider.setHandle(handle, value + position);
                  }
                  break;
                  case 40:
                  position = step[0];
                  if (position === false) {
                      position = 1;
                  }
                  if (position !== null) {
                      stepsSlider.noUiSlider.setHandle(handle, value - position);}
                      break;
                  }
              });
        });
    }());

}
//ПОДСКАЗКИ В ФИЛЬТРЕ
if (document.querySelector(".catalog-tips")) {

    var filterTips = {

        listenAction: () => {
            var checkbox = document.querySelectorAll('.filters__container input[type="checkbox"]');
            checkbox.forEach((clickedCheckbox) => {
                clickedCheckbox.addEventListener("change", (event) => {
//Убираем все классы clicked
                    for (var i = 0; i < checkbox.length; i++) {
                        checkbox[i].classList.remove("clicked");
                    };
//Если нажали checkbox и убрали галку - то убираем все открытие тултипы и выходим из функции
                    if (!clickedCheckbox.checked) {
                        filterTips._removeAllStatus();
                        return false;
                    }
//Если нажали checkbox и поставили галку - то запускаем остальные функции
                    event.target.classList.add("clicked");
                    filterTips.action();
                });
            });
        },

//Основная функция показывающая тултипы
        action: () => {
            var html = document.querySelector("html");
            //Если не отработал предыдущий таймаут, а запущен новый - то старый отменяем
            if (html.getAttribute("data-timer-id")) {
                clearTimeout(html.getAttribute("data-timer-id"));
            }
            var clickedCheckbox = document.querySelector(".clicked");
            var clickedElementTopPosition = filterTips._getCheckboxPosition(clickedCheckbox);
            filterTips._removeAllStatus();
            var timerId = filterTips._addStyleForTip(clickedCheckbox, clickedElementTopPosition);
            html.setAttribute("data-timer-id", timerId);
        },

//Возвращается число которое будет использовано для позиционирования тултипа
        _getCheckboxPosition: (activeCheckbox) => {
            var mainContainer = activeCheckbox.closest(".filters__panel");
            var innerContainer = activeCheckbox.closest(".check-box__item");
            var objectTopPosition = innerContainer.getBoundingClientRect().top - mainContainer.getBoundingClientRect().top - 4;
            return objectTopPosition;
        },

//Убираем все активные тултипы
        _removeAllStatus: () => {
            document.querySelectorAll(".filters__tooltip").forEach((tip) => {
                tip.classList.remove("active");
            });
        },

//Убираем все активные тултипы (с передачей параметра в setTimeout)
        _fadeOverTime: (tip) => {
            function fade() {
                tip.classList.remove("active");
            }
            return fade;
        },

//Позиционируем активный тултип + после 7 секунд он исчезает + возвращаем id таймера
        _addStyleForTip: (checkBox, positionTopOfcheckBox) => {
            var mainContainer = checkBox.closest(".filters__panel");
            var currentTooltip = mainContainer.querySelector(".filters__tooltip");
            currentTooltip.classList.add("active");
            currentTooltip.style.top = positionTopOfcheckBox + "px";
            return setTimeout(filterTips._fadeOverTime(currentTooltip), 7000);
        },

        init: () => {
            filterTips.listenAction();
        },
    };
    filterTips.init();
}
//СЛАЙДЕРЫ СРАВНЕНИЕ
//БАЗОВЫЕ НАСТРОЙКИ СЛАЙДЕРОВ----------------------------------------------------------------------------------------
if (document.querySelector(".compare-slider")) {

    let PER_VIEW_MOBILE = 1;
    let PER_VIEW_MIN_DESKTOP = 4;
    let PER_VIEW_DESKTOP = 6;
    let DESKTOP_LG_SIZE = 1024;
    let DESKTOP_XL_SIZE = 1395;

    var addCompare = new Glide(".js-compare-add-slider", {
        gap: 0,
        bound: true,
        rewind: true,
        perView: PER_VIEW_DESKTOP,
        breakpoints: {
            1394: {
                perView: PER_VIEW_MIN_DESKTOP,
            },
            1023: {
                perView: PER_VIEW_MOBILE,
            },
        }
    });
//Выясняем общее количество index'ов таким способом, т.к. встроенные методы не работают
    var sliderLength = document.querySelector(".js-compare-add-slider").querySelectorAll(".compare__slide").length - 1;
//Компоненты для допонительного слайдера
    var addCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                addCompare.on("run.before", () => {
                    if (Components.Run.move.direction === ">" && addCompare.index + 1 === mainCompare.index) {
                        addCompare.index++;
                    }
                    if (Components.Run.move.direction === "<" && addCompare.index - 1 === mainCompare.index) {
                        addCompare.index--;
                    }
                    if (Components.Run.move.direction === ">" && addCompare.index === sliderLength && mainCompare.index === 0) {
                        addCompare.index = mainCompare.index;
                    }
                    if (Components.Run.move.direction === "<" && mainCompare.index === sliderLength && addCompare.index === 0) {
                        addCompare.index = sliderLength;
                    }
                });
            }
        }
    }
    addCompare.mount({"createdComponent": addCustomComponent});

    var mainCompare = new Glide(".js-compare-main-slider", {
        gap: 0,
        bound: false,
        rewind: false,
        startAt: 1,
        perView: PER_VIEW_DESKTOP,
        breakpoints: {
            1394: {
                perView: PER_VIEW_MIN_DESKTOP,
            },
            1023: {
                perView: PER_VIEW_MOBILE,
                rewind: true,
            },
        }
    });
//Компоненты для основного слайдера
    var mainCustomComponent = function (Glide, Components, Events) {
        return {
            mount () {
                if (document.documentElement.clientWidth < DESKTOP_LG_SIZE) {
                    mainCompare.on("run.before", () => {
                        if (Components.Run.move.direction === ">" && mainCompare.index + 1 === addCompare.index) {
                            mainCompare.index++;
                        }
                        if (Components.Run.move.direction === "<" && mainCompare.index - 1 === addCompare.index) {
                            mainCompare.index--;
                        }
                        if (Components.Run.move.direction === ">" && mainCompare.index === sliderLength && addCompare.index === 0) {
                            mainCompare.index = addCompare.index;
                        }
                        if (Components.Run.move.direction === "<" && addCompare.index === sliderLength && mainCompare.index === 0) {
                            mainCompare.index = sliderLength;
                        }
                    });
                }
            }
        }
    }
    mainCompare.mount({"createdComponent": mainCustomComponent});

//ОБЪЕКТ--------------------------------------------------------------------
    var compare = {

//Стартовые позиции слайдов и свойств
        slidesAndPropsStartPosition: () => {
            if (document.documentElement.clientWidth < DESKTOP_LG_SIZE) {
                addCompare.update({ startAt: 0 });
                mainCompare.update({ startAt: 1 });
                compare._propsPositionInMobile(addCompare.index, mainCompare.index);
            }
            if (document.documentElement.clientWidth >= DESKTOP_LG_SIZE && document.documentElement.clientWidth < DESKTOP_XL_SIZE) {
                mainCompare.update({ startAt: 0 });
                compare._propsPositionInDesktop(PER_VIEW_MIN_DESKTOP);
            }
            if (document.documentElement.clientWidth >= DESKTOP_XL_SIZE) {
                mainCompare.update({ startAt: 0, perView: 6 });
                compare._propsPositionInDesktop(PER_VIEW_DESKTOP);
            }
        },

//Внешний вид при повороте устройства
        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                compare.slidesAndPropsStartPosition();
            });
        },

//Внешний вид при ресайзе окна
        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                compare.slidesAndPropsStartPosition();
            });
        },

        listenSliderActions: () => {
            addCompare.on("run.after", () => {
//Условия запуска функции на смену свойств для дополнительного слайдера на мобиле
                if (document.documentElement.clientWidth < DESKTOP_LG_SIZE) {
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
            });
            mainCompare.on("run.after", () => {
//Условия запуска функции на смену свойств для основного слайдера на мобиле
                if (document.documentElement.clientWidth < DESKTOP_LG_SIZE) {
                    compare._propsPositionInMobile(addCompare.index, mainCompare.index);
                }
//Условия запуска функции на смену свойств для основного слайдера на десктопе 1024 - 1394
                if (document.documentElement.clientWidth >= DESKTOP_LG_SIZE) {
                    compare._propsPositionInDesktop(PER_VIEW_MIN_DESKTOP);
                }
//Условия запуска функции на смену свойств для основного слайдера на десктопе 1395+
                if (document.documentElement.clientWidth >= DESKTOP_XL_SIZE) {
                    compare._propsPositionInDesktop(PER_VIEW_DESKTOP);
                }
            });
        },

//Cмена свойств на мобиле
        _propsPositionInMobile: (addSliderIndex, mainSliderIndex) => {
            document.querySelectorAll(".js-parameter-col").forEach((block) => {
                block.classList.add("visually-hidden");
            });
            var diffRow = document.querySelectorAll(".js-parameter-diff-row");
            diffRow.forEach((propContainer) => {
                if (addSliderIndex > mainSliderIndex) {
                    propContainer.classList.add("reverse");
                } else {
                    propContainer.classList.remove("reverse");
                }
                propContainer.children[addSliderIndex].classList.remove("visually-hidden");
                propContainer.children[mainSliderIndex].classList.remove("visually-hidden");
            });
        },

//Cмена свойств на десктопе
        _propsPositionInDesktop: (quantity) => {
            var propRow = document.querySelectorAll(".js-parameter-diff-row");
            var allMainSlides = document.querySelectorAll(".js-compare-main-slider .compare__slide");
            propRow.forEach((block) => {
                var propCol = block.querySelectorAll(".js-parameter-col");
                for (var i = 0; i < propCol.length; i++) {
                    if (i < mainCompare.index || i >= mainCompare.index + quantity || allMainSlides[i] === undefined) {
                        propCol[i].classList.add("visually-hidden");
                        continue;
                    }
                    propCol[i].classList.remove("visually-hidden");
                }
            });
        },

        init: () => {
            compare.slidesAndPropsStartPosition();
            compare.listenTurnDevice();
            compare.listenResizeDevice();
            compare.listenSliderActions();
        },
    };
    compare.init();

}
//ОТСЛЕЖИВАНИЕ СКРОЛА И ПРОСТАВЛЯЕМ ACTIVE НА КНОПКИ
if (document.querySelector(".slider-shadow")) {

    //Примерное значание для отслеживания прилипания слайдера к верху, т.к. на Safari это значение при скроле постоянно меняется и не может быть строго зафиксированно на 0
    let REFERENT_VAL = 10;

    let eventHandler = function(event) {
        var headerBlock = document.querySelector(".js-header");
        var sliderBlock = document.querySelector(".js-compare-slider-block");
        var sliderBody = document.querySelector(".js-compare__body");
        var headerHeight = sliderShadow._getHeaderHeight(".js-header");
        if ((sliderBlock.getBoundingClientRect().y >= -REFERENT_VAL) && (sliderBlock.getBoundingClientRect().y <= REFERENT_VAL)) {
            sliderBlock.classList.add("sticked");
            headerBlock.classList.add("hide");
            alert(sliderBlock.getBoundingClientRect().y);
            return false;
        }
        sliderBlock.classList.remove("sticked");
        headerBlock.classList.remove("hide");
    }

    var sliderShadow = {

        actionAfterEvent: throttle(eventHandler, 100),

        listenScroll: () => {
            window.addEventListener("scroll", eventHandler);
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        init: () => {
            sliderShadow.listenScroll();
        },

    };
    sliderShadow.init();

}
//РАДИО КНОПКИ В DELIVERY-PAGE
if (document.querySelector(".delivery-radio-change")) {

    var openCheckedRadioContainer = {
        listenClick: () => {
            document.querySelectorAll(".js-delivery-calc").forEach((radioBtn) => {
                radioBtn.addEventListener("click", (event) => {
                    var radioParent = openCheckedRadioContainer._findClickedRadioParent(radioBtn);
                    openCheckedRadioContainer._removeParentActiveStatus();
                    openCheckedRadioContainer._addParentActiveStatus(radioParent);
                });
            });
        },

        _findClickedRadioParent: (radio) => {
            return radio.closest(".delivery-calc__item");
        },

        _removeParentActiveStatus: () => {
            document.querySelectorAll(".delivery-calc__item").forEach((element) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        },

        _addParentActiveStatus: (parent) => {
            parent.classList.add("active");
        },

        init: () => {
            openCheckedRadioContainer.listenClick();
        },
    };
    openCheckedRadioContainer.init();

}
//ТАБЫ В DELIVERY-PAGE
if (document.querySelector(".delivery-tabs-change")) {

    var orderTabs = {
        listenClickForPayType: () => {
            document.querySelectorAll(".js-pay-tog").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (btn.classList.contains("active")) {
                        return false;
                    }
                    orderTabs._removeActiveStatusForBtn(".js-pay-tog");
                    orderTabs._addActiveStatusForBtn(btn);
                });
            });
        },

        _removeActiveStatusForBtn: (btn) => {
            document.querySelectorAll(btn).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _addActiveStatusForBtn: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        init: () => {
            orderTabs.listenClickForPayType();
        },
    };
    orderTabs.init();

}
//СЛАЙДЕРЫ НА ГЛАВНОЙ СТРАНИЦЕ
if (document.querySelector(".index-page")) {

    //Верхний слайдер
    var glide = new Glide('.js-top-slider', {
      type: 'carousel',
      autoplay: 3000,
      hoverpause: true,
    });
    glide.mount();

    //Слайдер преимуществ
    var glideAdvantages = new Glide('.js-advantages-slider', {
      perView: 5,
      dragThreshold: false,
      bound: true,
      breakpoints: {
          1023: {
              dragThreshold: 120,
              perView: 1
          }
      }
    });
    glideAdvantages.mount();

    var advantagesSlider = {

        START_DESKTOP_WIDTH: 1024,

        listenTurnDevice: () => {
            window.addEventListener("orientationchange", function() {
                if (document.documentElement.clientWidth <= advantagesSlider.START_DESKTOP_WIDTH) return false;
                glideAdvantages.update({ startAt: 0 });
            });
        },

        listenResizeDevice: () => {
            window.addEventListener("resize", function() {
                if (document.documentElement.clientWidth <= advantagesSlider.START_DESKTOP_WIDTH) return false;
                glideAdvantages.update({ startAt: 0 });
            });
        },

        init: () => {
            advantagesSlider.listenTurnDevice();
            advantagesSlider.listenResizeDevice();
        },
    };
    advantagesSlider.init();

    //Слайдер товаров
    var sliders = document.querySelectorAll(".js-goods-slider");
    var glideGoodsSliders = [];
    var sliderCollection = function (i, item) {
        glideGoodsSliders[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
          perView: 5,
          breakpoints: {
              1280: {
                  perView: 4,
              },
              1023: {
                  perView: 3,
              },
              767: {
                  perView: 2,
              },
              575: {
                  perView: 2,
              },
              480: {
                  perView: 1,
              },
          }
      });
        glideGoodsSliders[i].mount();
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderCollection(i, sliders);
    }

    //Слайдер статей
    var articlesSlider = new Glide('.js-articles-slider', {
        gap: 15,
        bound: true,
        rewind: false,
        perView: 4,
        breakpoints: {
            1223: {
                peek: {
                    before: 0,
                    after: 110,
                },
                perView: 3,
            },
            1023: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 3,
            },
            767: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 2,
            },
            575: {
                peek: {
                    before: 0,
                    after: 110,
                },
                perView: 1,
            },
            480: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 1,
            },
        }
    });
    articlesSlider.mount();

    //Слайдер брендов
    var brandsSlider = new Glide('.js-brands-slider', {
        gap: 15,
        bound: true,
        rewind: false,
        perView: 6,
        breakpoints: {
            1023: {
                peek: {
                    before: 0,
                    after: 40,
                },
                perView: 5,
            },
            767: {
                peek: {
                    before: 0,
                    after: 100,
                },
                perView: 3,
            },
            575: {
                peek: {
                    before: 0,
                    after: 70,
                },
                perView: 3,
            },
            480: {
                peek: {
                    before: 0,
                    after: 70,
                },
                perView: 2,
            },
        }
    });
    brandsSlider.mount();

}
//ПОДГРУЗКА AJAX НА ГЛАВНОЙ (блок жидкостей)
if (document.querySelector(".index-page")) {

    var loadAfterClick = {

        listenBtnsClick: () => {
            document.querySelectorAll(".js-load-ajax").forEach((button) => {
                var ajaxString;
                button.addEventListener("click", (event) => {
                    if (ajaxString) return false;
                    ajaxString = loadAfterClick._getJsonString(button, "path");
                    loadAfterClick._loadAjaxAndActions(ajaxString, button);
                });
            });
        },

        _getJsonString: (clickedBtn, findString) => {
            switch (findString) {
                case "overlay":
                    return clickedBtn.dataset.overlayId;
                    break;
                case "path":
                    return clickedBtn.dataset.ajax;
                    break;
            }
        },

        /*_loadAjaxAndActions: (jsonPath, clickedBtn) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", (evt) => {
                var htmlFragment = loadAfterClick._convertJsonToHtmlFragment(xhr.responseText);
                loadAfterClick._appendHtml(htmlFragment, clickedBtn);
            });
            xhr.open("GET", jsonPath+".php");
            xhr.send();
        },*/

        _loadAjaxAndActions: (jsonPath, clickedBtn) => {
            var xhr = new XMLHttpRequest();
            xhr.addEventListener("load", (evt) => {
                var parsedJson = JSON.parse(xhr.responseText);
                var htmlFragment = loadAfterClick._convertJsonToHtmlFragment(parsedJson);
                loadAfterClick._appendHtml(htmlFragment, clickedBtn);
            });
            xhr.open("GET", "json/"+jsonPath+".json");
            xhr.send();
        },

        _convertJsonToHtmlFragment: (loadedAjax) => {
            return document.createRange().createContextualFragment(loadedAjax);
        },

        _appendHtml: (htmlContent, button) => {
            var openedOverlayIdString = loadAfterClick._getJsonString(button, "overlay");
            document.querySelector("#"+openedOverlayIdString+" .index-overlay__content").appendChild(htmlContent);
        },

        init: () => {
            loadAfterClick.listenBtnsClick();
        },
    };
    loadAfterClick.init();

}
//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".del-add-flavor")) {

    var delAndAddFlavor = {

        btnCollection: document.querySelectorAll(".js-mix-calc-del-flavor"),

//----------------удаление элементов

        listenRemoveClick: () => {
            document.querySelectorAll(".js-mix-calc-del-flavor").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    btn.closest(".mix-calc__col").remove();
                    var btnCollection = document.querySelectorAll(".js-mix-calc-del-flavor");
                    if (btnCollection.length <= 1) {
                        btnCollection[0].classList.add("hide");
                        return false;
                    }
                })
            });
        },

        elementStatusAfterInit: () => {
            if (delAndAddFlavor.btnCollection.length == 1) {
                delAndAddFlavor.btnCollection[0].classList.add("hide");
            }
        },

//----------------добавление элементов

        listenAddClick: () => {
            document.querySelector(".js-mix-calc-add-flavor").addEventListener("click", () => {
                var clonedNode = document.querySelector(".js-flavor-container:first-child").cloneNode(true);
                delAndAddFlavor._removeValandClassFromClonedNode(clonedNode);
                document.querySelector(".js-flavor-parent").appendChild(clonedNode);
                delAndAddFlavor.listenRemoveClick();
                delAndAddFlavor._checkHideStatusForFirstDelBtn();
            })
        },

        _removeValandClassFromClonedNode: (clonedElement) => {
            var allInnerInputs = clonedElement.querySelectorAll("input");
            allInnerInputs.forEach((input) => {
                input.value = "";
            });
            if (clonedElement.querySelector(".mix-calc__del-element").classList.contains("hide")) {
                clonedElement.querySelector(".hide").classList.remove("hide");
            }
        },

        _checkHideStatusForFirstDelBtn: () => {
            var delBtn = document.querySelectorAll(".js-mix-calc-del-flavor");
            if (delBtn.length > 1) {
                delBtn[0].classList.remove("hide");
            }
        },

        init: () => {
            delAndAddFlavor.elementStatusAfterInit();
            delAndAddFlavor.listenRemoveClick();
            delAndAddFlavor.listenAddClick();
        }

    }
    delAndAddFlavor.init();

}
//ПЕРЕКЛЮЧАТЕЛЬ ВИДА КАРТОЧЕК: ПЛИТКА/СТРОКА
if (document.querySelector(".mix-calc-range-slider")) {

    (function () {
        var rangeSlider = document.getElementById("vg-pg-range");

        noUiSlider.create(rangeSlider, {
            start: [50],
            step: 5,
            range: {
                'min': [0],
                'max': [100]
            },
            format: {
                from: function(value) {
                    return parseInt(value);
                },
                to: function(value) {
                    return parseInt(value);
                }
            }
        });

        var vgValue = document.getElementById("vg-range");
        var pgValue = document.getElementById("pg-range");

        rangeSlider.noUiSlider.on('update', function (values, handle) {
            vgValue.innerHTML = values[handle];
            pgValue.innerHTML = 100 - values[handle];
        });
    }());
}
//СЛАЙДЕР НА СТРАНИЦЕ OFFER-PAGE
if (document.querySelector(".offer-slider")) {

    var sliders = document.querySelectorAll(".js-offer-slider");
    var glideOffer = [];

    var sliderOfferCollection = function (i, item) {
        glideOffer[i] = new Glide(item[i], {
          gap: 0,
          bound: true,
          rewind: false,
          perView: 5,
          peek: {
              before: 0,
              after: 100,
          },
          breakpoints: {
              1219: {
                  peek: {
                      before: 0,
                      after: 100,
                  },
                  perView: 4,
              },
              1023: {
                  peek: {
                      before: 0,
                      after: 50,
                  },
                  perView: 3,
              },
              767: {
                  peek: {
                      before: 0,
                      after: 100,
                  },
                  perView: 2,
              },
              575: {
                  peek: {
                      before: 0,
                      after: 150,
                  },
                  perView: 1,
              },
              480: {
                  peek: {
                      before: 0,
                      after: 50,
                  },
                  perView: 1,
              },
          }
      });
        glideOffer[i].mount();
    }
    for (var i = 0; i < sliders.length; i++) {
        sliderOfferCollection(i, sliders);
    }

}
//РАДИО КНОПКИ В ORDER-PAGE
if (document.querySelector(".order-radio-change")) {

    var openCheckedRadioContainer = {
        listenClick: () => {
            document.querySelectorAll(".js-order-calc").forEach((radioBtn) => {
                radioBtn.addEventListener("click", (event) => {
                    var radioParent = openCheckedRadioContainer._findClickedRadioParent(radioBtn);
                    openCheckedRadioContainer._removeParentActiveStatus();
                    openCheckedRadioContainer._addParentActiveStatus(radioParent);
                });
            });
        },

        _findClickedRadioParent: (radio) => {
            return radio.closest(".order-calc__item");
        },

        _removeParentActiveStatus: () => {
            document.querySelectorAll(".order-calc__item").forEach((element) => {
                if (element.classList.contains("active")) {
                    element.classList.remove("active");
                }
            });
        },

        _addParentActiveStatus: (parent) => {
            parent.classList.add("active");
        },

        init: () => {
            openCheckedRadioContainer.listenClick();
        },
    };
    openCheckedRadioContainer.init();

}
//ТАБЫ В ORDER-PAGE
if (document.querySelector(".order-tabs-change")) {

    var orderTabs = {
        listenClick: () => {
            document.querySelectorAll(".js-order-calc-inner-btn").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (btn.classList.contains("active")) {
                        return false;
                    }
                    var currentContainer = orderTabs._findContainerByBtnsData(btn);
                    orderTabs._removeAllContainerActiveStatus(".js-tab-item");
                    orderTabs._addActiveStatusForContainer(currentContainer);
                    orderTabs._removeActiveStatusForBtn(".js-order-calc-inner-btn");
                    orderTabs._addActiveStatusForBtn(btn);
                });
            });
        },

        listenClickForPayType: () => {
            document.querySelectorAll(".js-pay-tog").forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (btn.classList.contains("active")) {
                        return false;
                    }
                    orderTabs._removeActiveStatusForBtn(".js-pay-tog");
                    orderTabs._addActiveStatusForBtn(btn);
                });
            });
        },

        _addActiveStatusForBtn: (clickedBtn) => {
            clickedBtn.classList.add("active");
        },

        _addActiveStatusForContainer: (container) => {
            container.classList.add("active");
        },

        _removeAllContainerActiveStatus: (tabItem) => {
            document.querySelectorAll(tabItem).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _removeActiveStatusForBtn: (btn) => {
            document.querySelectorAll(btn).forEach((item) => {
                if (item.classList.contains("active")) {
                    item.classList.remove("active");
                }
            });
        },

        _findContainerByBtnsData: (clickedBtn) => {
            var classnameString = clickedBtn.dataset.classname;
            return document.querySelector("."+classnameString);
        },

        init: () => {
            orderTabs.listenClick();
            orderTabs.listenClickForPayType();
        },
    };
    orderTabs.init();

}
//СЛАЙДЕР ПОСЛЕДНИХ ПРОСМОТРЕННЫХ ТОВАРОВ
if (document.querySelector(".js-addition-slider")) {

    var watchedProducts = new Glide(".js-addition-slider", {
        gap: -1,
        bound: true,
        rewind: false,
        perView: 4,
        peek: {
            before: 0,
            after: 0,
        },
        breakpoints: {
            1023: {
                peek: {
                    before: 0,
                    after: 50,
                },
                perView: 3,
            },
            767: {
                peek: {
                    before: 0,
                    after: 50,
                },
                perView: 2,
            },
            575: {
                peek: {
                    before: 0,
                    after: 100,
                },
                perView: 1,
            },
            480: {
                peek: {
                    before: 0,
                    after: 30,
                },
                perView: 1,
            },
        }
    });
    watchedProducts.mount();

}
//СЛАЙДЕР ТОВАРА - (ДЕТАЛЬНАЯ)
if (document.querySelector(".product-item-slider")) {

    var NAV_FOR_SLIDE_QUANTITY = 4;

    $(".js-product-slider-for").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      //lazyLoad: 'ondemand',
      //autoplay: true,
      arrows: false,
      fade: false,
      asNavFor: ".js-product-slider-nav",
            responsive: [
          {
            breakpoint: 767,
            settings: {
              dots: true,
              arrows: false
            }
          },
        ]
    });
    $(".js-product-slider-nav").slick({
      slidesToShow: NAV_FOR_SLIDE_QUANTITY,
      slidesToScroll: 1,
      asNavFor: ".js-product-slider-for",
      dots: false,
      //centerMode: true,
      focusOnSelect: true,
      //centerPadding: 0
    });

//Если кол-во слайдов ниже 4-х, то отключаем движение нижнего слайдера
    if (document.querySelectorAll(".js-product-slider-nav .product-slider__nav-item").length < NAV_FOR_SLIDE_QUANTITY) {
        document.querySelector(".js-product-slider-nav .slick-track").classList.add("block-translate");
    }

}
//ПЕРЕКЛЮЧАТЕЛЬ ВИДА ТАБОВ НА СТРАНИЦЕ ТОВАРА
if (document.querySelector(".product-tab-tog")) {

    var productTabs = {

        listenClick: () => {
            document.querySelectorAll(".js-product-tab").forEach(function(clickedBtn) {
                clickedBtn.addEventListener("click", function(event) {
                    if (clickedBtn.classList.contains(".active")) return
                    productTabs._removeAllActiveClasses();
                    productTabs._addActiveForClickedBtn(clickedBtn);
                    productTabs._findContainerByBtnAndSetActive(clickedBtn);
                });
            });
        },

        _removeAllActiveClasses: () => {
            document.querySelectorAll(".js-product-tab").forEach((item) => {
                item.classList.remove("active");
            });
            document.querySelectorAll(".js-tabs-content").forEach((item) => {
                item.classList.remove("active");
            });
        },

        _addActiveForClickedBtn: (btn) => {
            if (btn.classList.contains("product-detail__scroll-to")) {
                document.querySelector(".js-product-tab-descr").classList.add("active");
                return false;
            }
            btn.classList.add("active");
        },

        _findContainerByBtnAndSetActive: (btn) => {
            document.getElementById(btn.dataset.toId).classList.add("active");
        },

        init: () => {
            productTabs.listenClick();
        },
    };
    productTabs.init();

}
//ПЕРЕХОД ПО ЯКОРЮ
if (document.querySelector(".tog-property")) {

    var productPropertyTog = {

      listenClick: () => {
          var propertyContainer = document.querySelectorAll(".js-property-list");
          propertyContainer.forEach((listItem) => {
              var propertyFromList = listItem.querySelectorAll(".js-property-item");
              propertyFromList.forEach((propertyItem) => {
                  propertyItem.addEventListener("click", (event) => {
                      productPropertyTog._removeActive(listItem);
                      productPropertyTog._addActive(propertyItem);
                  });
              });
          });
      },

      _removeActive: (listItem) => {
          listItem.querySelectorAll(".js-property-item").forEach((btn) => {
              btn.classList.remove("active");
          });
      },

      _addActive: (clickedBtn) => {
          clickedBtn.classList.add("active");
      },

      init: () => {
          productPropertyTog.listenClick();
      },
    };
    productPropertyTog.init();

}
//ПЕРЕХОД ПО ЯКОРЮ
if (document.querySelector(".transition-to-anchor-product")) {

    var goToAnchor = {

        listenClick: () => {
            document.querySelectorAll(".js-go-to").forEach((item) => {
                item.addEventListener("click", (event) => {
                  event.preventDefault();
                  var currentElement = goToAnchor._findClickedBtnsDataToId(item);
                  window.scrollTo(0, goToAnchor._getCoords(currentElement));
                });
            });
        },

        _findClickedBtnsDataToId: (clickedBtn) => {
            return document.getElementById(clickedBtn.dataset.findId);
        },

        _getHeaderHeight: (elem) => {
            return document.querySelector(elem).offsetHeight;
        },

        _getCoords: (elem) => {
            return elem.getBoundingClientRect().top + pageYOffset - goToAnchor._getHeaderHeight(".js-header");
        },

        init: () => {
            goToAnchor.listenClick();
        },
    };
    goToAnchor.init();

}
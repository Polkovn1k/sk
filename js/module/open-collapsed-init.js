//ПЛАВНОЕ ОТКРЫТИЕ СХЛОПНУТЫХ ЭЛЕМЕНТОВ
if (document.querySelector(".open-collapsed")) {

    var expandCollapsedItemsInit = {

        showCollapsedElement: () => {
            var initEl = document.querySelectorAll(".js-call-collapsed-element");
            initEl.forEach(function(clickedBtn) {
                if (!clickedBtn.classList.contains("js-initialized")) {
                    clickedBtn.addEventListener("click", (event) => {
                        var currentCollapsedElement = expandCollapsedItemsInit._findClickedBtnsDataToId(clickedBtn);
                        //Если нажатая кнопка содержит active то контейнер схлопываем
                        if (clickedBtn.classList.contains("active")) {
                            expandCollapsedItemsInit._removeActiveStatus(clickedBtn);
                            expandCollapsedItemsInit._getTrueElementHeight(currentCollapsedElement);
                            expandCollapsedItemsInit._removeActiveStatus(currentCollapsedElement);
                            setTimeout(() => {
                                expandCollapsedItemsInit._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                            }, 0);
                            return false;
                        }
                        //Если нажатая кнопка НЕ содержит active то контейнер развертываем
                        expandCollapsedItemsInit._getTrueElementHeight(currentCollapsedElement);
                        expandCollapsedItemsInit._addActiveStatus(currentCollapsedElement);
                        expandCollapsedItemsInit._addActiveStatus(clickedBtn);
                        currentCollapsedElement.addEventListener("transitionend", (event) => {
                            expandCollapsedItemsInit._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                        });
                    });
                }
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




        _addInitializedStatus: () => {
            var qqqqqq = document.querySelectorAll(".js-call-collapsed-element");
            qqqqqq.forEach((element) => {
                if (!element.classList.contains("js-initialized")) {
                    element.classList.add("js-initialized");
                }
            });
        },

        init: () => {
            expandCollapsedItemsInit.showCollapsedElement(expandCollapsedItemsInit.btnForCollapse);
            expandCollapsedItemsInit._addInitializedStatus();
        },
    };
    //expandCollapsedItemsInit.init();

}
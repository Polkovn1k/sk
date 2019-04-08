//ПЛАВНОЕ ОТКРЫТИЕ СХЛОПНУТЫХ ЭЛЕМЕНТОВ
if (document.querySelector(".open-collapsed")) {

    var expandCollapsedItems = {

        showCollapsedElement: () => {
            document.querySelectorAll(".js-call-collapsed-element").forEach(function(clickedBtn) {
                clickedBtn.addEventListener("click", (event) => {
                    var currentCollapsedElement = expandCollapsedItems._findClickedBtnsDataToId(clickedBtn);
                    //Если нажатая кнопка содержит active то контейнер схлопываем
                    if (clickedBtn.classList.contains("active")) {
                        expandCollapsedItems._removeActiveStatus(clickedBtn);
                        expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                        expandCollapsedItems._removeActiveStatus(currentCollapsedElement);
                        if (currentCollapsedElement.clientHeight == currentCollapsedElement.scrollHeight) {
                            expandCollapsedItems._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                        }
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

        init: () => {
            expandCollapsedItems.showCollapsedElement();
        },
    };
    expandCollapsedItems.init();

}
//ПЛАВНОЕ ОТКРЫТИЕ СХЛОПНУТЫХ ЭЛЕМЕНТОВ
if (document.querySelector(".open-collapsed")) {

    var expandCollapsedItems = {

        TRANSITION_TIME: "300",

        showCollapsedElement: () => {
            document.querySelectorAll(".js-call-collapsed-element").forEach(function(clickedBtn) {
                clickedBtn.addEventListener("click", (event) => {
                    var currentCollapsedElement = expandCollapsedItems._findClickedBtnsDataToId(clickedBtn);
                    //Если нажатая кнопка содержит active-btn то контейнер схлопываем
                    if (clickedBtn.classList.contains("active-btn")) {
                        expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                        if (currentCollapsedElement.clientHeight == currentCollapsedElement.scrollHeight) {
                            expandCollapsedItems._removeBtnActive(clickedBtn);
                            expandCollapsedItems._deleteInlineStyleBeforeCollapsed(currentCollapsedElement);
                        }
                        return false;
                    }
                    //Если нажатая кнопка НЕ содержит active-btn то контейнер развертываем
                    expandCollapsedItems._getTrueElementHeight(currentCollapsedElement);
                    expandCollapsedItems._deleteInlineStyleAfterCollapsed(currentCollapsedElement);
                    expandCollapsedItems._addBtnActive(clickedBtn);
                });
            });
        },

//Добавляем активность нажатой кнопке
        _addBtnActive: (clickedBtn) => {
            clickedBtn.classList.add("active-btn");
        },

//Удаляем активность нажатой кнопке
        _removeBtnActive: (clickedBtn) => {
            clickedBtn.classList.remove("active-btn");
        },

//Удаляем максимальную высоту элемента, поставленную инлайном - ПОСЛЕ раскрытия
        _deleteInlineStyleAfterCollapsed: (collapsedElement) => {
            setTimeout(function() {
                collapsedElement.style.removeProperty("max-height");
            }, expandCollapsedItems.TRANSITION_TIME);
        },

//Удаляем максимальную высоту элемента, поставленную инлайном - ДО раскрытия
        _deleteInlineStyleBeforeCollapsed: (collapsedElement) => {
            collapsedElement.style.removeProperty("max-height");
        },

//Находим элемент который неоходимо схлопнуть или раскрыть в заввисимости от нажатой кнопки
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
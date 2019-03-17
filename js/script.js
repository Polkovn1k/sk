var expandCollapsedItemsToggleStyle = {
    clickListener: () => {
        document.querySelectorAll(".js-call-collapsed-toggle").forEach(function(item) {
            item.addEventListener("click", (event) => {
                //если у нажатой кнопки нет active-btn то...
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
            });
        });
    },

//убираем active-btn у всех кнопок
    _removeAllBtnsActive: () => {
        document.querySelectorAll(".js-call-collapsed-toggle").forEach((element) => {
            element.classList.remove("active-btn");
        });
    },

//убираем максимальную высоту у всех схлопнутых элементов
    _removeAllContentsHeight: () => {
        document.querySelectorAll(".js-footer-collapsed").forEach((element) => {
            element.style.removeProperty("max-height");
        });
    },

//находим нужный элемент который необходимо раскрыть и
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
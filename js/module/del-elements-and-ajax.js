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